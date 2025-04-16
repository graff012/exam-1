import { Router } from "express";
import TeacherController from "../controllers/teacher.controller.js";

const teacherRouter = Router();
const controller = new TeacherController();

teacherRouter.post(
  "/register/teacher",
  controller.registerTeacherController.bind(controller)
);

export default teacherRouter;
