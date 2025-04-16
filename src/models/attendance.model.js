import mongoose, { Schema } from "mongoose";

const AttendanceSchema = new Schema(
  {
    lesson_id: {
      type: Schema.Types.ObjectId,
      ref: "lessons",
      required: true,
    },
    created_by: {
      type: Schema.Types.ObjectId,
      ref: "staffs",
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const attendanceModel = mongoose.model("attendance", AttendanceSchema);
