const ctrlWrapper = controller => {
  const wrappedCtrl = async (req, res, next) => {
    try {
      await controller(req, res, next);
    } catch (error) {
      next(error);
    }
  };

  return wrappedCtrl;
};

export default ctrlWrapper;