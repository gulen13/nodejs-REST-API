import Joi from "joi";

export const userSignupSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "any.required": `missing required email field`,
    "string.email": `email should be like real email`,
  }),
  password: Joi.string().min(6).required().messages({
    "any.required": `missing required password field`,
    "string.min": `password length must be at least 6 characters long`
  }),
  subscription: Joi.string().min(3)
})

export const userSigninSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "any.required": `missing required email field`,
    "string.email": `email should be like real email`,
  }),
  password: Joi.string().min(6).required().messages({
    "any.required": `missing required password field`,
    "string.min": `password length must be at least 6 characters long`
  }),
})

export const updateSubscription = Joi.object({
  subscription: Joi.string()
    .valid('starter', 'pro', 'business')
    .required()
    .messages({
      'any.required': 'missing subscription field',
      'any.only':
        'Invalid subscription type. It should be one of - starter, pro, or business',
    }),
});

export const userEmailSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "any.required": "missing required email field",
  }),
});

export default {
  userSignupSchema,
  userSigninSchema,
  updateSubscription,
  userEmailSchema
}