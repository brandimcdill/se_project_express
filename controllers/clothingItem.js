const ClothingItem = require("../models/clothingItem");
const { ERROR_TYPES } = require("../utils/error");


const createItem = (req, res) => {
  const { name, weather, imageUrl } = req.body;
  const owner = req.user._id;

  ClothingItem.create({ name, weather, imageUrl, owner })
    .then((item) => res.status(201).send({ data: item }))
    .catch((e) => {
     if (e.name === "ValidationError") {
        return res.status(ERROR_TYPES.BAD_REQUEST.statusCode)
                  .send({ message: ERROR_TYPES.BAD_REQUEST.message });
      }
      return res.status(ERROR_TYPES.INTERNAL_SERVER_ERROR.statusCode)
                .send({ message: ERROR_TYPES.INTERNAL_SERVER_ERROR.message });
    });
};

const getItems = (req, res) => {
  ClothingItem.find({})
    .then((items) => res.status(200).send({ data: items }))
    .catch((e) => {
      // Handle CastError (invalid ID format) or 404 from orFail()
      if (e.name === "CastError") {
        return res.status(ERROR_TYPES.BAD_REQUEST.statusCode)
                  .send({ message: ERROR_TYPES.BAD_REQUEST.message });
      }
      if (e.statusCode === ERROR_TYPES.NOT_FOUND.statusCode) {
        return res.status(e.statusCode).send({ message: ERROR_TYPES.NOT_FOUND.message });
      }
      return res.status(ERROR_TYPES.INTERNAL_SERVER_ERROR.statusCode)
                .send({ message: ERROR_TYPES.INTERNAL_SERVER_ERROR.message });
    });
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
    .catch((e) => {
      // Handle CastError (invalid ID format) or 404 from orFail()
      if (e.name === "CastError") {
        return res.status(ERROR_TYPES.BAD_REQUEST.statusCode)
                  .send({ message: ERROR_TYPES.BAD_REQUEST.message });
      }
      if (e.statusCode === ERROR_TYPES.NOT_FOUND.statusCode) {
        return res.status(e.statusCode).send({ message: ERROR_TYPES.NOT_FOUND.message });
      }
      return res.status(ERROR_TYPES.INTERNAL_SERVER_ERROR.statusCode)
                .send({ message: ERROR_TYPES.INTERNAL_SERVER_ERROR.message });
    });
};

// Like/Dislike functionality
const likes = (req, res) => {
  const { itemId } = req.params;
  ClothingItem.findByIdAndUpdate(itemId, { $addToSet: { likes: req.user._id } }, { new: true })
    .orFail(() => {
      const err = new Error(ERROR_TYPES.NOT_FOUND.message);
      err.statusCode = ERROR_TYPES.NOT_FOUND.statusCode;
      throw err;
    })
    .then((item) => res.status(200).send({ data: item }))
    .catch((e) => {
      // Handle CastError (invalid ID format) or 404 from orFail()
      if (e.name === "CastError") {
        return res.status(ERROR_TYPES.BAD_REQUEST.statusCode)
                  .send({ message: ERROR_TYPES.BAD_REQUEST.message });
      }
      if (e.statusCode === ERROR_TYPES.NOT_FOUND.statusCode) {
        return res.status(e.statusCode).send({ message: ERROR_TYPES.NOT_FOUND.message });
      }
      return res.status(ERROR_TYPES.INTERNAL_SERVER_ERROR.statusCode)
                .send({ message: ERROR_TYPES.INTERNAL_SERVER_ERROR.message });
    });
};

const removeLikes = (req, res) => {
  const { itemId } = req.params;
  ClothingItem.findByIdAndUpdate(itemId, { $pull: { likes: req.user._id } }, { new: true })
    .orFail(() => {
      const err = new Error(ERROR_TYPES.NOT_FOUND.message);
      err.statusCode = ERROR_TYPES.NOT_FOUND.statusCode;
      throw err;
    })
    .then((item) => res.status(200).send({ data: item }))
    .catch((e) => {
      // Handle CastError (invalid ID format) or 404 from orFail()
      if (e.name === "CastError") {
        return res.status(ERROR_TYPES.BAD_REQUEST.statusCode)
                  .send({ message: ERROR_TYPES.BAD_REQUEST.message });
      }
      if (e.statusCode === ERROR_TYPES.NOT_FOUND.statusCode) {
        return res.status(e.statusCode).send({ message: ERROR_TYPES.NOT_FOUND.message });
      }
      return res.status(ERROR_TYPES.INTERNAL_SERVER_ERROR.statusCode)
                .send({ message: ERROR_TYPES.INTERNAL_SERVER_ERROR.message });
    });
};

module.exports = { createItem, getItems, deleteItem, likes, removeLikes };
