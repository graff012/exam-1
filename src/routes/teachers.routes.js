import { Router } from "express";
import TeacherProfileController from "../controllers/teacher.controller.js";
import authorizeRole from "../middleware/auth.middleware.js";

const teacherRouter = Router();
const controller = new TeacherProfileController();

teacherRouter.post(
  "/register/teacher",
  authorizeRole("superadmin", "admin"),
  controller.registerTeacherProfileController.bind(controller)
);

export default teacherRouter;
