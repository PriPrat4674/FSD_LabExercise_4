//main recruitment object
const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
  candidateName: {
    type: String,
    required: [true, "Required: Candidate name"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Required: Candidate email"],
    lowercase: true,
    trim: true,
  },
  jobTitle: {
    type: String,
    required: [true, "Required: Job title"],
    trim: true,
  },
  status: {
    type: String,
    enum: ["Applied", "Screening", "Interviewing", "Offered", "Rejected"],
    default: "Applied",
  },
  experienceYears: {
    type: Number,
    min: 0,
    default: 0,
  },
  appliedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Application", applicationSchema);
