import mongoose, { Schema } from "mongoose";

const CourseSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 100,
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    duration: {
      type: Number,
      required: true,
    },
    level: {
      type: String,
      enum: ["beginner", "intermediate", "advanced"],
    },
    is_active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const courseModel = mongoose.model("courses", CourseSchema);
