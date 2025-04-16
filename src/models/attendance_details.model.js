import mongoose, { Schema } from "mongoose";

const AttendanceDetailsSchema = new Schema(
  {
    attendance_id: {
      type: Schema.Types.ObjectId,
      ref: "attendance",
      required: true,
    },
    student_id: {
      type: Schema.Types.ObjectId,
      ref: "students",
      required: true,
    },
    status: {
      type: String,
      enum: ["present", "absent", "late"],
    },
    comment: {
      type: String,
    },
  },
  {
    versionKey: false,
  }
);

export const attendanceDetailsModel = mongoose.model(
  "attendance_details",
  AttendanceDetailsSchema
);
