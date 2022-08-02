import React, { Fragment } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import Cookies from "js-cookie";

const Navbar = () => {
  const cookie = parseCookies();

  const user = cookie.user ? JSON.parse(cookie.user) : "";

  const router = useRouter();
  function isActive(route) {
    if (route == router.pathname) {
      return "active";
    } else {
      return "";
    }
  }

  function deleteHandle() {
    Cookies.remove("token");
    Cookies.remove("user");
    router.push("/login");
  }

  return (
    <div>
      <div className="flex flex-wrap place-items-center w-full">
        <section className="w-full">
          <nav className="flex justify-between bg-gray-900 text-white w-full">
            <div className="px-5 xl:px-12 py-6 flex w-full items-center">
              <a className="text-3xl font-bold font-heading" href="#">
                Amazon
              </a>

              <ul className=" md:flex px-4 mx-auto font-heading space-x-12">
                <li>
                  <Link href="/">
                    <a className={isActive("/")}>Home</a>
                  </Link>
                </li>
                {user ? (
                  <Fragment>
                    <li>
                      <Link href="/login">
                        <a onClick={deleteHandle}>Logout</a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/account">
                        <a className={isActive("/account")}>Account</a>
                      </Link>
                    </li>
                  </Fragment>
                ) : (
                  <Fragment>
                    <li>
                      <Link href="/login">
                        <a className={isActive("/login")}>Login</a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/signup">
                        <a className={isActive("/signup")}>Signup</a>
                      </Link>
                    </li>
                  </Fragment>
                )}

                {user.role === "admin" && (
                  <li>
                    <Link href="/create">
                      <a className={isActive("/create")}>Create</a>
                    </Link>
                  </li>
                )}
              </ul>

              <div className="hidden xl:flex items-center space-x-5 ">
                {user && (
                  <Link href="/cart">
                    <a className="flex items-center hover:text-gray-200">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                      <span className="flex absolute -mt-5 ml-4">
                        <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-pink-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-pink-500"></span>
                      </span>
                    </a>
                  </Link>
                )}

                <a className="flex items-center hover:text-gray-200">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 hover:text-gray-200"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </nav>
        </section>
      </div>
    </div>
  );
};

export default Navbar;
