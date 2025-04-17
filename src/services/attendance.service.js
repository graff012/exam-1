import { attendanceModel } from "../models/attendance.model.js";
import { lessonModel } from "../models/lesson.model.js";
import { groupModel } from "../models/group.model.js";
import { studentModel } from "../models/students.model.js";

class AttendanceService {
  constructor() {
    this.attendanceModel = attendanceModel;
    this.lessonModel = lessonModel;
    this.studentModel = studentModel;
    this.groupModel = groupModel;
  }

  // I did student student and lesson attendance in one table
  // I did group and date attendance in one table

  async createAttendance(attendanceData) {
    const attendance = await this.attendanceModel.create(attendanceData);
    return attendance;
  }

  async getAttendanceByGroup(groupId) {
    const attendance = await this.attendanceModel.find({ group_id: groupId });
    return attendance;
  }

  async getAttendanceByStudent(studentId) {
    const student = await this.studentModel.findById(studentId);
    if (!student) {
      throw new Error('Student not found');
    }

    const attendances = await this.attendanceModel.find({ student_id: studentId })
      .populate({
        path: 'lesson_id',
        select: 'title lesson_date group_id',
        populate: {
          path: 'group_id',
          select: 'name'
        }
      });

    const totalLessons = attendances.length;
    const presentCount = attendances.filter(a => a.status === 'present').length;
    const absentCount = attendances.filter(a => a.status === 'absent').length;
    const lateCount = attendances.filter(a => a.status === 'late').length;
    const presentPercentage = totalLessons > 0 ? (presentCount / totalLessons) * 100 : 0;

    return {
      student: {
        id: student._id,
        firstName: student.first_name,
        lastName: student.last_name
      },
      attendance: {
        totalLessons,
        present: presentCount,
        absent: absentCount,
        late: lateCount,
        presentPercentage,
        lessons: attendances.map(attendance => ({
          lesson: {
            id: attendance.lesson_id._id,
            title: attendance.lesson_id.title,
            lessonDate: attendance.lesson_id.lesson_date,
            group: {
              id: attendance.lesson_id.group_id._id,
              name: attendance.lesson_id.group_id.name
            }
          },
          status: attendance.status,
          comment: attendance.comment || ''
        }))
      }
    };
  }

  async updateAttendance(attendanceId, attendanceData) {
    const attendance = await this.attendanceModel.findByIdAndUpdate(attendanceId, attendanceData, { new: true });
    return attendance;
  }
  
  async deleteAttendance(attendanceId) {
    const attendance = await this.attendanceModel.findByIdAndDelete(attendanceId);
    return attendance;
  }

  async getAttendanceByGroupAndDate(groupId, date) {
    const attendance = await this.attendanceModel.find({ group_id: groupId, lesson_date: date });
    return attendance;
  }
}

export default AttendanceService;