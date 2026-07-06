import mongoose, { Schema, ObjectId } from "mongoose";
import { leaveStatus } from "../constants/leaveStatus.js";
const leaveApplicationSchema = new Schema(
  {
    employeeId: {
      type: ObjectId,
      ref: "Employee",
      required: true,
    },
    status: {
      type: String,
      enum: leaveStatus,
      required: true,
      uppercase: true,
      default: "PENDING",
    },
    type: {
      type: String,
      required: true,
      uppercase: true,
      enum: ["SICK", "CASUAL", "ANNUAL"],
    },
    reason: {
      type: String,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
  },

  { timestamps: true },
);

const LeaveApplication =
  mongoose.models.LeaveApplication ||
  mongoose.model("LeaveApplication", leaveApplicationSchema);

export default LeaveApplication;
