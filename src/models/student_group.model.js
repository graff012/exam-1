import mongoose, { Schema } from "mongoose";

const StudentGroupSchema = new Schema(
  {
    student_id: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "students",
      unique: true,
    },
    group_id: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "groups",
      unique: true,
    },
    join_date: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: ["active", "inactive", "completed"],
      default: "inactive",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const studentGroupModel = mongoose.model(
  "student_groups",
  StudentGroupSchema
);
