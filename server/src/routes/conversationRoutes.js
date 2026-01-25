import express from "express";
import {
  createChat,
  deleteChat,
  getAllChats,
  getChatById,
  sendMessage,
  togglePinConversation,
} from "../controllers/conversationControllers.js";
import { isAuthenticated } from "../middlewares.js";

const router = express.Router();

router.post("/:chatId/message", isAuthenticated, sendMessage);
router.patch("/:id/toggle-pin", isAuthenticated, togglePinConversation);

router
  .route("/")
  .get(getAllChats) // checked
  .post(createChat);


router
  .route("/:chatId")
  .get(getChatById) // checked
  .delete(deleteChat); // checked


export default router;
