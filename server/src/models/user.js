import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      select: false,
    },
    avatar: {
      type: String,
      default: null,
    },
    providers: {
      type: [String],
      enum: ["local", "google"],
      default: ["local"],
    },
    googleId: {
      type: String,
      default: null,
    },
  },
  { timestamps: true },
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password") || !this.password) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  if (!this.password) return false; 
  return await bcrypt.compare(candidatePassword, this.password);
};

userSchema.methods.addProvider = function (provider) {
  if (!this.providers.includes(provider)) {
    this.providers.push(provider);
  }
};


const User = mongoose.model("User", userSchema);
export default User;
