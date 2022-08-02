import initDB from "../../helpers/initDatabase";
import jwt from "jsonwebtoken";
import Cart from "../../models/Cart";

initDB();

export default async function CartHandler(req, res) {
  switch (req.method) {
    case "GET":
      await getCart(req, res);
      break;
    case "PUT":
      await postCart(req, res);
      break;
    case "DELETE":
      await removeCart(req, res);
      break;

    default:
      break;
  }
}

async function getCart(req, res) {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "You must have to login" });
  }

  try {
    const { user } = jwt.verify(authorization, "SECRET_KEY");
    const cart = await Cart.findOne({ user: user }).populate(
      "products.product"
    );
    return res.status(400).json(cart);
  } catch (error) {
    return res.status(401).json({ error: "You must have to login" });
  }
}

async function postCart(req, res) {
  const { quantity, productId } = req.body;
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "You must have to login" });
  }

  const { user } = jwt.verify(authorization, "SECRET_KEY");

  const cart = await Cart.findOne({ user: user });

  const pExists = cart.products.some(
    (pdoc) => productId === pdoc.product.toString()
  );

  if (pExists) {
    await Cart.findOneAndUpdate(
      { _id: cart._id, "products.product": productId },
      { $inc: { "products.$.quantity": quantity } }
    );
  } else {
    const newProduct = { quantity, product: productId };
    await Cart.findOneAndUpdate(
      { _id: cart._id },
      { $push: { products: newProduct } }
    );
  }
  return res.status(200).json({ message: "product added to cart" });
}

async function removeCart(req, res) {
  const { authorization } = req.headers;
  const { productId } = req.body;

  if (!authorization) {
    return res.status(401).json({ error: "You must have to login" });
  }

  try {
    const { user } = jwt.verify(authorization, "SECRET_KEY");

    const cart = await Cart.findOneAndUpdate(
      { user: user },
      {
        $pull: { products: { product: productId } },
      },
      { new: true }
    ).populate("products.product");

    return res.status(400).json(cart);
  } catch (error) {
    return res.status(401).json({ error: "You must have to login" });
  }
}
