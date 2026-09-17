import express from 'express';
import {
  createItem,
  likes,
  deleteItem,
  removeLikes,
} from "../controllers/clothingItem.js";
import { validateCardBody, validateId } from '../middlewares/validation.js';

const clothingItemRouter = express.Router();

clothingItemRouter.post('/', validateCardBody, createItem);
clothingItemRouter.delete("/:itemId", validateId, deleteItem);
clothingItemRouter.put('/:itemId/likes', validateId, likes);
clothingItemRouter.delete("/:itemId/likes", validateId, removeLikes);

export default clothingItemRouter;
