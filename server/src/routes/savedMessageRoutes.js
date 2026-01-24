// routes/savedMessageRoutes.js
import express from 'express';

import { getSavedMessages, saveMessage, sendMessage, unsaveMessage } from '../controllers/savedMessageController.js';
import { isAuthenticated } from '../middlewares.js';

const router = express.Router();

router.post('/', isAuthenticated, saveMessage);
router.get('/', isAuthenticated, getSavedMessages);
router.post('/send/:chatId', isAuthenticated, sendMessage);
router.delete('/:messageId', isAuthenticated, unsaveMessage);
// router.patch('/:messageId', isAuthenticated, updateSavedMessage);

export default router;