"use client";
import React, { useEffect, useState } from "react";
import Script from "next/script";
import { fetchpayment, initiate, fetchuser } from "@/actions/useractions";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Paymentpage = ({ username }) => {
  const [paymentform, setpaymentform] = useState({});
  const [currentuser, setcurrentuser] = useState({});
  const [Payments, setPayments] = useState([]);
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (searchParams.get("paymentdone") === "true")
      toast("Thanks for your donation", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    router.push(`/${username}`);
  }, [searchParams, router, username]);

  const handlechange = (e) => {
    setpaymentform({ ...paymentform, [e.target.name]: e.target.value });
  };

  const getData = async () => {
    let u = await fetchuser(username);
    setcurrentuser(u);
    let dbpayments = await fetchpayment(username);
    setPayments(dbpayments);
  };

  const pay = async (amount) => {
    let a = await initiate(amount, username, paymentform);
    let orderID = a.id;
    var options = {
      key: currentuser.razorpayid, // Enter the Key ID generated from the Dashboard
      amount: amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
      name: "Get Me a chai", // your business name
      description: "Test Transaction",
      image: "https://example.com/your_logo",
      order_id: orderID, // This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      callback_url: `${process.env.NEXT_PUBLIC_URL}/api/razorpay`,
      prefill: {
        // We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
        name: "Gaurav Kumar", // your customer's name
        email: "gaurav.kumar@example.com",
        contact: "9000090000", // Provide the customer's phone number for better conversion rates
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };

    var rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  const defaultCoverPic = "/cover.jpg";
  const defaultProfilePic = "https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>
      <div className="relative w-full">
        <img
          className="object-cover w-full h-60 md:h-96"
          src={currentuser.coverpic || defaultCoverPic}
          alt="Cover"
        />
        <div className="absolute md:top-[345px] top-[200px] left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <img
            className="rounded-lg border-red-600 border-2"
            width={80}
            src={currentuser.profilepic || defaultProfilePic}
            alt="Profile"
          />
        </div>
        <div className="absolute md:top-[400px] left-1/2 transform -translate-x-1/2 text-center text-white">
          <div className="font-bold text-lg md:text-2xl">@{username}</div>
          <div className="text-slate-400 text-sm md:text-base">Let's help {username} get a chai</div>
          <div className="text-slate-400 text-sm md:text-base">
            {Payments.length} Payments . ₹{Payments.reduce((a, b) => a + b.amount, 0) / 100} raised
          </div>
        </div>
      </div>
      <div className="my-28"></div>
      <div className="flex flex-col md:flex-row gap-4 w-[90%] md:w-[80%] mx-auto mt-8 mb-10">
        <div className="bg-slate-800 rounded-lg p-5 md:p-10 flex-1">
          <h2 className="font-bold text-xl md:text-2xl my-5">Top 5 Supporters</h2>
          <ul className="text-sm md:text-lg">
            {Payments.length === 0 && <li>No payments yet</li>}
            {Payments.map((p, i) => (
              <li key={i} className="my-4 flex gap-2 items-center">
                <img
                  className="rounded-lg"
                  width={40}
                  src="/avatar.gif"
                  alt="user avatar"
                />
                <span>
                  {p.name} donated{" "}
                  <span className="font-bold">₹{p.amount / 100}</span>{" "}
                  with a message "{p.message}"
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-slate-800 text-white rounded-lg p-5 md:p-10 flex-1">
          <h2 className="text-xl md:text-2xl font-bold my-5">Make a payment</h2>
          <div className="flex flex-col gap-4">
            <input
              type="text"
              name="name"
              value={paymentform.name}
              className="w-full p-3 rounded-lg bg-slate-700 text-white"
              placeholder="Enter Name"
              onChange={handlechange}
            />
            <input
              type="text"
              name="message"
              value={paymentform.message}
              className="w-full p-3 rounded-lg bg-slate-700 text-white"
              placeholder="Enter Message"
              onChange={handlechange}
            />
            <input
              type="text"
              name="amount"
              value={paymentform.amount}
              className="w-full p-3 rounded-lg bg-slate-700 text-white"
              placeholder="Enter Amount"
              onChange={handlechange}
            />
            <button
              type="button"
              className="w-full text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-4 disabled:from-purple-300"
              onClick={() => pay(Number.parseInt(paymentform.amount) * 100)}
              disabled={paymentform.name?.length < 3 || paymentform.message?.length < 3 || paymentform.amount < 1}
            >
              Pay
            </button>
            <div className="flex flex-wrap gap-2 mt-4">
              <button
                className="bg-slate-700 p-3 rounded-lg flex-1 md:flex-none"
                onClick={() => pay(1000)}
              >
                Pay ₹10
              </button>
              <button
                className="bg-slate-700 p-3 rounded-lg flex-1 md:flex-none"
                onClick={() => pay(2000)}
              >
                Pay ₹20
              </button>
              <button
                className="bg-slate-700 p-3 rounded-lg flex-1 md:flex-none"
                onClick={() => pay(3000)}
              >
                Pay ₹30
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Paymentpage;
