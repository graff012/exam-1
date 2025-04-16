import mongoose, { Schema } from "mongoose";

const StudentSchema = new Schema(
  {
    first_name: {
      type: String,
    },
    last_name: {
      type: String,
    },
    username: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
    },
    phone: {
      type: String,
    },
    address: {
      type: String,
    },
    birth_date: {
      type: Date,
    },
    status: {
      type: String,
      enum: ["active", "inactive", "graduated"],
      default: "inactive",
    },
    enrollment_date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const studentModel = mongoose.model("students", StudentSchema);
