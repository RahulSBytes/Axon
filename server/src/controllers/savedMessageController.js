import { LLM } from "../config/llm.js";
import Conversation from "../models/conversation.js";
import SavedMessage from "../models/SavedMessage.js";
import { customError } from "../utils/error.js";

// -------------------------

// controllers/savedMessageController.js
export const saveMessage = async (req, res, next) => {
  console.log("saveMessage is called");
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
    console.error("Save message error:", error);
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
    console.error("Get saved messages error:", error);
    next(new customError("error getting saved messages", 400));
  }
};

// // Get all saved messages (with filters)
// export const getSavedMessages = async (req, res) => {
//   try {
//     const userId = req.user._id;
//     const {
//       tags,
//       search,
//       conversationId,
//       color,
//       limit = 20,
//       page = 1,
//     } = req.query;

//     // Build query
//     const query = { user: userId };

//     if (tags) {
//       const tagsArray = tags.split(",").map((t) => t.trim());
//       query.tags = { $in: tagsArray };
//     }

//     if (conversationId) {
//       query.conversationId = conversationId;
//     }

//     if (color && color !== "default") {
//       query.color = color;
//     }

//     if (search) {
//       query.$or = [
//         { messageText: { $regex: search, $options: "i" } },
//         { conversationTitle: { $regex: search, $options: "i" } },
//         { note: { $regex: search, $options: "i" } },
//       ];
//     }

//     // Pagination
//     const skip = (page - 1) * limit;

//     const [savedMessages, total] = await Promise.all([
//       SavedMessage.find(query)
//         .sort({ createdAt: -1 })
//         .limit(parseInt(limit))
//         .skip(skip),
//       SavedMessage.countDocuments(query),
//     ]);

//     res.status(200).json({
//       success: true,
//       data: savedMessages,
//       pagination: {
//         total,
//         page: parseInt(page),
//         pages: Math.ceil(total / limit),
//       },
//     });
//   } catch (error) {
//     console.error("Get saved messages error:", error);
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// Unsave a message
export const unsaveMessage = async (req, res, next) => {
  try {
    const { messageId } = req.params;
    const userId = req.user._id;

    // Find and delete the saved message reference
    const savedMessage = await SavedMessage.findOneAndDelete({
      user: userId,
      messageId,
    });

    if (!savedMessage)
      return next(new customError("can't find saved message", 400));

    // Update isSaved flag in conversation (for UI)
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
    console.error("Unsave message error:", error);
    return next(new customError("error removing message", 400));
  }
};

// Update saved message (tags, note, color)
export const updateSavedMessage = async (req, res) => {
  try {
    const { messageId } = req.params;
    const userId = req.user._id;
    const { tags, note, color } = req.body;

    const savedMessage = await SavedMessage.findOne({
      user: userId,
      messageId,
    });

    if (!savedMessage) {
      return res.status(404).json({
        success: false,
        message: "Saved message not found",
      });
    }

    // Update fields
    if (tags !== undefined) savedMessage.tags = tags;
    if (note !== undefined) savedMessage.note = note;
    if (color !== undefined) savedMessage.color = color;

    await savedMessage.save();

    res.status(200).json({
      success: true,
      message: "Saved message updated",
      data: savedMessage,
    });
  } catch (error) {
    console.error("Update saved message error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// // Get user's tags (for autocomplete)
// export const getUserTags = async (req, res) => {
//   try {
//     const userId = req.user._id;

//     const tags = await SavedMessage.distinct("tags", { user: userId });

//     res.status(200).json({
//       success: true,
//       data: tags.sort(),
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };
