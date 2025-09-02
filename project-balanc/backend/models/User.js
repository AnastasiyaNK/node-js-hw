import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["income", "expense"],
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const userSchema = new mongoose.Schema({
  initialBalance: {
    type: Number,
    min: 0,
    required: true,
  },
  currentBalance: {
    type: Number,
    min: 0,
    required: true,
    },
  transactions: [transactionSchema]
});

const User = mongoose.model("User", userSchema)
export default User;