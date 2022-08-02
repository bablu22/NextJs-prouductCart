import Product from "../../../models/Products";
import initDB from "../../../helpers/initDatabase";

initDB();

export default async function getProductByID(req, res) {
  const id = req.query.id;

  try {
    const data = await Product.findOne({ _id: id });
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
}
