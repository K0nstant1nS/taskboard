import { Schema, default as mongoose } from "mongoose";

const TaskSchema = new mongoose.Schema({
  _id: {
    type: Schema.Types.ObjectId,
    default: () => new mongoose.Types.ObjectId(),
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  time: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("tasks", TaskSchema)
