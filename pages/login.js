import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:3000/api/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const res2 = await res.json();

    const user = JSON.stringify(res2.user);
    if (res2.error) {
      return toast.warning(`${res2.error}`);
    } else {
      Cookies.set("token", res2.token);
      Cookies.set("user", user);
      toast.success("Signup successful");
      router.push("/account");
    }
  };

  return (
    <>
      <ToastContainer />
      <section className="flex justify-center items-center h-screen bg-gray-100">
        <div className="max-w-md w-full bg-white rounded p-6 space-y-4 broder-2 border-gray-600">
          <div className="mb-4">
            <p className="text-gray-600">Sign In</p>
            <h2 className="text-xl font-bold">Join our community</h2>
          </div>
          <form action="" className="" onSubmit={(e) => handleSubmit(e)}>
            <div>
              <input
                className="w-full p-4 text-sm bg-gray-50 focus:outline-none border border-gray-200 rounded text-gray-600 mb-5"
                type="email"
                required
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <input
                className="w-full p-4 text-sm bg-gray-50 focus:outline-none border border-gray-200 rounded text-gray-600 mb-5"
                type="password"
                required
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <button
                type="submit"
                className="w-full py-4 bg-blue-600 hover:bg-blue-700 rounded text-sm font-bold text-gray-50 transition duration-200"
              >
                Sign In
              </button>
            </div>
          </form>
          <div className="flex items-center justify-between">
            <div className="flex flex-row items-center">
              <input
                type="checkbox"
                className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
              />
              <label
                htmlFor="comments"
                className="ml-2 text-sm font-normal text-gray-600"
              >
                Remember me
              </label>
            </div>
            <div>
              <a className="text-sm text-blue-600 hover:underline" href="#">
                Forgot password?
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
