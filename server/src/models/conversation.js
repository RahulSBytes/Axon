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
  
  metadata: { 
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
    activeModel: {
      type: String,
      default: "llama-3.1-8b-instant",
    },
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
