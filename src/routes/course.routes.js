import { Router } from 'express';
import CourseController from '../controllers/course.controllers.js';
import authMiddleware from '../middleware/auth.middleware.js';

const courseRouter = Router();
const controller = new CourseController();

courseRouter.post('/course', authMiddleware("admin"), controller.createCourse.bind(controller));
courseRouter.get('/courses', authMiddleware("admin"), controller.getCourses.bind(controller));
courseRouter.get('/course/:id', authMiddleware("admin"), controller.getCourseById.bind(controller));
courseRouter.put('/course/:id', authMiddleware("admin"), controller.updateCourse.bind(controller));
courseRouter.delete('/course/:id', authMiddleware("admin"), controller.deleteCourse.bind(controller));

export default courseRouter;