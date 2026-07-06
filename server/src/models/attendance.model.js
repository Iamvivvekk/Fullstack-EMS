import mongoose, { Schema, model, ObjectId } from "mongoose";

const attendanceSchema = new Schema(
  {
    employeeId: {
      type: ObjectId,
      ref: "Employee",
      required: true,
    },
    date: { type: Date, required: true },
    checkIn: { type: Date, required: true },
    checkOut: { type: Date, required: true },
    status: {
      type: String,
      default: "PRESENT",
      enum: ["ABSENT", "PRESENT", "LATE"],
    },
    workingHours: { type: Number, default: null },
    dayType: {
      type: String,
      enum: ["Full Day", "Three Quarter Day", "Half Day", "Short Day", null],
      default: null,
    },
  },
  { timestamps: true },
);

attendanceSchema.index({ employeeId: 1, date: 1 }, { unique: true });

const Attendance =
  mongoose.models.Attendance || model("Attendance", attendanceSchema);

export default Attendance;
