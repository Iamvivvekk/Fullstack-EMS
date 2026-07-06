import mongoose,{ Schema,  model, ObjectId } from "mongoose";
import { DEPARTMENTS } from "../constants/department.js";

const employeeSchema = new Schema(
  {
    userId: {
      type: ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    department: {
      type: String,
      enum: DEPARTMENTS,
      default: "ENGINEERING",
      uppercase: true,
    },
    position: { type: String, required: true },
    basicSalary: { type: Number, default: 0 },
    allowances: { type: Number, default: 0 },
    deductions: { type: Number, default: 0 },
    joinDate: { type: Date, required: true },
    isDeleted: { type: Boolean, default: false },
    employmentStatus: {
      type: String,
      enum: ["ACTIVE", "INACTIVE"],
      uppercase: true,
    },
    bio: { type: String, default: "" },
    // image: {type:},
  },
  { timestamps: true },
);

const Employee = mongoose.models.Employee || model("Employee", employeeSchema);

export default Employee;
