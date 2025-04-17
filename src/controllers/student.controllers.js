import StudentService from "../services/student.service.js";

class StudentController {
  constructor() {
    this.studentService = new StudentService()
  }

  async getAllStudentsController(req, res, next) {
    try {
      const students = await this.studentService.getAllStudents();

      res.status(200).json({
        success: true,
        students,
      });
    } catch (error) {
      next(error);
    }
  }

  async getStudentByIdController(req, res, next) {
    const { id } = req.params;
    try {
      const student = await this.studentService.getStudentById(id);
      res.status(200).json({
        success: true,
        student,
      });
    } catch (error) {
      next(error);
    }
  }

  async studentRegisterController(req, res, next) {
    try {
      const body = req.body;
      
      if (!body || !body.username || !body.password) {
        return res.status(400).json({
          success: false,
          message: "Username and password are required"
        });
      }

      const student = await this.studentService.studentRegister(body);
      res.status(201).json({
        success: true,
        message: "Student registered successfully",
        student
      });
    } catch (error) {
      next(error);
    }
  }

  async studentLoginController(req, res, next) {
    try {
      const body = req.body;
      
      if (!body || !body.username || !body.password) {
        return res.status(400).json({
          success: false,
          message: "Username and password are required"
        });
      }

      const student = await this.studentService.studentLogin(body);
      res.status(201).json({
        success: true,
        token: student.accessToken,
        refreshToken: student.refreshToken,
        student
      });
    } catch (error) {
      next(error);
    }
  }

  }

export default StudentController;