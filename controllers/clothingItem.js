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
    .orFail()
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
    .then((item) => res.status(200).send({ data: item }))
    .catch((e) => {
      if (e && (e.statusCode === 404 || e.name === 'DocumentNotFoundError')) {
        return res.status(404).send({ message: 'Item not found' });
      }
      if (e && e.name === 'CastError') {
       return res.status(400).send({ message: "itemId is invalid", e });
      }
      return res.status(500).send({ message: 'Server error', e });
    });
  };

const likes = (req, res) => {
  const { itemId } = req.params;
  const userId = req.user && req.user._id;

  ClothingItem.findByIdAndUpdate(
    itemId,
    { $addToSet: { likes: userId } },
    { new: true }
  )
    .orFail(() => {
      const error = new Error("Item not found");
      error.statusCode = 404;
      throw error;
    })
    .then((item) => res.status(200).send({ data: item }))
    .catch((e) => {
      if (e && (e.statusCode === 404 || e.name === 'DocumentNotFoundError')) {
        return res.status(404).send({ message: 'Item not found' });
      }
      if (e && e.name === 'CastError') {
        return res.status(400).send({ message: 'Invalid item id' });
      }
      return res.status(500).send({ message: 'Server error', e });
    });
};

const removeLikes = (req, res) => {
  const { itemId } = req.params;
  const userId = req.user && req.user._id;

  ClothingItem.findByIdAndUpdate(
    itemId,
    { $pull: { likes: userId } },
    { new: true }
  )
    .orFail(() => {
      const error = new Error('Item not found');
      error.statusCode = 404;
      throw error;
    })
    .then((item) => res.status(200).send({ data: item }))
    .catch((e) => {
      if (e && (e.statusCode === 404 || e.name === 'DocumentNotFoundError')) {
        return res.status(404).send({ message: 'Item not found' });
      }
      if (e && e.name === 'CastError') {
        return res.status(400).send({ message: 'Invalid item id' });
      }
      return res.status(500).send({ message: 'Server error', e });
    });
};
module.exports = {
  createItem,
  getItems,
  updateItem,
  deleteItem,
  likes,
  removeLikes,
};
