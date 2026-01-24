import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  role: {
    type: String,
    enum: ["user", "assistant"],
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  isSaved: {
    type: Boolean,
    default: false,
  },
  
  metadata: {  // Metadata only for assistant messages
    model: String,
    latency_ms: Number,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const conversationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      default: "New Conversation",
    },
    isPinned: {
      type: Boolean,
      default: false,
    },
    // Track which model is being used in this conversation
    activeModel: {
      type: String,
      default: "llama-3.1-8b-instant",
    },
    // Aggregate token usage for the entire conversation
    totalUsage: {
      prompt_tokens: { type: Number, default: 0 },
      completion_tokens: { type: Number, default: 0 },
      total_tokens: { type: Number, default: 0 },
    },
    messages: [messageSchema],
  },
  { timestamps: true }
);

// Index for faster queries
conversationSchema.index({ user: 1, createdAt: -1 });
conversationSchema.index({ user: 1, isPinned: -1 });

const Conversation = mongoose.model("Conversation", conversationSchema);

export default Conversation;






/* 

============ response example =================

{
  "_id": "...",
  "user": "user_object_id",
  "title": "States of India",
  "isPinned": false,
  "activeModel": "llama-3.1-8b-instant",
  "totalUsage": {
    "prompt_tokens": 321,
    "completion_tokens": 77,
    "total_tokens": 398
  },
  "messages": [
    {
      "role": "user",
      "text": "How many states are in India?",
      "favorite": false,
      "metadata": null,  // No metadata for user messages
      "createdAt": "2024-01-15T10:00:00Z"
    },
    {
      "role": "assistant",
      "text": "India has a total of 28 states and 8 union territories.",
      "favorite": false,
      "metadata": {
        "model": "llama-3.1-8b-instant",
        "request_id": "chatcmpl-7dea8b27-1fd8-4286-866b-2421ed085474",
        "prompt_tokens": 321,
        "completion_tokens": 77,
        "total_tokens": 398,
        "finish_reason": "stop",
        "latency_ms": 199
      },
      "createdAt": "2024-01-15T10:00:01Z"
    }
  ],
  "createdAt": "2024-01-15T10:00:00Z",
  "updatedAt": "2024-01-15T10:00:01Z"
}



*/