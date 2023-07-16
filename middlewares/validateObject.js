import { HttpError } from "../helpers/index.js";

const validateObject = validationSchema => {
  const validate = async (req, res, next) => {

    if (Object.entries(req.body).length === 0 && req.body.constructor === Object) {
      next(HttpError(400, `missing fields`));
    }

    next();
  };

  return validate;
};

export default validateObject;