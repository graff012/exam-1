import mongoose, { Schema } from "mongoose";

const StaffSchema = new Schema(
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
    role: {
      type: String,
    },
    position: {
      type: String,
    },
    phone: {
      type: String,
    },
    address: {
      type: String,
    },
    hire_date: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const staffModel = mongoose.model("staffs", StaffSchema);
