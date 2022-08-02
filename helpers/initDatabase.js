const mongoose = require("mongoose");

const connectMongo = async () => {
  mongoose
    .connect(
      `mongodb+srv://my-cart-dB:XRkoZ3dheTQCnVVh@cluster0.tzt34uk.mongodb.net/my-cart-db`,
      { useNewUrlParser: true, useUnifiedTopology: true }
    )
    .then(() => {
      console.log("connect");
    })
    .catch((err) => {
      console.log(err);
    });
};

export default connectMongo;
