import connectMongo from "../../helpers/initDatabase";
import Product from "../../models/Products";

connectMongo();

export default function productHandler(req, res) {
  switch (req.method) {
    case "GET":
      getProduct(req, res);
      break;
    case "POST":
      PostProduct(req, res);
      break;

    default:
      break;
  }
}

async function getProduct(req, res) {
  try {
    const data = await Product.find();
    return res
      .status(200)
      .json({ message: "Product Save SUccess", result: data });
  } catch (error) {
    console.log(error);
  }
}

async function PostProduct(req, res) {
  try {
    const getProduct = req.body;
    const newProduct = new Product();
    newProduct.name = getProduct.name;
    newProduct.price = getProduct.price;
    newProduct.description = getProduct.description;
    newProduct.image = getProduct.image;
    await newProduct.save();

    return res
      .status(200)
      .json({ message: "Product Save SUccess", result: newProduct });
  } catch (error) {
    console.log(error);
  }
}
