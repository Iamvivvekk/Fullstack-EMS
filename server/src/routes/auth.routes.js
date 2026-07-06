import { Router } from "express";
import { protect, protectAdmin } from "../middlewares/auth.middleware.js";

import {
  changePassword,
  login,
  session,
} from "../controller/auth.controller.js";

const authRouter = Router();

authRouter.route("/login").post(login);
authRouter.route("/session").get(protect, session);
authRouter.route("/change-password").post(protect, changePassword);

export default authRouter;
