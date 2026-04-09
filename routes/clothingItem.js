import express from 'express';

import {
  createItem,
  getItems,
  deleteItem,
  likes,
  removeLikes,
} from "../controllers/clothingItem.js";

const clothingItemRouter = express.Router();
// CRUD

// Create
clothingItemRouter.post("/", createItem);

// Read
clothingItemRouter.get("/", getItems);



// Delete
clothingItemRouter.delete("/:itemId", deleteItem);

// Likes
clothingItemRouter.put("/:itemId/likes", likes);

// Remove Likes
clothingItemRouter.delete("/:itemId/likes", removeLikes);

export default clothingItemRouter;
