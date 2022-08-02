import React from "react";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { parseCookies } from "nookies";

const Create = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");

  const handleSublit = async (e) => {
    e.preventDefault();
    const imageUrl = await fileUpload();
    const res = await fetch("http://localhost:3000/api/products", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        name,
        price,
        description,
        image: imageUrl,
      }),
    });
    const res2 = await res.json();
    if (res2.error) {
      toast.warning("Product Added Faild");
    } else {
      toast.success("Product Added successful");
    }
  };

  const fileUpload = async () => {
    const formData = new FormData();

    formData.append("file", image);
    formData.append("upload_preset", "my-store");
    formData.append("cloud_name", "dmkyaq9vt");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dmkyaq9vt/image/upload",
      {
        method: "POST",
        body: formData,
      }
    );

    const res2 = await res.json();
    return res2.url;
  };

  return (
    <>
      <ToastContainer />
      <div className="container mx-auto">
        <form
          onSubmit={(e) => {
            handleSublit(e);
          }}
        >
          <div className="bg-gray-800  md:px-20 pt-6">
            <div className=" bg-white rounded-md px-6 py-10 max-w-2xl mx-auto">
              <h1 className="text-center text-2xl font-bold text-gray-500 mb-10">
                ADD Product
              </h1>
              <div className="space-y-4">
                <div>
                  <label htmlFor="title" className="text-lx ">
                    Product Name:
                  </label>
                  <input
                    type="text"
                    placeholder="Name"
                    id="title"
                    name="name"
                    required
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                    className="w-full outline-none py-1 px-2 text-md border-2 rounded-md"
                  />
                </div>
                <div>
                  <label htmlFor="title" className="text-lx ">
                    Product Price:
                  </label>
                  <input
                    type="number"
                    placeholder="Price"
                    id="title"
                    name="price"
                    required
                    onChange={(e) => {
                      setPrice(e.target.value);
                    }}
                    className="w-full outline-none py-1 px-2 text-md border-2 rounded-md"
                  />
                </div>
                <div>
                  <label htmlFor="title" className="text-lx ">
                    Product Image:
                  </label>
                  <input
                    type="file"
                    placeholder="Image"
                    id="title"
                    name="image"
                    required
                    onChange={(e) => {
                      setImage(e.target.files[0]);
                    }}
                    className="w-full outline-none py-1 px-2 text-md border-2 rounded-md"
                  />
                </div>
                <div>
                  <label
                    htmlFor="description"
                    className="block mb-2 text-lg font-serif"
                  >
                    Description:
                  </label>
                  <textarea
                    id="description"
                    cols="10"
                    rows="4"
                    required
                    name="description"
                    onChange={(e) => {
                      setDescription(e.target.value);
                    }}
                    placeholder="whrite here.."
                    className="w-full p-4 text-gray-600 bg-indigo-50 outline-none rounded-md"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className=" w-full px-6 py-2 mx-auto block rounded-md text-lg font-semibold text-indigo-100 bg-indigo-600  "
                >
                  ADD Product
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Create;

export async function getServerSideProps(ctx) {
  const cookie = parseCookies(ctx);
  const user = cookie.user ? JSON.parse(cookie.user) : "";

  if (user.role != "admin") {
    const { res } = ctx;
    res.writeHead(302, { Location: "/" });
    res.end();
  }
  return { props: {} };
}
