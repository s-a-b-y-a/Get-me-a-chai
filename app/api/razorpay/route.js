import { NextResponse } from "next/server";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils";
import Payment from "@/app/models/Payment";
import connectDB from "@/db/connectDB";
import User from "@/app/models/User";

export const POST = async (req) => {
  try {
    await connectDB();

    // Log the request content-type
    const contentType = req.headers.get("content-type");
    console.log("Content-Type:", contentType);

    let body;

    // Handle based on content type
    if (contentType.includes("application/json")) {
      body = await req.json(); // Parse JSON body
    } else if (contentType.includes("multipart/form-data")) {
      body = Object.fromEntries(await req.formData()); // Handle form-data
    } else if (contentType.includes("application/x-www-form-urlencoded")) {
      const rawBody = await req.text(); // Handle URL-encoded form
      body = Object.fromEntries(new URLSearchParams(rawBody));
    } else {
      throw new Error(`Unsupported content type: ${contentType}`);
    }

    console.log("Parsed body:", body);

    let p = await Payment.findOne({ oid: body.razorpay_order_id });
    if (!p) {
      return NextResponse.json({
        success: "false",
        message: "Order ID not found",
      });
    }

    let user = await User.findOne({ username: p.to_user });
    const secret = user.razorpaysecret;

    let x = validatePaymentVerification(
      {
        order_id: body.razorpay_order_id,
        payment_id: body.razorpay_payment_id,
      },
      body.razorpay_signature,
      secret
    );

    if (x) {
      const updatedPayment = await Payment.findOneAndUpdate(
        { oid: body.razorpay_order_id },
        { done: "true" },
        { new: true }
      );
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_URL}/${updatedPayment.to_user}?paymentdone=true`
      );
    } else {
      return NextResponse.json({
        success: "false",
        message: "Payment verification failed",
      });
    }
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json({
      success: "false",
      message: "Failed to process request",
    });
  }
};
