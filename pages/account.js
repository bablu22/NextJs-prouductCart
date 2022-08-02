import React from "react";
import { parseCookies } from "nookies";

const Account = () => {
  const cookie = parseCookies();
  const user = cookie.user ? JSON.parse(cookie.user) : "";
  console.log(user);
  return (
    <div>
      <div className="flex items-center justify-center min-h-screen bg-gray-800">
        <div
          className="w-full max-w-lg px-10 py-8 mx-auto bg-white rounded-lg shadow-xl"
          id="main-content"
        >
          <div className=" border-dashed border-2 h-24 pt-2 text-center text-gray-400  rounded-lg font-bold focus:ring-2 focus:ring-indigo-500">
            <h1 className="text-3xl">Hi! {user.name}</h1>
            <h5 className="text-lg">Email: {user.email}</h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;

export async function getServerSideProps(ctx) {
  const { token } = parseCookies(ctx);
  if (!token) {
    const { res } = ctx;
    res.writeHead(302, { Location: "/login" });
    res.end();
  }
  return { props: {} };
}
