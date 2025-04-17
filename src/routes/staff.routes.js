import { Router } from "express";
import StaffController from "../controllers/staff.controller.js";
import authorizeRole from "../middleware/auth.middleware.js";

const staffRouter = Router();
const controller = new StaffController();

staffRouter.post(
  "/login/staff",
  controller.loginStaffController.bind(controller)
);

staffRouter.post(
  "/staffs",
  authorizeRole("admin", "superadmin"),
  controller.registerStaffController.bind(controller)
);

staffRouter.get(
  "/staffs",
  authorizeRole("admin", "superadmin"),
  controller.getAllStaffsController.bind(controller)
);

staffRouter.get(
  "/staffs/:id",
  authorizeRole("admin", "superadmin"),
  controller.getStaffByIdController.bind(controller)
);

export default staffRouter;
