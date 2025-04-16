import mongoose, { Schema } from "mongoose";

const LessonSchema = new Schema(
  {
    group_id: {
      type: Schema.Types.ObjectId,
      ref: "groups",
      required: true,
    },
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    lesson_date: {
      type: Date,
      required: true,
    },
    start_time: {
      type: Date,
      required: true,
    },
    end_time: {
      type: Date,
      required: true,
    },
    room_number: {
      type: String,
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

export const lessonModel = mongoose.model("lessons", LessonSchema);
