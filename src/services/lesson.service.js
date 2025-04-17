import { lessonModel } from '../models/lesson.model.js';

class LessonService {
  constructor() {
    this.lessonModel = lessonModel;
  }

  async createLesson(data) {
    const lesson = await this.lessonModel.create(data);
    return await this.lessonModel.findById(lesson._id)
      .populate({
        path: 'group_id',
        select: 'name teacher_id',
        populate: {
          path: 'teacher_id',
          select: 'staff_id',
          populate: {
            path: 'staff_id',
            select: 'first_name last_name'
          }
        }
      })
      .populate({
        path: 'created_by',
        select: 'first_name last_name'
      });
  }

  async getLessons() {
    const lessons = await this.lessonModel.find()
      .populate({
        path: 'group_id',
        select: 'name teacher_id',
        populate: {
          path: 'teacher_id',
          select: 'staff_id',
          populate: {
            path: 'staff_id',
            select: 'first_name last_name'
          }
        }
      })
      .populate({
        path: 'created_by',
        select: 'first_name last_name'
      });
    return lessons;
  }

  async getLessonById(id) {
    const lesson = await this.lessonModel.findById(id)
      .populate({
        path: 'group_id',
        select: 'name teacher_id',
        populate: {
          path: 'teacher_id',
          select: 'staff_id',
          populate: {
            path: 'staff_id',
            select: 'first_name last_name'
          }
        }
      })
      .populate({
        path: 'created_by',
        select: 'first_name last_name'
      });
    return lesson;
  }

  async updateLesson(id, data) {
    const lesson = await this.lessonModel.findByIdAndUpdate(id, data, { new: true })
      .populate({
        path: 'group_id',
        select: 'name teacher_id',
        populate: {
          path: 'teacher_id',
          select: 'staff_id',
          populate: {
            path: 'staff_id',
            select: 'first_name last_name'
          }
        }
      })
      .populate({
        path: 'created_by',
        select: 'first_name last_name'
      });
    return lesson;
  }

  async deleteLesson(id) {
    await this.lessonModel.findByIdAndDelete(id);
  }
}

export default LessonService;