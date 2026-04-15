import express from 'express';

import {
  deleteItem,
  removeLikes,
} from "../controllers/clothingItem.js";

const clothingItemRouter = express.Router();
// CRUD

// Create


// Read




// Delete
clothingItemRouter.delete("/:itemId", deleteItem);

// Likes


// Remove Likes
clothingItemRouter.delete("/:itemId/likes", removeLikes);

export default clothingItemRouter;
