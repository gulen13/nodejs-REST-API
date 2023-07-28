import User from "../models/userModel.js"
import { HttpError, ctrlWrapper } from "../helpers/index.js";

const signup = async (req, res) => {
  const newUser = await User.create(req.body)

  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription
    }
  })
}

export default {
  signup: ctrlWrapper(signup),
}