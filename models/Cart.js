import mongoose from "mongoose";
// const { ObjectId } = mongoose.Schema.ObjectId;

const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  products: [
    {
      quantity: {
        type: Number,
        default: 1,
      },
      product: {
        type: mongoose.Schema.ObjectId,
        ref: "Product",
      },
    },
  ],
});

const Cart = mongoose.models.Cart || mongoose.model("Cart", cartSchema);

export default Cart;
