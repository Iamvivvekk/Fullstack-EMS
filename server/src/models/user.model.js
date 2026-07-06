import { Schema, models, model } from "mongoose";

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["ADMIN", "EMPLOYEE"],
      default: "EMPLOYEE",
    },
  },
  { timestamps: true },
);

const User = models.User || model("User", userSchema);

export default User;
