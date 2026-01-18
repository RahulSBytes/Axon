import express from 'express'
import { createChat, deleteChat, getAllChats, getChatById } from '../controllers/conversationControllers.js';

const router = express.Router();

router.route('/')
    .get(getAllChats)       // GET    /api/chats → Get all chats for user
    .post(createChat)       // POST   /api/chats → Create new chat thread

router.route('/:chatId')
    .get(getChatById)       // GET    /api/chats/:chatId → Get single chat
    .delete(deleteChat);    // DELETE /api/chats/:chatId → Delete specific chat

export default router;