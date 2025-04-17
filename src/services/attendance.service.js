import { attendanceModel } from "../models/attendance.model.js";
import { attendanceDetailsModel } from "../models/attendance_details.model.js";
import { lessonModel } from "../models/lesson.model.js";
import { studentModel } from "../models/students.model.js";
import { groupModel } from "../models/group.model.js";

class AttendanceService {
  constructor() {
    this.attendanceModel = attendanceModel;
    this.attendanceDetailsModel = attendanceDetailsModel;
    this.lessonModel = lessonModel;
    this.studentModel = studentModel;
    this.groupModel = groupModel;
  }

  async createAttendance(lesson_id, attendances, created_by) {
    const lesson = await this.lessonModel.findById(lesson_id);
    if (!lesson) {
      throw new Error("Lesson not found");
    }

    // Create main attendance record
    const mainAttendance = await this.attendanceModel.create({
      lesson_id,
      group_id: lesson.group_id,
      created_by
    });

    // Create attendance details for each student
    const attendanceRecords = await Promise.all(
      attendances.map(async (attendance) => {
        const student = await this.studentModel.findById(attendance.student_id);
        if (!student) {
          throw new Error(`Student with ID ${attendance.student_id} not found`);
        }

        return this.attendanceDetailsModel.create({
          attendance_id: mainAttendance._id,
          student_id: attendance.student_id,
          status: attendance.status,
          comment: attendance.comment || ""
        });
      })
    );

    const stats = await this.getAttendanceStats(mainAttendance._id);

    return {
      lesson: {
        _id: lesson._id,
        title: lesson.title,
        lesson_date: lesson.lesson_date
      },
      attendanceCount: stats.total,
      present: stats.present,
      absent: stats.absent,
      late: stats.late
    };
  }

  async getAttendanceByGroup(groupId) {
    const lesson = await this.lessonModel.findById(groupId).populate({
      path: "group_id",
      select: "name",
    });

    if (!lesson) {
      throw new Error("Lesson not found");
    }

    const attendances = await this.attendanceModel
      .find({ lesson_id: groupId })
      .populate({
        path: "student_id",
        select: "first_name last_name",
      });

    const stats = await this.getAttendanceStats(groupId);

    return {
      lesson: {
        _id: lesson._id,
        title: lesson.title,
        lesson_date: lesson.lesson_date,
        group_id: {
          _id: lesson.group_id._id,
          name: lesson.group_id.name,
        },
      },
      attendance: {
        total: stats.total,
        present: stats.present,
        absent: stats.absent,
        late: stats.late,
        students: attendances.map((attendance) => ({
          student_id: {
            _id: attendance.student_id._id,
            first_name: attendance.student_id.first_name,
            last_name: attendance.student_id.last_name,
          },
          status: attendance.status,
          comment: attendance.comment,
        })),
      },
    };
  }

  async getAttendanceByStudent(studentId, startDate, endDate, groupId) {
    console.log('Looking up student with ID:', studentId);
    
    const student = await this.studentModel.findById(studentId);
    if (!student) {
      console.log('Student not found in database');
      throw new Error("Student not found");
    }
    console.log('Found student:', student);

    const query = { student_id: studentId };
    console.log('Initial query:', query);

    if (startDate && endDate) {
      query.created_at = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
      console.log('Added date range to query:', query);
    }

    console.log('Final query:', query);
    const attendances = await this.attendanceDetailsModel.find(query)
      .populate({
        path: 'attendance_id',
        select: 'lesson_id',
        populate: {
          path: 'lesson_id',
          select: 'title lesson_date group_id',
          populate: {
            path: 'group_id',
            select: 'name'
          }
        }
      });
    console.log('Found attendances:', attendances.length);

    const totalLessons = attendances.length;
    const presentCount = attendances.filter(a => a.status === 'present').length;
    const absentCount = attendances.filter(a => a.status === 'absent').length;
    const lateCount = attendances.filter(a => a.status === 'late').length;
    const presentPercentage = totalLessons > 0 ? (presentCount / totalLessons) * 100 : 0;

    return {
      student: {
        _id: student._id,
        first_name: student.first_name,
        last_name: student.last_name
      },
      attendance: {
        totalLessons,
        present: presentCount,
        absent: absentCount,
        late: lateCount,
        presentPercentage,
        lessons: attendances.map(attendance => ({
          lesson_id: {
            _id: attendance.attendance_id.lesson_id._id,
            title: attendance.attendance_id.lesson_id.title,
            lesson_date: attendance.attendance_id.lesson_id.lesson_date,
            group_id: {
              _id: attendance.attendance_id.lesson_id.group_id._id,
              name: attendance.attendance_id.lesson_id.group_id.name
            }
          },
          status: attendance.status,
          comment: attendance.comment
        }))
      }
    };
  }

  async getAttendanceByGroupAndDate(groupId, date) {
    const attendance = await this.attendanceModel.find({
      group_id: groupId,
      lesson_date: date,
    });
    return attendance;
  }

  async getAttendanceStats(lessonId) {
    const attendances = await this.attendanceModel.find({
      lesson_id: lessonId,
    });

    return {
      total: attendances.length,
      present: attendances.filter((a) => a.status === "present").length,
      absent: attendances.filter((a) => a.status === "absent").length,
      late: attendances.filter((a) => a.status === "late").length,
    };
  }

  async updateAttendance(attendanceId, attendanceData) {
    const attendance = await this.attendanceModel.findByIdAndUpdate(
      attendanceId,
      attendanceData,
      { new: true }
    );
    return attendance;
  }

  async deleteAttendance(attendanceId) {
    const attendance =
      await this.attendanceModel.findByIdAndDelete(attendanceId);
    return attendance;
  }
}

export default AttendanceService;

