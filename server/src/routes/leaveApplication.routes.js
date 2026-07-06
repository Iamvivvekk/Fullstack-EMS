import { Router } from "express";
import { protect, protectAdmin } from "../middlewares/auth.middleware.js";
import {
  createLeave,
  getLeaves,
  updateLeaveStatus,
} from "../controller/leaveApplication.controller.js";

const leaveRouter = Router();

leaveRouter.route("/").get(protect, getLeaves);

leaveRouter.route("/").post(protect, createLeave);

leaveRouter.route("/:id").patch(protect, protectAdmin, updateLeaveStatus);

export default leaveRouter;
