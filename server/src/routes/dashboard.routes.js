import { Router } from "express";
import { protect } from "../middlewares/auth.middleware.js";
import { getDashboard } from "../controller/dashboard.controller.js";

const dashboardRouter = Router();

dashboardRouter.route("/").get(protect, getDashboard);

export default dashboardRouter;
