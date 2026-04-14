import express from 'express';

import {
  
  deleteItem,

  removeLikes,
} from "../controllers/clothingItem.js";

const clothingItemRouter = express.Router();
// CRUD

// Create
// clothingItemRouter.post("/", createItem); // Moved to public route

// Read
// clothingItemRouter.get("/", getItems); // Moved to public route



// Delete
clothingItemRouter.delete("/:itemId", deleteItem);

// Likes
// clothingItemRouter.put("/:itemId/likes", likes); // Moved to public route

// Remove Likes
clothingItemRouter.delete("/:itemId/likes", removeLikes);

export default clothingItemRouter;
