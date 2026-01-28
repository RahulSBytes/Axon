// routes/savedMessageRoutes.js
import express from 'express';

import { getSavedMessages, saveMessage, unsaveMessage } from '../controllers/savedMessageController.js';
import { isAuthenticated } from '../middlewares.js';

const router = express.Router();

router.patch('/', saveMessage);
router.get('/', isAuthenticated, getSavedMessages);
router.delete('/:messageId', unsaveMessage);
// router.patch('/:messageId', isAuthenticated, updateSavedMessage);

export default router;