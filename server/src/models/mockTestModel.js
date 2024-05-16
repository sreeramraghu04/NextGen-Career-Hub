import mongoose from "mongoose";

const mockTestSchema = mongoose.Schema({
  mockTestName: {
    type: String,
    required: true,
  },
  questions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Question",
    },
  ],
  totalQuestions: {
    type: Number,
    required: true,
  },
  totalMarks: {
    type: Number,
    required: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const MockTest = mongoose.model("MockTest", mockTestSchema);

module.exports = MockTest;
