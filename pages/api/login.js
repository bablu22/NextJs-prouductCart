import initDB from "../../helpers/initDatabase";
import bcrypt from "bcrypt";
import User from "../../models/User";
import jwt from "jsonwebtoken";

initDB();

export default async function logIn(req, res) {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ message: "Please fill all the feild" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Can't find user " });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const token = jwt.sign({ user: user._id }, "SECRET_KEY", {
        expiresIn: "2d",
      });
      const { name, email, role } = user;
      return res.status(200).json({
        message: "Login Success",
        token: token,
        user: { name, email, role },
      });
    } else {
      return res.status(200).json({ error: "Email & Password don't match" });
    }
  } catch (error) {
    console.log(error);
  }
}
