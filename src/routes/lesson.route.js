import { Router } from 'express';
import LessonController from '../controllers/lesson.controllers.js';
import authMiddleware from '../middleware/auth.middleware.js';

const lessonRouter = Router();
const lessonController = new LessonController();

lessonRouter.post('/lesson', authMiddleware('admin', 'teacher'), lessonController.createLesson.bind(lessonController));
lessonRouter.get('/lessons', authMiddleware('admin', "superadmin", 'teacher'), lessonController.getLessons.bind(lessonController));
lessonRouter.get('/lesson/:id', authMiddleware('admin', "superadmin", 'teacher'), lessonController.getLessonById.bind(lessonController));
lessonRouter.put('/lesson/:id', authMiddleware('admin', "superadmin", 'teacher'), lessonController.updateLesson.bind(lessonController));
lessonRouter.delete('/lesson/:id', authMiddleware('admin', "superadmin", 'teacher'), lessonController.deleteLesson.bind(lessonController));

export default lessonRouter;