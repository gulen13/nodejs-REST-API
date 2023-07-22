import express from "express";
import controllers from "../../controllers/contacts.js";
import { validateBody, validateObject } from "../../middlewares/index.js";
import { contactSchema } from "../../schemas/contactsSchema.js"

const contactsRouter = express.Router();

contactsRouter.get("/", controllers.getAllContacts)

// contactsRouter.get("/:id", controllers.getAContactById)

contactsRouter.post("/", validateBody(contactSchema), controllers.addContact)

// contactsRouter.put("/:id", validateObject(), validateBody(contactSchema), controllers.changeContact)

// contactsRouter.delete("/:id", controllers.deleteContact)

export default contactsRouter;
