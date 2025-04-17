import bcrypt from "bcryptjs";
import { studentModel } from "../models/students.model.js";
import JwtService from "./jwt.service.js";
import CustomError from "../utils/custom.error.js";
class StudentService {
  constructor() {
    this.studentModel = studentModel;
    this.jwtService = new JwtService();
  }

  async getAllStudents() {
    const students = await this.studentModel.find();
    
    return students;
  }

  async getStudentById(id) {
    const student = await this.studentModel.findById(id);
    if (!student) throw new CustomError("Student not found", 404);
    return student;
  }

  async studentRegister(data) {
    const exists = await this.studentModel.findOne({ username: data.username });
    if (exists) {
      throw new CustomError("Student already exists", 400);
    }

    const hashedPassword = await bcrypt.hash(data.password, 12);

    const student = await this.studentModel.create({
      username: data.username,
      password: hashedPassword,
      ...data,
    });
    return student;
  }

  async studentLogin(data) {
    
    const student = await this.studentModel.findOne({ username: data.username });
    
    if (!student) {
      throw new CustomError("username or password is incorrect", 401);
    }

    const studentPassword = await bcrypt.hash(student.password, 12)

    const isPasswordValid = await bcrypt.compare(data.password, studentPassword);

    
    if (!isPasswordValid) {
      throw new CustomError("username or password is incorrect", 401);
    }

    const { accessToken, refreshToken } = await this.jwtService.generateStudentToken(student._id);

    return {
      student,
      accessToken,
      refreshToken,
    };
  }
  
}

export default StudentService;