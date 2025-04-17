import LessonService from '../services/lesson.service.js';

class LessonController {
  constructor() {
    this.lessonService = new LessonService();
  }

  async createLesson(req, res, next) {
    try {
      const lesson = await this.lessonService.createLesson(req.body);
      res.status(201).json({
        success: true,
        lesson: {
          id: lesson._id,
          title: lesson.title,
          description: lesson.description,
          lessonDate: lesson.lesson_date,
          startTime: lesson.start_time,
          endTime: lesson.end_time,
          roomNumber: lesson.room_number,
          group: {
            id: lesson.group_id._id,
            name: lesson.group_id.name,
            teacher: {
              id: lesson.group_id.teacher_id._id,
              staff: {
                firstName: lesson.group_id.teacher_id.staff_id.first_name,
                lastName: lesson.group_id.teacher_id.staff_id.last_name
              }
            }
          },
          createdBy: {
            id: lesson.created_by._id,
            firstName: lesson.created_by.first_name,
            lastName: lesson.created_by.last_name
          }
        }
      });
    } catch (error) {
      next(error);
    }
  }

  async getLessons(req, res, next) {
    try {
      const lessons = await this.lessonService.getLessons();
      res.status(200).json({
        success: true,
        lessons: lessons.map(lesson => ({
          id: lesson._id,
          title: lesson.title,
          description: lesson.description,
          lessonDate: lesson.lesson_date,
          startTime: lesson.start_time,
          endTime: lesson.end_time,
          roomNumber: lesson.room_number,
          group: {
            id: lesson.group_id._id,
            name: lesson.group_id.name,
            teacher: {
              id: lesson.group_id.teacher_id._id,
              staff: {
                firstName: lesson.group_id.teacher_id.staff_id.first_name,
                lastName: lesson.group_id.teacher_id.staff_id.last_name
              }
            }
          },
          createdBy: {
            id: lesson.created_by._id,
            firstName: lesson.created_by.first_name,
            lastName: lesson.created_by.last_name
          }
        }))
      });
    } catch (error) {
      next(error);
    }
  }

  async getLessonById(req, res, next) {
    try {
      const lesson = await this.lessonService.getLessonById(req.params.id);
      res.status(200).json({
        success: true,
        lesson: {
          id: lesson._id,
          title: lesson.title,
          description: lesson.description,
          lessonDate: lesson.lesson_date,
          startTime: lesson.start_time,
          endTime: lesson.end_time,
          roomNumber: lesson.room_number,
          group: {
            id: lesson.group_id._id,
            name: lesson.group_id.name,
            teacher: {
              id: lesson.group_id.teacher_id._id,
              staff: {
                firstName: lesson.group_id.teacher_id.staff_id.first_name,
                lastName: lesson.group_id.teacher_id.staff_id.last_name
              }
            }
          },
          createdBy: {
            id: lesson.created_by._id,
            firstName: lesson.created_by.first_name,
            lastName: lesson.created_by.last_name
          }
        }
      });
    } catch (error) {
      next(error);
    }
  }

  async updateLesson(req, res, next) {
    try {
      const lesson = await this.lessonService.updateLesson(req.params.id, req.body);
      res.status(200).json({
        success: true,
        lesson: {
          id: lesson._id,
          title: lesson.title,
          description: lesson.description,
          lessonDate: lesson.lesson_date,
          startTime: lesson.start_time,
          endTime: lesson.end_time,
          roomNumber: lesson.room_number,
          group: {
            id: lesson.group_id._id,
            name: lesson.group_id.name,
            teacher: {
              id: lesson.group_id.teacher_id._id,
              staff: {
                firstName: lesson.group_id.teacher_id.staff_id.first_name,
                lastName: lesson.group_id.teacher_id.staff_id.last_name
              }
            }
          },
          createdBy: {
            id: lesson.created_by._id,
            firstName: lesson.created_by.first_name,
            lastName: lesson.created_by.last_name
          }
        }
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteLesson(req, res, next) {
    try {
      await this.lessonService.deleteLesson(req.params.id);
      res.status(204).json({
        success: true,
        message: "Lesson deleted successfully"
      });
    } catch (error) {
      next(error);
    }
  }
}

export default LessonController;