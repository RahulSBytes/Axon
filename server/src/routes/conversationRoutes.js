import express from "express";
import {
  createChat,
  deleteChat,
  getAllChats,
  getChatById,
  togglePinConversation,
} from "../controllers/conversationControllers.js";
import { isAuthenticated } from "../middlewares.js";

const router = express.Router();

router.patch('/:id/toggle-pin', isAuthenticated, togglePinConversation);

router
  .route("/")
  .get(getAllChats)   // checked
  .post(createChat); // POST   /api/chats → Create new chat thread

router
  .route("/:chatId")
  .get(getChatById)   // checked
  .delete(deleteChat);    // checked

export default router;
