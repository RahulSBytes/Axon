import Conversation from "../models/conversation.js";
import SavedMessage from "../models/savedMessage.js"
import { customError } from "../utils/error.js";

// -------------------------

export const saveMessage = async (req, res, next) => {
  try {
    const { conversationId, messageId } = req.body;
    const userId = req.user._id;

    const [conversation, existing] = await Promise.all([
      Conversation.findOne({ _id: conversationId, user: userId }),
      SavedMessage.findOne({ user: userId, messageId }),
    ]);

    if (!conversation)
      return next(new customError("conversation not found", 400));
    if (existing) return next(new customError("message already saved", 400));

    // Find the message being saved
    const messageIndex = conversation.messages.findIndex(
      (msg) => msg._id.toString() === messageId,
    );

    const message = conversation.messages[messageIndex];

    if (message.role === "user" || messageIndex < 1) {
      return next(new customError("user message can't be saved", 400));
    }

    let parentQuestion = null;
    for (let i = messageIndex - 1; i >= 0; i--) {
      if (conversation.messages[i].role === "user") {
        parentQuestion = {
          questionText: conversation.messages[i].text,
          questionId: conversation.messages[i]._id,
        };
        break;
      }
    }

    const savedMessage = await SavedMessage.create({
      user: userId,
      conversationId,
      messageId,
      messageText: message.text,
      messageRole: message.role,
      parentQuestion,
      metadata: message.metadata || {},
    });

    message.isSaved = true;
    await conversation.save();

    res.status(201).json({
      success: true,
      info: { messageId: savedMessage.messageId, isSaved: true },
    });
  } catch (error) {
    next(new customError("error saving message", 400));
  }
};

// Get all saved messages
export const getSavedMessages = async (req, res, next) => {
  try {
    const savedMessages = await SavedMessage.find({ user: req.user._id }).sort({
      createdAt: -1,
    });

    if (!savedMessages) next(new customError("messages not found", 400));

    res.status(200).json({
      success: true,
     savedMessages,
    });
  } catch (error) {
    next(new customError("error getting saved messages", 400));
  }
};


// Unsave a message
export const unsaveMessage = async (req, res, next) => {
  try {
    const { messageId } = req.params;
    const userId = req.user._id;

    const savedMessage = await SavedMessage.findOneAndDelete({
      user: userId,
      messageId,
    });

    if (!savedMessage)
      return next(new customError("can't find saved message", 400));

    const conversation = await Conversation.findById(
      savedMessage.conversationId,
    );

    if (conversation) {
      const message = conversation.messages.id(messageId);
      if (message) {
        message.isSaved = false;
        await conversation.save();
      }
    }

    res.status(200).json({
      success: true,
      info: { messageId: savedMessage.messageId, isSaved: false },
    });
  } catch (error) {
    return next(new customError("error removing message", 400));
  }
};
