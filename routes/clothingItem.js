import express from 'express';

import {
  createItem,
  getItems,
  likes,
  deleteItem,
  removeLikes,
} from "../controllers/clothingItem.js";

const clothingItemRouter = express.Router();
// CRUD

// Create

clothingItemRouter.get('/', getItems);

// Read

clothingItemRouter.post('/', createItem);


// Delete
clothingItemRouter.delete("/:itemId", deleteItem);

// Likes
clothingItemRouter.put('/:itemId/likes', likes);

// Remove Likes
clothingItemRouter.delete("/:itemId/likes", removeLikes);

export default clothingItemRouter;
