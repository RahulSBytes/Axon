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

router.use(isAuthenticated)

router.post("/:chatId/message", sendMessage);
router.patch("/:id/toggle-pin", togglePinConversation);

router
  .route("/")
  .get(getAllChats)
  .post(createChat);


router
  .route("/:chatId")
  .get(getChatById)
  .delete(deleteChat);


export default router;
