"use client";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { updateuser, fetchuser } from "@/actions/useractions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Dashboard = () => {
  const { data: session, status, update } = useSession();
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    username: "",
    razorpayid: "",
    razorpaysecret: "",
    coverpic: "",
    profilepic: "",
  });

  useEffect(() => {
    if (status === "loading") return; // Wait until session loading is complete
    if (!session || !session.user) {
      router.push("/login");
    } else {
      (async () => {
        try {
          const u = await fetchuser(session.user.name);
          setForm(u);
        } catch (error) {
          toast.error("Failed to fetch user data");
        }
      })();
    }
  }, [session, status, router]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    try {
      if (session && session.user) {
        await updateuser(form, session.user.name); // Pass form state instead of event
        toast.success("Profile updated", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (error) {
      toast.error("Failed to update profile");
    }
  };

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
      <div className="container mx-auto py-5">
        <h1 className="text-center text-3xl font-bold">
          Welcome to your dashboard
        </h1>
        <form
          onSubmit={handleSubmit}
          className="max-w-2xl mx-auto flex flex-col gap-2 my-2"
        >
          <div className="my-2">
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-white"
            >
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={form && form.name}
              onChange={handleChange}
              className="block w-full bg-gray-800 text-white border border-gray-300 rounded-md p-2 focus:outline-none"
            />
          </div>
          <div className="my-2">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-white"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={form && form.email}
              onChange={handleChange}
              className="block w-full bg-gray-800 text-white border border-gray-300 rounded-md p-2 focus:outline-none"
            />
          </div>
          <div className="my-2">
            <label
              htmlFor="username"
              className="block mb-2 text-sm font-medium text-white"
            >
              Username
            </label>
            <input
              type="text"
              name="username"
              id="username"
              value={form && form.username}
              onChange={handleChange}
              className="block w-full bg-gray-800 text-white border border-gray-300 rounded-md p-2 focus:outline-none"
            />
          </div>
          <div className="my-2">
            <label
              htmlFor="razorpayid"
              className="block mb-2 text-sm font-medium text-white"
            >
              Razorpay ID
            </label>
            <input
              type="text"
              name="razorpayid"
              id="razorpayid"
              value={form && form.razorpayid}
              onChange={handleChange}
              className="block w-full bg-gray-800 text-white border border-gray-300 rounded-md p-2 focus:outline-none"
            />
          </div>
          <div className="my-2">
            <label
              htmlFor="razorpaysecret"
              className="block mb-2 text-sm font-medium text-white"
            >
              Razorpay Secret
            </label>
            <input
              type="text"
              name="razorpaysecret"
              id="razorpaysecret"
              value={form && form.razorpaysecret}
              onChange={handleChange}
              className="block w-full bg-gray-800 text-white border border-gray-300 rounded-md p-2 focus:outline-none"
            />
          </div>
          <div className="my-2">
            <label
              htmlFor="coverpic"
              className="block mb-2 text-sm font-medium text-white"
            >
              Cover Picture URL
            </label>
            <input
              type="text"
              name="coverpic"
              id="coverpic"
              value={form && form.coverpic}
              onChange={handleChange}
              className="block w-full bg-gray-800 text-white border border-gray-300 rounded-md p-2 focus:outline-none"
            />
          </div>
          <div className="my-2">
            <label
              htmlFor="profilepic"
              className="block mb-2 text-sm font-medium text-white"
            >
              Profile Picture URL
            </label>
            <input
              type="text"
              name="profilepic"
              id="profilepic"
              value={form && form.profilepic}
              onChange={handleChange}
              className="block w-full bg-gray-800 text-white border border-gray-300 rounded-md p-2 focus:outline-none"
            />
          </div>
          <div className="my-2">
            <button
              type="submit"
              className="block w-full text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Dashboard;
