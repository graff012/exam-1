import PaymentService from "../services/payment.service.js";
class PaymentController {
  constructor() {
    this.paymentService = new PaymentService();
  }

  async createPaymentController(req, res, next) {
    try {
      const payment = await this.paymentService.createPayment(req.body);
      res.status(201).json(payment);
    } catch (error) {
      next(error);
    }
  }

  async getPaymentsController(req, res, next) {
    try {
      const payments = await this.paymentService.getPayments();
      res.status(200).json(payments);
    } catch (error) {
      next(error);
    }
  }
  
  async getPaymentByIdController(req, res, next) {
    try {
      const payment = await this.paymentService.getPaymentById(req.params.id);
      res.status(200).json(payment);
    } catch (error) {
      next(error);
    }
  }

  async updatePaymentController(req, res, next) {
    try {
      const payment = await this.paymentService.updatePayment(req.params.id, req.body);
      res.status(200).json(payment);
    } catch (error) {
      next(error);
    }
  }

  async deletePaymentController(req, res, next) {
    try {
      const payment = await this.paymentService.deletePayment(req.params.id);
      res.status(200).json(payment);
    } catch (error) {
      next(error);
    }
  }
}

export default PaymentController;