import mongoose, { Schema } from "mongoose";

const TeacherSchema = new Schema(
  {
    staff_id: {
      type: Schema.Types.ObjectId,
      ref: "staffs",
      required: true,
      unique: true,
    },
    subject_specialty: {
      type: String,
    },
    bio: {
      type: String,
    },
    certification: {
      type: String,
    },
    max_weekly_group: {
      type: Number,
      default: 5,
    },
  },
  {
    versionKey: false,
  }
);

export const teacherModel = mongoose.model("teacher_profile", TeacherSchema);
