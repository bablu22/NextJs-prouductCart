import React, { useState } from "react";
import { parseCookies } from "nookies";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import Image from "next/image";

const Cart = ({ error, products, token }) => {
  const router = useRouter();
  const [product, setProduct] = useState(products);

  if (error) {
    toast.warning(`${error}`);
    router.push("/login");
    Cookies.remove("user");
    Cookies.remove("token");
  }

  const subtotal = product.map(
    (product) => product.product.price * product.quantity
  );

  let sum = 0;
  for (let i = 0; i < subtotal.length; i++) {
    sum += subtotal[i];
  }
  const tax = 10.2;
  const total = sum + tax;

  const remove = async (id) => {
    const res = await fetch("http://localhost:3000/api/cart", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({
        productId: id,
      }),
    });
    const res2 = await res.json();
    console.log("res2", res2.products);
    setProduct(res2.products);
  };

  return (
    <div>
      <ToastContainer />
      <div>
        <div className="flex justify-center my-6">
          <div className="flex flex-col w-full p-8 text-gray-800 bg-white shadow-lg pin-r pin-y md:w-4/5 lg:w-4/5 border border-gray-600">
            <div className="flex-1">
              <table className="w-full text-sm lg:text-base" cellSpacing="0">
                <thead>
                  <tr className="h-12 uppercase">
                    <th className="hidden md:table-cell"></th>
                    <th className="text-left">Product</th>
                    <th className="lg:text-right text-left pl-5 lg:pl-0">
                      <span className="lg:hidden" title="Quantity">
                        Qtd
                      </span>
                      <span className="hidden lg:inline">Quantity</span>
                    </th>
                    <th className="hidden text-right md:table-cell">
                      Unit price
                    </th>
                    <th className="text-right">Total price</th>
                  </tr>
                </thead>
                <tbody>
                  {product.map((product) => {
                    return (
                      <tr key={product._id}>
                        <td className="hidden pb-4 md:table-cell">
                          <a href="#">
                            <Image
                              src={product.product.image}
                              className="w-20 rounded"
                              alt="Thumbnail"
                              height={100}
                              width={100}
                            />
                          </a>
                        </td>
                        <td>
                          <a>
                            <p className="mb-2 md:ml-4">
                              {product.product.name}
                            </p>
                            <button
                              onClick={() => {
                                remove(product.product._id);
                              }}
                              className="text-red-500 md:ml-4"
                            >
                              <small>(Remove item)</small>
                            </button>
                          </a>
                        </td>
                        <td className="hidden text-right md:table-cell">
                          <span className="text-sm lg:text-base font-medium">
                            {product.quantity}
                          </span>
                        </td>
                        <td className="hidden text-right md:table-cell">
                          <span className="text-sm lg:text-base font-medium">
                            ${product.product.price}
                          </span>
                        </td>
                        <td className="text-right">
                          <span className="text-sm lg:text-base font-medium">
                            ${product.product.price * product.quantity}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <hr className="pb-6 mt-6" />

              {!product.length == 0 && (
                <div className="lg:px-2 lg:w-1/2">
                  <div className="p-4 bg-gray-100 rounded-full">
                    <h1 className="ml-2 font-bold uppercase">Order Details</h1>
                  </div>
                  <div className="p-4">
                    <p className="mb-6">
                      Shipping and additionnal costs are calculated based on
                      values you have entered
                    </p>

                    <div className="flex justify-between pt-4 border-b">
                      <div className="lg:px-4 lg:py-2 m-2 text-lg lg:text-xl font-bold text-center text-gray-800">
                        Subtotal
                      </div>
                      <div className="lg:px-4 lg:py-2 m-2 lg:text-lg font-bold text-center text-gray-900">
                        ${sum}
                      </div>
                    </div>
                    <div className="flex justify-between pt-4 border-b">
                      <div className="lg:px-4 lg:py-2 m-2 text-lg lg:text-xl font-bold text-center text-gray-800">
                        Tax
                      </div>
                      <div className="lg:px-4 lg:py-2 m-2 lg:text-lg font-bold text-center text-gray-900">
                        ${tax}
                      </div>
                    </div>
                    <div className="flex justify-between pt-4 border-b">
                      <div className="lg:px-4 lg:py-2 m-2 text-lg lg:text-xl font-bold text-center text-gray-800">
                        Total
                      </div>
                      <div className="lg:px-4 lg:py-2 m-2 lg:text-lg font-bold text-center text-gray-900">
                        ${total}
                      </div>
                    </div>
                    <a href="#">
                      <button className="flex justify-center w-full px-10 py-3 mt-6 font-medium text-white uppercase bg-gray-800 rounded-full shadow item-center hover:bg-gray-700 focus:shadow-outline focus:outline-none">
                        <svg
                          aria-hidden="true"
                          data-prefix="far"
                          data-icon="credit-card"
                          className="w-8"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 576 512"
                        >
                          <path
                            fill="currentColor"
                            d="M527.9 32H48.1C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48.1 48h479.8c26.6 0 48.1-21.5 48.1-48V80c0-26.5-21.5-48-48.1-48zM54.1 80h467.8c3.3 0 6 2.7 6 6v42H48.1V86c0-3.3 2.7-6 6-6zm467.8 352H54.1c-3.3 0-6-2.7-6-6V256h479.8v170c0 3.3-2.7 6-6 6zM192 332v40c0 6.6-5.4 12-12 12h-72c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h72c6.6 0 12 5.4 12 12zm192 0v40c0 6.6-5.4 12-12 12H236c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h136c6.6 0 12 5.4 12 12z"
                          />
                        </svg>
                        <span className="ml-2 mt-5px">
                          Procceed to checkout
                        </span>
                      </button>
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;

export async function getServerSideProps(ctx) {
  const { token } = parseCookies(ctx);

  const res = await fetch("http://localhost:3000/api/cart", {
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  });

  const cart = await res.json();

  if (cart.error) {
    return {
      props: { error: cart.error },
    };
  }
  if (!token) {
    return {
      props: { products: [] },
    };
  }
  return {
    props: { products: cart.products, token: token },
  };
}
