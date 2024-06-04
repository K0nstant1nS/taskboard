import UnauthorizedError from "../errors/unauthorized-error";
import comparePasswords from "../utils/compare-passwords";

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

UserSchema.statics
  .findUserByCredentials = function findByCredentials(email: string, password: string) {
    return this.findOne({ email }).select('+password')
      .then((user) => {
        if (!user) {
          return Promise.reject(new UnauthorizedError('Неправильные почта или пароль'));
        }
        return comparePasswords(password, user.password) ? user : Promise.reject(new UnauthorizedError('Неправильные почта или пароль'));
      });
  };

export default mongoose.model("users", UserSchema);
