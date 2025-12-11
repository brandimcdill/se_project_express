const router = require("express").Router();

const {
  createItem,
  getItems,
  updateItem,
  deleteItem,
  likes,
  removeLikes,
} = require("../controllers/clothingItem");

// CRUD

// Create
router.post("/", createItem);

// Read
router.get("/", getItems);

// Update
router.put("/:itemId", updateItem);

// Delete
router.delete("/:itemId", deleteItem);

// Likes
router.put("/:itemId/likes", likes);

// Remove Likes
router.delete("/:itemId/likes", removeLikes);

module.exports = router;
