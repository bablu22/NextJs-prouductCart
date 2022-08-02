import initDB from "../../helpers/initDatabase";
import bcrypt from "bcrypt";
import User from "../../models/User";
import Cart from "../../models/Cart";

initDB();

export default async function signUP(req, res) {
  const { name, email, password } = req.body;

  try {
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Please fill all the feild" });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already registered" });
    }

    const hashedPass = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: hashedPass,
    });
    await newUser.save();
    await new Cart({ user: newUser._id }).save();
    return res.status(200).json({ message: "Signup Success" });
  } catch (error) {
    console.log(error);
  }
}
