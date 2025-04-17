import { Router } from "express";
import PaymentController from "../controllers/payment.controllers.js";
import authMiddleware from "../middleware/auth.middleware.js";

const paymentRouter = Router();

const controller = new PaymentController();

paymentRouter.post("/payment", authMiddleware("admin", "superadmin"), controller.createPaymentController.bind(controller));
paymentRouter.get("/payments", authMiddleware("admin", "superadmin"), controller.getPaymentsController.bind(controller));
paymentRouter.get("/payment/:id", authMiddleware("admin", "superadmin"), controller.getPaymentByIdController.bind(controller));
paymentRouter.put("/payment/:id", authMiddleware("admin", "superadmin"), controller.updatePaymentController.bind(controller));
paymentRouter.delete("/payment/:id", authMiddleware("admin", "superadmin"), controller.deletePaymentController.bind(controller));

export default paymentRouter;
