"use server";
import Razorpay from "razorpay";
import Payment from "@/app/models/Payment";
import connectDB from "@/db/connectDB";
import User from "@/app/models/User";

export const initiate = async (amount, to_username, paymentform) => {
  try {
    await connectDB();
    let user = await User.findOne({ username: to_username });
    const secret = user.razorpaysecret;

    const instance = new Razorpay({
      key_id: user.razorpayid,
      key_secret: secret,
    });

    const options = {
      amount: Number.parseInt(amount), // Amount in smallest currency unit
      currency: "INR",
      receipt: "receipt#1", // Unique receipt ID for this order
      notes: {
        key1: "value3",
        key2: "value2",
      },
    };

    // Create order with Razorpay
    const order = await instance.orders.create(options);

    // Save the order details to the database
    await Payment.create({
      oid: order.id,
      amount: amount,
      to_user: to_username,
      name: paymentform.name,
      message: paymentform.message,
    });

    // Return the order ID to the client
    return order;
  } catch (error) {
    console.error("Error initiating payment:", error);
    throw new Error("Failed to initiate payment");
  }
};

export const fetchuser = async (username) => {
  await connectDB();
  let u = await User.findOne({ username: username });
  if (!u) return null;
  let user = u.toObject({ flattenObjectIds: true });
  return user;
};

export const fetchpayment = async (username) => {
  await connectDB();
  let p = await Payment.find({ to_user: username, done: true })
    .sort({ amount: -1 })
    .limit(5)
    .lean();
  return p;
};

export const updateuser = async (data, oldusername) => {
  await connectDB();

  // No need to use Object.fromEntries if `data` is already an object
  let ndata = data;

  // Check if the username is being changed
  if (oldusername !== ndata.username) {
    let u = await User.findOne({ username: ndata.username });
    if (u) {
      return { error: "User already exists" };
    }
    await User.updateOne({ email: ndata.email }, ndata);
    await Payment.updateMany(
      { to_user: oldusername },
      { to_user: ndata.username }
    );
  }

  // Update the user information
  await User.updateOne({ email: ndata.email }, ndata);
  return { success: true };
};
