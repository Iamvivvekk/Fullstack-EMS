import { Router } from "express";
import { protect, protectAdmin } from "../middlewares/auth.middleware.js";
import {
  createPayslip,
  getPayslipById,
  getPayslips,
} from "../controller/payslip.controller.js";

const payslipRouter = Router();

payslipRouter.route("/").post(protect, protectAdmin, createPayslip);

payslipRouter.route("/").get(protect, getPayslips);

payslipRouter.route("/:id").get(protect, getPayslipById);

export default payslipRouter;
