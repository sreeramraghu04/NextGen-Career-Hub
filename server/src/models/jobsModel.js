import mongoose from "mongoose";
const Schema = mongoose.Schema;

const jobsSchema = new Schema(
  {
    jobTitle: {
      type: String,
      required: true,
    },
    companyName: {
      type: String,
      required: true,
    },
    jobDescription: {
      type: String,
      required: true,
    },
    salary: {
      type: Number,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    highestQualification: {
      type: "String",
      enum: ["High School", "Diploma", "Bachelor", "Master", "PhD"],
      required: true,
    },
    postedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    applicants: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

const Jobs = mongoose.model("Jobs", jobsSchema);

module.exports = Jobs;
