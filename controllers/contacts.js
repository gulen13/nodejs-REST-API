import Contact from "../models/contactModel.js";
import { HttpError, ctrlWrapper } from "../helpers/index.js";

export const getAllContacts = async (req, res) => {
  const result = await Contact.find();
  res.json(result);
}

export const getAContactById = async (req, res, next) => {
  const { id } = req.params;
  const result = await Contact.findById(id);
  if (!result) throw HttpError(404);
  res.json(result);
}

export const addContact = async (req, res) => {
  const result = await Contact.create(req.body);
  res.status(201).json(result);
}

export const changeContact = async (req, res, next) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw HttpError(404);
  }
  res.json(result);
}

export const updateStatusContact = async (req, res, next) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw HttpError(404);
  }
  res.json(result);
}

export const deleteContact = async (req, res, next) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndDelete(id);
  if (!result) {
    throw HttpError(404);
  }
  res.json({
    message: "contact deleted"
  })
}

export default {
  getAllContacts: ctrlWrapper(getAllContacts),
  getAContactById: ctrlWrapper(getAContactById),
  addContact: ctrlWrapper(addContact),
  changeContact: ctrlWrapper(changeContact),
  updateStatusContact: ctrlWrapper(updateStatusContact),
  deleteContact: ctrlWrapper(deleteContact),
}