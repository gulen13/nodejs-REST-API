import Joi from "joi";

export const userSignupSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  subscription: Joi.string().min(3)
})

export const userSigninSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
})

export default {
  userSignupSchema,
  userSigninSchema
}