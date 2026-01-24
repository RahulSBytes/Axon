import {LLM } from "../config/llm.js";
import Conversation from "../models/conversation.js";
import SavedMessage from "../models/SavedMessage.js";
import { customError } from "../utils/error.js";


export async function sendMessage(req, res, next) {
  try {
    const { chatId } = req.params;
    const { prompt, model = "llama-3.1-8b-instant" } = req.body;

    if (!chatId) return next(new customError("please provide chatid", 404));

    if (!prompt || !prompt.trim())
      return next(new customError("please enter some prompt", 400));

    const conversation = await Conversation.findById(chatId);

    if (!conversation)
      return next(new customError("conversation not found", 404));

    const llmResponse = await LLM(prompt, model, next);
    const userMessageForDatabase = {
      role: "user",
      text: prompt,
      metadata: null,
    };

    conversation.messages.push(userMessageForDatabase);

    const assistantMessageForDatabase = {
      role: "assistant",
      text: llmResponse.choices[0].message.content,
      metadata: {
        model: llmResponse.model,
        latency_ms: llmResponse.usage.total_time,
      },
    };

    conversation.messages.push(assistantMessageForDatabase);

    const u = conversation.totalUsage;
    const r = llmResponse.usage;

    conversation.totalUsage = {
      total_tokens: u.total_tokens + r.total_tokens,
      completion_tokens: u.completion_tokens + r.completion_tokens,
      prompt_tokens: u.prompt_tokens + r.prompt_tokens,
    };

    await conversation.save();

    // response with the llm result
    res.status(201).json({
      success: true,
      conversation,
    });
  } catch (error) {
    console.log("error marking star ::", error);
    next(error);
  }
}



// -------------------------



// controllers/savedMessageController.js
export const saveMessage = async (req, res) => {
  try {
    const { conversationId, messageId } = req.body;
    const userId = req.user._id;

    const conversation = await Conversation.findOne({
      _id: conversationId,
      user: userId,
    });

    if (!conversation) {
      return res.status(404).json({
        success: false,
        message: "Conversation not found",
      });
    }

    // Find the message being saved
    const messageIndex = conversation.messages.findIndex(
      (msg) => msg._id.toString() === messageId,
    );

    if (messageIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Message not found",
      });
    }

    const message = conversation.messages[messageIndex];

    // ✅ NEW: Get parent question if saving assistant message
    let parentQuestion = null;
    if (message.role === "assistant" && messageIndex > 0) {
      // Find the previous user message
      for (let i = messageIndex - 1; i >= 0; i--) {
        if (conversation.messages[i].role === "user") {
          parentQuestion = {
            questionText: conversation.messages[i].text,
            questionId: conversation.messages[i]._id,
          };
          break;
        }
      }
    }

    // Check if already saved
    const existing = await SavedMessage.findOne({ user: userId, messageId });
    if (existing) {
      return res.status(400).json({
        success: false,
        message: "Message already saved",
      });
    }

    // Create saved message
    const savedMessage = await SavedMessage.create({
      user: userId,
      conversationId,
      messageId,
      conversationTitle: conversation.title,
      messageText: message.text,
      messageRole: message.role,
      parentQuestion,
      metadata: message.metadata || {},
    });

    // Update isSaved flag
    message.isSaved = true;
    await conversation.save();

    res.status(201).json({
      success: true,
      message: "Message saved successfully",
      data: savedMessage,
    });
  } catch (error) {
    console.error("Save message error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};




// Get all saved messages
export const getSavedMessages = async (req, res) => {
  try {
    const savedMessages = await SavedMessage.find({ user: req.user._id })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: savedMessages,
    });
  } catch (error) {
    console.error("Get saved messages error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
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
export const unsaveMessage = async (req, res) => {
  try {
    const { messageId } = req.params;
    const userId = req.user._id;

    // Find and delete the saved message reference
    const savedMessage = await SavedMessage.findOneAndDelete({
      user: userId,
      messageId,
    });

    if (!savedMessage) {
      return res.status(404).json({
        success: false,
        message: "Saved message not found",
      });
    }

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
      message: "Message unsaved successfully",
    });
  } catch (error) {
    console.error("Unsave message error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
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
