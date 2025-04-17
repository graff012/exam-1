import { teacherModel } from "../models/teacher_profile.model.js";
import CustomError from "../utils/custom.error.js";
import ValidateService from "./validation.service.js";

class TeacherProfileService {
  constructor() {
    this.teacherModel = teacherModel;
    this.validateService = new ValidateService();
  }

  async registerTeacherProfile(data) {
    const existed = await this.teacherModel.findOne({ staffId: data.staff_id });
    if (existed) throw new CustomError("Teacher profile already exists", 409);

    await this.validateService.validateTeacher(data);

    const teacher = await this.teacherModel.create(data);

    return await teacher.populate({
      path: "staffId",
      select: "firstName lastName",
    });
  }

}

export default TeacherProfileService;
