import React, { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { parseCookies } from "nookies";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SingleProduct = ({ data }) => {
  const product = data;
  const [quantity, setQuantity] = useState(1);
  const router = useRouter();
  const { token } = parseCookies();

  if (router.isFallback) {
    return (
      <div className="flex justify-center items-center">
        <div
          className="spinner-border animate-spin inline-block w-20 h-20 mt-28"
          role="status"
        >
          <svg
            aria-hidden="true"
            className="mr-2 w-20 h-20 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
        </div>
      </div>
    );
  }

  const addToCart = async () => {
    if (!token) {
      toast.warning("Please Login first");
      router.push("/login");
    }

    const res = await fetch("http://localhost:3000/api/cart", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({
        quantity,
        productId: product._id,
      }),
    });
    const res2 = await res.json();
    if (res2.error) {
      toast.warning(`${error}`);
    } else {
      toast.success(`${res2.message}`);
    }
  };

  return (
    <div className="container mx-auto">
      <ToastContainer />
      <div className=" bg-gray-800 flex items-center p-5 lg:p-10 overflow-hidden relative">
        <div className="w-full max-w-6xl rounded bg-white shadow-xl p-10 lg:p-20 mx-auto text-gray-800 relative md:text-left">
          <div className="md:flex items-center ">
            <div className="w-full  px-10 mb-10 md:mb-0">
              <div className="relative">
                <Image
                  src={product.image}
                  className="w-full relative z-10"
                  alt="Product"
                  height={400}
                  width={400}
                />
              </div>
            </div>
            <div className="w-full  px-10">
              <div className="mb-10">
                <h1 className="font-bold uppercase text-2xl mb-5">
                  {product.name}
                </h1>
                <p className="text-sm">{product.description}</p>
              </div>
              <div>
                <div className="flex justify-between mb-5">
                  <div className="inline-block align-bottom mr-5">
                    <span className="text-2xl leading-none align-baseline">
                      $
                    </span>
                    <span className="font-bold text-5xl leading-none align-baseline">
                      {product.price}
                    </span>
                  </div>
                  <div className="inline-block  mr-5">
                    <input
                      type="number"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      className="w-full text-center text-gray-700 bg-gray-200 outline-none focus:outline-none hover:text-black focus:text-black font-bold text-3xl rounded leading-none align-baseline"
                    />
                  </div>
                </div>
                <div className="inline-block align-bottom">
                  <button
                    onClick={addToCart}
                    className="bg-yellow-300 opacity-75 hover:opacity-100 text-yellow-900 hover:text-gray-900 rounded-full px-10 py-2 font-semibold"
                  >
                    <i className="mdi mdi-cart -ml-2 mr-2"></i> Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;

export async function getStaticProps({ params: { id } }) {
  const res = await fetch(`http://localhost:3000/api/product/${id}`);
  const data = await res.json();

  return {
    // Passed to the page component as props
    props: { data },
  };
}

export async function getStaticPaths() {
  return {
    paths: [{ params: { id: "62e4de392fbf0e74cde2dd20" } }],
    fallback: true, // can also be true or 'blocking'
  };
}
