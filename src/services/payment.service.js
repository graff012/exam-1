import { paymentModel } from "../models/payment.model.js";

class PaymentService {
  constructor() {
    this.paymentModel = paymentModel;
  }

  async createPayment(paymentData) {
    const payment = await this.paymentModel.create(paymentData);
    return payment;
  }

  async getPayments() {
    const payments = await this.paymentModel.find();
    return payments;
  }

  async getPaymentById(paymentId) {
    const payment = await this.paymentModel.findById(paymentId);
    return payment;
  }

  async updatePayment(paymentId, paymentData) {
    const payment = await this.paymentModel.findByIdAndUpdate(paymentId, paymentData);
    return payment;
  }

  async deletePayment(paymentId) {
    const payment = await this.paymentModel.findByIdAndDelete(paymentId);
    return payment;
  }
  
}

export default PaymentService;