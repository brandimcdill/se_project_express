const ClothingItem = require("../models/clothingItem");

const createItem = (req, res) => {
  console.log(req);
  console.log(req.body);

  const { name, weather, imageUrl } = req.body;
  const owner = req.user._id;

  ClothingItem.create({ name, weather, imageUrl, owner })
    .then((item) => {
      console.log(item);
      console.log(req.user._id);
      res.send({ data: item });
    })
    .catch((e) => {
      res.status(400).send({ message: "Error from createItem", e });
    });
};

const getItems = (req, res) => {
  ClothingItem.find({})
    .then((items) => res.status(200).send(items))
    .catch((e) => {
      res.status(500).send({ message: "Error from getItems", e });
    });
};

const updateItem = (req, res) => {
  const { itemId } = req.params;
  const { imageUrl } = req.body;

  ClothingItem.findByIdAndUpdate(itemId, { $set: { imageUrl } })
    .orFail(() => {
      const error = new Error("Item ID not found");
      error.statusCode = 404;
      throw error;
    })
    .then((item) => res.status(200).send({ data: item }))

    .catch((e) => {
      res.status(400).send({ message: "Error from updateItem", e });
    });
};

const deleteItem = (req, res) => {
  const { itemId } = req.params;

  console.log(itemId);
  ClothingItem.findByIdAndDelete(itemId)
    .orFail()
    .then((item) => res.status(204).send({ data: item }))
    .catch((e) => {
      res.status(400).send({ message: "Error from deleteItem", e });
    });
};

const likes = (req, res) => {
  const { itemId } = req.params;
  const { like } = req.body;

  ClothingItem.findByIdAndUpdate(
    itemId,
    { $addToSet: { likes: like } },
    { new: true }
  )
    .orFail(() => {
      const error = new Error("Likes an item with an incorrect _id");
      error.statusCode = 400;
      throw error;
    })
    .then((item) => res.status(200).send({ data: item }))
    .catch((e) => {
      if (e.name === "ItemNotFoundError") {
        return res
          .status(404)
          .send({ message: "Likes an item with an nonexistent _id" });
      }
      if (e.name === "ItemInvalidIdError") {
        return res
          .status(400)
          .send({ message: "Likes an item with an incorrect_id" });
      }
    });
};

const updateLikes = (req, res) => {
  const { itemId } = req.params;
  const { like } = req.body;

  ClothingItem.findByIdAndUpdate(
    itemId,
    { $pull: { likes: like } },
    { new: true }
  )
    .orFail()
    .then((item) => res.status(200).send({ data: item }))
    .catch((e) => {
      res.status(400).send({ message: "Error from updateLikes", e });
    });
};
module.exports = {
  createItem,
  getItems,
  updateItem,
  deleteItem,
  likes,
  updateLikes,
};
