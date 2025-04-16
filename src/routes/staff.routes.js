import { Router } from "express";
import StaffController from "../controllers/staff.controller.js";

const staffRouter = Router();
const controller = new StaffController();

staffRouter.post(
  "/login/staff",
  controller.loginStaffController.bind(controller)
);

export default staffRouter;
