import mongoose, { Schema } from "mongoose";

const ScheduleSchema = new Schema(
  {
    group_id: {
      type: Schema.Types.ObjectId,
      ref: "groups",
      required: true,
    },
    day: {
      type: String,
      enum: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
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
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const scheduleModel = mongoose.model("schedule", ScheduleSchema);
