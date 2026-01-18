import mongoose, { Types } from "mongoose";

const conversationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    title: {
      type: String,
      default: "Conversation",
    },
    isPinned: {
      type: Boolean,
      default: false,
    },
    messages: [
      {
        role: {
          type: String,
          enum: ["user", "assistant"],
        },
        content: String,
        favorite: {
          type: Boolean,
          default: false,
        },
        createdAt: Date,
      },
    ],
  },
  { timestamps: true }
);

const Conversation = mongoose.model("Conversation", conversationSchema);

export default Conversation;
