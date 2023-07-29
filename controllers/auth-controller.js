import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config"
import User from "../models/userModel.js"
import { HttpError, ctrlWrapper } from "../helpers/index.js";

const { JWT_SECRET } = process.env;

const signup = async (req, res) => {
  const { email, password, subscription } = req.body;

  const hashPassword = await bcrypt.hash(password, 10)

  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email in use");
  }

  const newUser = await User.create({ ...req.body, password: hashPassword })
  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription
    }
  })
}

const signin = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }

  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, "Email or password is wrong");
  }

  const payload = {
    id: user._id,
  }

  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "23h" })

  res.json({
    token,
    user: {
      email: user.email,
      subscription: user.subscription
    }
  })
}

export default {
  signup: ctrlWrapper(signup),
  signin: ctrlWrapper(signin),
}