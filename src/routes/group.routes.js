import { Router } from 'express';
import GroupController from '../controllers/group.controllers.js';
import authMiddleware from '../middleware/auth.middleware.js';

const groupRouter = Router();
const controller = new GroupController();

groupRouter.post('/group', authMiddleware("admin"), controller.createGroup.bind(controller));
groupRouter.get('/groups', authMiddleware("admin"), controller.getGroups.bind(controller));
groupRouter.get('/group/:id', authMiddleware("admin"), controller.getGroupById.bind(controller));
groupRouter.put('/group/:id', authMiddleware("admin"), controller.updateGroup.bind(controller));
groupRouter.delete('/group/:id', authMiddleware("admin"), controller.deleteGroup.bind(controller));

export default groupRouter;