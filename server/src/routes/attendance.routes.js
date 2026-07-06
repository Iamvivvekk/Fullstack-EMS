import { Router } from "express";
import { protect } from "../middlewares/auth.middleware.js";
import { clockInOut, getAttendance } from "../controller/attendance.controller.js";

const attendanceRouter = Router();

attendanceRouter.route("/").get(protect, getAttendance);

attendanceRouter.route("/").post(protect, clockInOut);

export default attendanceRouter;
