import { LLM } from "../config/llm.js";
import Conversation from "../models/conversation.js";
import { customError } from "../utils/error.js";
import { formatHistoryForLLM } from "../utils/helpers.js";

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
      user: req.user._id,
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

export async function sendMessage(req, res, next) {
  try {
    const { chatId } = req.params;
    const {
      prompt,
      model = "llama-3.1-8b-instant",
      toolCalling = false,
    } = req.body;


    console.log("MODEL ::", model, toolCalling);


    if (!chatId) return next(new customError("please provide chatid", 404));
    if (!prompt || !prompt.trim())
      return next(new customError("please enter some prompt", 400));

    const conversation = await Conversation.findById(chatId);
    if (!conversation)
      return next(new customError("conversation not found", 404));

    const history = formatHistoryForLLM(conversation.messages, 10);

    const llmResponse = await LLM(prompt, model, history, next, toolCalling);

    const userMessage = conversation.messages.create({
      role: "user",
      text: prompt,
      metadata: null,
    });

    const assistantMessage = conversation.messages.create({
      role: "assistant",
      text: llmResponse.choices[0].message.content,
      metadata: {
        model: llmResponse.model,
        latency_ms: llmResponse.usage.total_time,
      },
    });

    conversation.messages.push(userMessage, assistantMessage);

    const u = conversation.totalUsage;
    const r = llmResponse.usage;
    conversation.totalUsage = {
      total_tokens: u.total_tokens + r.total_tokens,
      completion_tokens: u.completion_tokens + r.completion_tokens,
      prompt_tokens: u.prompt_tokens + r.prompt_tokens,
    };

    await conversation.save();

    res.status(201).json({
      success: true,
      userMessage: {
        _id: userMessage._id,
        role: userMessage.role,
        text: userMessage.text,
        metadata: null,
        createdAt: userMessage.createdAt,
      },
      assistantMessage: {
        _id: assistantMessage._id,
        role: assistantMessage.role,
        text: assistantMessage.text,
        metadata: assistantMessage.metadata,
        createdAt: assistantMessage.createdAt,
      },
    });
  } catch (error) {
   return next(new customError("error sending message"));
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
    next(error);
  }
}

export async function deleteChat(req, res, next) {
  try {
    const { chatId } = req.params;

    if (!chatId) return next(new customError("chatId missing", 501));

    const chat = await Conversation.findByIdAndDelete(chatId);

    if (!chat)
      return next(
        new customError("something went wrong deleting conversation", 501),
      );

    res.status(201).json({
      success: true,
      chatId: chat._id,
    });
  } catch (error) {
    next(new customError("something went wrong deleting conversation", 501));
  }
}


export const togglePinConversation = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { isPinned } = req.body;
    const user = req.user._id;

    const conversation = await Conversation.findOne({ _id: id, user });

    if (!conversation)
      return next(new customError("conversation not found", 404));

    conversation.isPinned = isPinned;

    await conversation.save();

    res.status(200).json({
      success: true,
      updatedData: {
        _id: conversation._id,
        isPinned: conversation.isPinned,
      },
    });
  } catch (error) {
    next(new customError("error pinning the conversation", 404));
  }
};

export async function getAllStaredConversations(req, res, next) {
  try {
  } catch (error) {
    console.log("error getting starred converation ::", error);
    next(error);
  }
}
