const mongoose = require("mongoose");

const feeSchema = new mongoose.Schema({
  studentID: {
    type: String,
    // unique: true,
    lowercase: true
  },
  data: {
    type: String,
    default: ""
  },
  last_updated: {
    type: Date
  },
  lock: {
    type: Boolean,
    default: false
  }
});

feeSchema.pre("save", async function(next) {
  const fee = this;
  const now = new Date();
  fee.last_updated = now;
  next();
});

const Fee = mongoose.model("Fee", feeSchema);

module.exports = Fee;
