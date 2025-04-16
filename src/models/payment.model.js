import mongoose, { Schema } from "mongoose";

const PaymentSchema = new Schema(
  {
    student_id: {
      type: Schema.Types.ObjectId,
      ref: "students",
      required: true,
    },
    group_id: {
      type: Schema.Types.ObjectId,
      ref: "groups",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    payment_date: {
      type: Date,
      default: Date.now,
    },
    payment_method: {
      type: String,
      enum: ["cash", "card", "transfer"],
    },
    description: {
      type: String,
    },
    receipt_number: {
      type: String,
    },
    created_by: {
      type: Schema.Types.ObjectId,
      ref: "staffs",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const paymentModel = mongoose.model("payment", PaymentSchema);
