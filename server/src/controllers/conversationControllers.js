import Conversation from "../models/conversation.js";
import { customError } from "../utils/error.js";

export async function getAllChats(req, res) {
  try {
    const chats = await Conversation.find(
      { user: req.user._id },
      "-totalUsage",
    );

    if (!chats) return next(new customError("No chat available !", 501));

    return res.status(201).json({
      success: true,
      chats: chats,
    });
  } catch (error) {
    console.log("error getting all chats ::", error);
    next(error);
  }
}

export async function createChat(req, res, next) {
  try {
    const { title } = req.body;
    if (!title) return next(new customError("title required", 404));

    const conversation = await Conversation.insertOne({
      userId: req.user._id,
      title,
    });
    
    if (!conversation)
      return next(new customError("error creating converation", 404));

    res.status(201).json({
      success: true,
      conversation,
    });
  } catch (error) {
    console.log("error getting chat ::", error);
    next(error);
  }
}


export async function getChatById(req, res, next) {
  try {
    const { chatId } = req.params;

    if (!chatId) return next(new customError("chatId missing", 501));

    const chat = await Conversation.findById(chatId, "-totalUsage");

    if (!chat) return next(new customError("No such chat available !", 501));

    res.status(201).json({
      success: true,
      chat,
    });
  } catch (error) {
    console.log("error getting chat ::", error);
    next(error);
  }
}

export async function deleteChat(req, res, next) {
  try {
    const { chatId } = req.params;

    if (!chatId) return next(new customError("chatId missing", 501));

    const response = await Conversation.findByIdAndDelete(chatId);

    if (!response)
      return next(
        new customError("something went wrong deleting conversation", 501),
      );

    res.status(201).json({
      success: true,
      response,
      message: "chat deleted successfully",
    });
  } catch (error) {
    console.log("error getting all chats ::", error);
    next(error);
  }
}

// controllers/conversationController.js

export const togglePinConversation = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const conversation = await Conversation.findOne({ _id: id, userId });

    if (!conversation) {
      return res.status(404).json({
        success: false,
        message: "Conversation not found",
      });
    }

    // Toggle the star
    conversation.isStarred = !conversation.isStarred;
    conversation.starredAt = conversation.isStarred ? new Date() : null;

    await conversation.save();

    res.status(200).json({
      success: true,
      message: conversation.isStarred
        ? "Conversation starred"
        : "Conversation unstarred",
      data: {
        _id: conversation._id,
        isStarred: conversation.isStarred,
        starredAt: conversation.starredAt,
      },
    });
  } catch (error) {
    console.error("Toggle star error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export async function getAllStaredConversations(req, res, next) {
  try {
  } catch (error) {
    console.log("error getting starred converation ::", error);
    next(error);
  }
}
