import { Router } from "express";
import StudentController from "../controllers/student.controllers.js";
import authorizeRole from "../middleware/auth.middleware.js";
const studentRouter = Router();

const controller = new StudentController();

studentRouter.post("/register/student", controller.studentRegisterController.bind(controller));
studentRouter.post("/login/student", controller.studentLoginController.bind(controller));

studentRouter.get("/students", authorizeRole("admin", "teacher"), controller.getAllStudentsController.bind(controller));
studentRouter.get("/students/:id", authorizeRole("admin", "teacher"), controller.getStudentByIdController.bind(controller));

export default studentRouter;
