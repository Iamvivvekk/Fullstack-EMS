import { Router } from "express";
import {
  createEmployee,
  deleteEmployee,
  getEmployee,
  updateEmployee,
} from "../controller/employee.controller.js";
import { protect, protectAdmin } from "../middlewares/auth.middleware.js";

const employeeRouter = Router();

employeeRouter.route("/").get(protect, protectAdmin, getEmployee);

employeeRouter.route("/").post(protect, protectAdmin, createEmployee);

employeeRouter.route("/:id").put(protect, protectAdmin, updateEmployee);

employeeRouter.route("/:id").delete(protect, protectAdmin, deleteEmployee);

export default employeeRouter;
