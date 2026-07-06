import mongoose, { Schema, model, ObjectId } from "mongoose";

const payslipSchema = new Schema(
  {
    employeeId: {
      type: ObjectId,
      ref: "Employee",
      required: true,
    },
    month: { type: Number, required: true },
    year: { type: Number, required: true },
    basicSalary: { type: Number, required: true },
    deductions: { type: Number, default: 0 },
    allowances: { type: Number, default: 0 },
    netSalary: { type: Number, required: true },
  },
  { timestamps: true },
);

const Payslip = mongoose.models.Payslip || model("ayslip", payslipSchema);

export default Payslip;
