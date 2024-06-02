const { Schema, default: mongoose } = require("mongoose");

const UserSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    default: () => new mongoose.Types.ObjectId(),
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  tasks: {
    type: [Schema.Types.ObjectId],
    ref: "tasks"
  }
});

module.exports = mongoose.model("users", UserSchema);
