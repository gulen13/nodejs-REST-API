import express from "express";
// import Joi from "joi";

import contactsService from "../../models/contacts.js";

import { HttpError } from "../../helpers/index.js";

const contactsRouter = express.Router();

// const contactAddSchema = Joi.object({
//   title: Joi.string().required().messages({
//     "any.required": `"title" must be exist`,
//   }),
//   director: Joi.string().required(),
// })

contactsRouter.get("/", async (req, res, next) => {
  try {
    const result = await contactsService.listContacts();
    res.json(result);
  }
  catch (error) {
    next(error);
  }
})

contactsRouter.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contactsService.getContactById(id);
    if (!result) throw HttpError(404);
    res.json(result);
  }
  catch (error) {
    next(error);
  }
})

// router.post('/', async (req, res, next) => {
//   res.json({ message: 'template message' })
// })

// router.delete('/:contactId', async (req, res, next) => {
//   res.json({ message: 'template message' })
// })

// router.put('/:contactId', async (req, res, next) => {
//   res.json({ message: 'template message' })
// })

export default contactsRouter;
