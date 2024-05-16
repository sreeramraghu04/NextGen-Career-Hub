import mongoose from "mongoose";

const Schema = mongoose.Schema;

export const UserSchema = new Schema({
  username: { type: String, required: true, min: 4, unique: true },
  password: { type: String, required: true },
  resumeFile: {
    type: String,
  },
  firstName: {
    type: String,
    required: [true, "First name is required"],
  },
  lastName: {
    type: String,
    required: [true, "Last name is required"],
  },
  email: {
    type: String,
    required: [true, "Email address is required"],
    unique: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/,
      "Please enter a valid email address",
    ],
  },
  phone: {
    type: String,
    required: [true, "Phone number is required"],
    unique: true,
    match: [/^\d{10}$/, "Please enter a valid 10-digit phone number"],
  },
  highestQualification: {
    type: String,
    enum: [
      "High School",
      "Associate Degree",
      "Bachelor's Degree",
      "Master's Degree",
      "Doctorate",
      "None",
    ],
    default: "None",
  },
  placementStatus: {
    type: String,
    enum: ["Placed", "Job-Seeking", "None"],
    default: "None",
  },
  companyName: {
    type: String,
    default: "None",
  },
  userType: {
    type: String,
    enum: ["Employee", "Employer", "Admin"],
    default: "Admin",
    required: [true, "User type is required"],
  },
  mockTestResults: [
    {
      mockTestId: { type: mongoose.Schema.Types.ObjectId, ref: "MockTest" },
      marksObtained: { type: Number },
    },
  ],
  created_date: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
