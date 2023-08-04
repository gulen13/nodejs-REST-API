import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config"
import User from "../models/userModel.js"
import { HttpError, ctrlWrapper, resizeAvatarImg } from "../helpers/index.js";
import gravatar from "gravatar";
import path from "path";
import fs from "fs/promises"

const { JWT_SECRET } = process.env;

const avatarPath = path.resolve("public", "avatars");

const signup = async (req, res) => {
  const { email, password, subscription } = req.body;

  const hashPassword = await bcrypt.hash(password, 10)

  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email in use");
  }

  const avatarURL = gravatar.url(email);

  const newUser = await User.create({ ...req.body, password: hashPassword, avatarURL })


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
  await User.findByIdAndUpdate(user._id, { token })

  res.json({
    token,
    user: {
      email: user.email,
      subscription: user.subscription
    }
  })
}

const getcurrent = async (req, res) => {
  const { email, subscription } = req.user;
  res.json({
    email,
    subscription
  })
}

const signout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" })

  res.status(204).json();
}

const updateSubscription = async (req, res) => {
  const { _id } = req.user;

  const updatedUser = await User.findByIdAndUpdate(_id, req.body, {
    new: true,
  });

  res.json({
    email: updatedUser.email,
    subscription: updatedUser.subscription,
  });
};

const updateAvatar = async (req, res) => {
  const { _id } = req.user;
  const { path: tempUpload, originalname } = req.file;
  await resizeAvatarImg(tempUpload);
  const filename = `${_id}_${originalname}`;
  const resultUpload = path.join(avatarPath, filename);
  await fs.rename(tempUpload, resultUpload);
  const avatarURL = path.join("avatars", filename);
  await User.findByIdAndUpdate(_id, { avatarURL });

  res.json({ avatarURL });
}

export default {
  signup: ctrlWrapper(signup),
  signin: ctrlWrapper(signin),
  getcurrent: ctrlWrapper(getcurrent),
  signout: ctrlWrapper(signout),
  updateSubscription: ctrlWrapper(updateSubscription),
  updateAvatar: ctrlWrapper(updateAvatar)
}