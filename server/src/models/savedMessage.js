// models/SavedMessage.js - NEW FILE
import mongoose from 'mongoose';

const savedMessageSchema = new mongoose.Schema(
  {
    conversationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Conversation",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    messageId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    messageText: {
      type: String,
      required: true,
    },
    metadata: {
      model: String,
      latency_ms: Number,
    },

    parentQuestion: {
      questionText: {
        type: String,
        default: null,
      },
      questionId: {
        type: mongoose.Schema.Types.ObjectId,
        default: null,
      },
    },

  },
  { timestamps: true }
);

// Indexes for fast queries
savedMessageSchema.index({ user: 1, createdAt: -1 }); 
savedMessageSchema.index({ user: 1, conversationId: 1 });
savedMessageSchema.index({ user: 1 });

export default mongoose.model('SavedMessage', savedMessageSchema);