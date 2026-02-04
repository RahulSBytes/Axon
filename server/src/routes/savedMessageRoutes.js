import express from 'express';

import { getSavedMessages, saveMessage, unsaveMessage } from '../controllers/savedMessageController.js';
import { isAuthenticated } from '../middlewares.js';

const router = express.Router();

router.use(isAuthenticated)
router.patch('/', saveMessage);
router.get('/', getSavedMessages);
router.delete('/:messageId', unsaveMessage);

export default router;