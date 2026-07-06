import { Router } from "express";

import { protect } from "../middlewares/auth.middleware.js";

import { getProfile, updateProfile } from "../controller/profile.controller.js";

const profileRouter = Router();

profileRouter.route("/").get(protect, getProfile);

profileRouter.route("/").post(protect, updateProfile);

export default profileRouter