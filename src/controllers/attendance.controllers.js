import AttendanceService from "../services/attendance.service.js";

class AttendanceController {
  constructor() {
    this.attendanceService = new AttendanceService();
  }

  async createAttendanceController(req, res, next) {
    try {
      const { lesson_id, attendances } = req.body;
      const created_by = req.user.userId;
      const attendance = await this.attendanceService.createAttendance(lesson_id, attendances, created_by);
      res.status(201).json({
        success: true,
        attendance,
      });
    } catch (error) {
      next(error);
    }
  }

  async getAttendanceByGroupController(req, res, next) {
    try {
      const attendance = await this.attendanceService.getAttendanceByGroup(req.params.groupId);
      res.status(200).json({
        success: true,
        attendance,
      });
    } catch (error) {
      next(error);
    }
  }

  async getAttendanceByGroupAndDateController(req, res, next) {
    try {
      const attendance = await this.attendanceService.getAttendanceByGroupAndDate(req.params.groupId, req.params.date);
      res.status(200).json({
        success: true,
        attendance,
      });
    } catch (error) {
      next(error);
    }
  }

  async getAttendanceByStudentController(req, res, next) {
    try {
      const result = await this.attendanceService.getAttendanceByStudent(req.params.student_id);
      res.status(200).json({
        success: true,
        student: result.student,
        attendance: result.attendance
      });
    } catch (error) {
      next(error);
    }
  }

  async getAttendanceByDateController(req, res, next) {
    try {
      const attendance = await this.attendanceService.getAttendanceByDate(req.params.date);
      res.status(200).json(attendance);
    } catch (error) {
      next(error);
    }
  }
  
  async updateAttendanceController(req, res, next) {
    try {
      const attendance = await this.attendanceService.updateAttendance(req.params.attendanceId, req.body);
      res.status(200).json(attendance);
    } catch (error) {
      next(error);
    }
  }
  
  async deleteAttendanceController(req, res, next) {
    try {
      const attendance = await this.attendanceService.deleteAttendance(req.params.attendanceId);
      res.status(200).json(attendance);
    } catch (error) {
      next(error);
    }
  }
}

export default AttendanceController;

