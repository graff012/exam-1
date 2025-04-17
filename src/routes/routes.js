import staffRouter from "./staff.routes.js";
import studentRouter from "./student.routes.js";
import teacherRouter from "./teachers.routes.js";
import courseRouter from "./course.routes.js";
import groupRouter from "./group.routes.js";
import lessonRouter from "./lesson.route.js";
import attendanceRouter from "./attendance.route.js";
import paymentRouter from "./payment.routes.js";

const Router = () => [staffRouter, studentRouter, teacherRouter, courseRouter, groupRouter, lessonRouter, attendanceRouter, paymentRouter];

export default Router;

