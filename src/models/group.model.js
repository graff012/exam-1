import mongoose, { Schema } from "mongoose";

const GroupSchema = new Schema(
  {
    name: {
      type: String,
    },
    course_id: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "courses",
    },
    teacher_id: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "teachers",
    },
    start_date: {
      type: Date,
    },
    end_date: {
      type: Date,
    },
    schedule: {
      type: String,
    },
    max_students: {
      type: Number,
      default: 20,
    },
    status: {
      type: String,
      enum: ["planned", "active", "completed"],
      default: "planned",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const groupModel = mongoose.model("groups", GroupSchema);
