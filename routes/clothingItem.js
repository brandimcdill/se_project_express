import express from 'express';

import {
  getItems,
  likes,
  deleteItem,
  removeLikes,
} from "../controllers/clothingItem.js";

const clothingItemRouter = express.Router();

clothingItemRouter.get('/', getItems);


// Delete
clothingItemRouter.delete("/:itemId", deleteItem);

// Likes
clothingItemRouter.put('/:itemId/likes', likes);

// Remove Likes
clothingItemRouter.delete("/:itemId/likes", removeLikes);

export default clothingItemRouter;
