import express from 'express';

import {
  createItem,
  likes,
  deleteItem,
  removeLikes,
} from "../controllers/clothingItem.js";

const clothingItemRouter = express.Router();
import { validateCardBody, validateId } from '../middlewares/validation.js';


clothingItemRouter.post('/', validateCardBody, createItem);




// Delete
clothingItemRouter.delete("/:itemId", validateId, deleteItem);

// Likes
clothingItemRouter.put('/:itemId/likes', validateId, likes);

// Remove Likes
clothingItemRouter.delete("/:itemId/likes", validateId, removeLikes);

export default clothingItemRouter;
