import "dotenv/config";

import express from "express";
import cors from "cors";
import multer from "multer";

import moduleName from "module";
import employeeRouter from "./routes/employee.routes.js";
import authRouter from "./routes/auth.routes.js";
import profileRouter from "./routes/profile.routes.js";
import attendanceRouter from "./routes/attendance.routes.js";
import leaveRouter from "./routes/leaveApplication.routes.js";

const app = express();

// MIDDLEWARES

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(multer().none());

// ROUTES

app.use("/api/v1/employee", employeeRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/auth", profileRouter);
app.use("/api/v1/attendance", attendanceRouter);
app.use("/api/v1/leave", leaveRouter);

export default app;
