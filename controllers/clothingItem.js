import ClothingItem from "../models/clothingItem.js";
import NotFoundError from '../errors/NotFoundError.js';
import BadRequestError from '../errors/BadRequestError.js';
import ForbiddenError from '../errors/ForbiddenError.js';


const createItem = (req, res, next) => {
  const { name, weather, imageUrl } = req.body;
  const owner = req.user._id;

  ClothingItem.create({ name, weather, imageUrl, owner })
    .then((item) => {
      if (!item) {
        throw new BadRequestError("No item found");
      }
      return res.status(201).send({ item })
  })
    .catch(next);
};

const getItems = (req, res, next) => {
  ClothingItem.find({})
    .then((items) => {
      if (!items) {
        throw new NotFoundError("No items found"); 
      }
        return res.status(200).send(items);
})
    .catch((err) => {
      console.error(err);
        return next(err);
    });
};

const deleteItem = (req, res, next) => {
  const { itemId } = req.params;

  ClothingItem.findById(itemId)
    .then((item) => {
      if (!item) {
        throw new NotFoundError('Item not found');
      }
      if (item.owner.toString() !== req.user._id.toString()) {
        throw new ForbiddenError('Unable to remove an item owned by another user');
      }
        return res.status(200).send({ data: item });
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "CastError") {
        return next(new BadRequestError("The id string is in an invalid format"))
       }
        return next(err);
    });
};

// Like/Dislike functionality
const likes = (req, res, next) => {
  const { itemId } = req.params;
  ClothingItem.findByIdAndUpdate(itemId, { $addToSet: { likes: req.user._id } }, { new: true })
    .then((item) => {
      if (!item) {
        throw new NotFoundError('Item not found');
      }
        return res.status(200).send({ data: item });
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "CastError") {
         return next(new BadRequestError("The id string is in an invalid format"))
      }
        return next(err);  
    });
};

const removeLikes = (req, res, next) => {
  const { itemId } = req.params;
  ClothingItem.findByIdAndUpdate(itemId, { $pull: { likes: req.user._id } }, { new: true })
    .then((item) => {
      if (!item) {
        throw new NotFoundError('Item not found');
      }
        return res.status(200).send({ data: item });
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "CastError") {
         return next(new BadRequestError("The id string is in an invalid format"))
      } 
        return next(err);   
    });
};

export { createItem, getItems, deleteItem, likes, removeLikes };
