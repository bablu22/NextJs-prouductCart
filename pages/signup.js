import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:3000/api/signup", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });
    const res2 = await res.json();
    console.log(res2);
    if (res2.message === "User already registered") {
      return toast.warning(`${res2.message}`);
    }
    if (res2.message === "Signup Success") {
      toast.success("Signup successful");
      router.push("/login");
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="grid  place-items-center">
        <div className="w-11/12 p-12 border border-gray-400 bg-white sm:w-8/12 md:w-1/2 lg:w-5/12 my-10">
          <h1 className="text-xl ">
            Hello there ?,{" "}
            <span className="font-normal">
              please fill in your information to continue
            </span>
          </h1>
          <form className="mt-6" onSubmit={(e) => handleSubmit(e)}>
            <div className="">
              <span className="w-1/2">
                <label
                  htmlFor="name"
                  className="block text-xs font-semibold text-gray-600 uppercase"
                >
                  Name
                </label>
                <input
                  id="firstname"
                  type="text"
                  name="firstname"
                  placeholder="John"
                  autoComplete="given-name"
                  onChange={(e) => setName(e.target.value)}
                  className="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
                  required
                />
              </span>
            </div>
            <label
              htmlFor="email"
              className="block mt-2 text-xs font-semibold text-gray-600 uppercase"
            >
              E-mail
            </label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="john.doe@company.com"
              autoComplete="email"
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
              required
            />
            <label
              htmlFor="password"
              className="block mt-2 text-xs font-semibold text-gray-600 uppercase"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="********"
              autoComplete="new-password"
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
              required
            />

            <button
              type="submit"
              className="w-full py-3 mt-6 font-medium tracking-widest text-white uppercase bg-black shadow-lg focus:outline-none hover:bg-gray-900 hover:shadow-none"
            >
              Sign up
            </button>
            <p className="flex justify-between  mt-4 text-xs text-gray-500 cursor-pointer hover:text-black">
              Already registered?
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
