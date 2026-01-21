const ClothingItem = require("../models/clothingItem");
const { ERROR_TYPES } = require("../utils/error");

// Helper to handle the catch block logic consistently
const handleControllerError = (res, e) => {
  // 400: Invalid Data (Length, required fields, etc.)
  if (e.name === 'ValidationError' || e.name === 'CastError') {
    return res.status(ERROR_TYPES.BAD_REQUEST.statusCode)
              .send({ message: ERROR_TYPES.BAD_REQUEST.message });
  }

  // 404: Handled by .orFail()
  if (e.statusCode === ERROR_TYPES.NOT_FOUND.statusCode) {
    return res.status(e.statusCode).send({ message: e.message });
  }

  // 500: Everything else
  const statusCode = e.statusCode || ERROR_TYPES.INTERNAL_SERVER_ERROR.statusCode;
  const message = e.message || ERROR_TYPES.INTERNAL_SERVER_ERROR.message;
  return res.status(statusCode).send({ message });
};


const createItem = (req, res) => {
  const { name, weather, imageUrl } = req.body;
  const owner = req.user._id;

  ClothingItem.create({ name, weather, imageUrl, owner })
    .then((item) => res.status(201).send({ data: item }))
    .catch((e) => {
      // The helper now knows how to handle "ValidationError"
      handleControllerError(res, e);
    });
};

const getItems = (req, res) => {
  ClothingItem.find({})
    .then((items) => res.status(200).send({ data: items }))
    .catch((e) => handleControllerError(res, e));
};

const deleteItem = (req, res) => {
  const { itemId } = req.params;
  ClothingItem.findByIdAndDelete(itemId)
    .orFail(() => {
      const err = new Error(ERROR_TYPES.NOT_FOUND.message);
      err.statusCode = ERROR_TYPES.NOT_FOUND.statusCode;
      throw err;
    })
    .then((item) => res.status(200).send({ data: item }))
    .catch((e) => handleControllerError(res, e));
};

// Consolidated Like/Dislike logic
const updateLikes = (req, res, updateQuery) => {
  ClothingItem.findByIdAndUpdate(req.params.itemId, updateQuery, { new: true })
    .orFail(() => {
      const err = new Error(ERROR_TYPES.NOT_FOUND.message);
      err.statusCode = ERROR_TYPES.NOT_FOUND.statusCode;
      throw err;
    })
    .then((item) => res.status(200).send({ data: item }))
    .catch((e) => handleControllerError(res, e));
};

const likes = (req, res) => updateLikes(req, res, { $addToSet: { likes: req.user._id } });
const removeLikes = (req, res) => updateLikes(req, res, { $pull: { likes: req.user._id } });

module.exports = { createItem, getItems, deleteItem, likes, removeLikes };
