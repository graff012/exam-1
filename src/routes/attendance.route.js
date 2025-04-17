import { Router } from "express";
import AttendanceController from "../controllers/attendance.controllers.js";
import authMiddleware from "../middleware/auth.middleware.js";

const attendanceRouter = Router();
const controller = new AttendanceController();

attendanceRouter.post("/attendance", authMiddleware("teacher", "admin"), controller.createAttendanceController.bind(controller));
attendanceRouter.get("/attendance/:student_id", authMiddleware("teacher", "admin"), controller.getAttendanceByStudentController.bind(controller));
attendanceRouter.get("/attendance/group/:id", authMiddleware("teacher", "admin"), controller.getAttendanceByGroupController.bind(controller));
attendanceRouter.post("/attendance/group/:groupId/date", authMiddleware("teacher", "admin"), controller.getAttendanceByGroupAndDateController.bind(controller));
attendanceRouter.put("/attendance/:id", authMiddleware("teacher", "admin"), controller.updateAttendanceController.bind(controller));
attendanceRouter.delete("/attendance/:id", authMiddleware("teacher", "admin"), controller.deleteAttendanceController.bind(controller));

export default attendanceRouter;

