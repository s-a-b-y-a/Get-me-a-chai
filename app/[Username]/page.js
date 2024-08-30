import React from "react";
import Paymentpage from "@/components/Paymentpage";
import { notFound } from "next/navigation";
import connectDB from "@/db/connectDB";
import User from "../models/User";

const Username = async ({ params }) => {
  const checkUser = async () => {
    await connectDB();
    let u = await User.findOne({ username: params.username });

    if (!u) {
      return notFound();
    }
  };

  await checkUser();

  return (
    <>
      <Paymentpage username={params.username} />
    </>
  );
};

export default Username;

export async function generateMetadata({ params }) {
  return {
    title: `Support ${params.username} - Get me a chai`,
  }
}