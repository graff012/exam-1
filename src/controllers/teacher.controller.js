import TeacherProfileService from "../services/teachers.service.js";

class TeacherController {
  constructor() {
    this.teacherProfileService = new TeacherProfileService();
  }

  async registerTeacherProfileController(req, res, next) {
    const body = req.body;

    try {
      const teacher =
        await this.teacherProfileService.registerTeacherProfile(body);

      res.status(201).json(teacher);
    } catch (err) {
      next(err);
    }
  }

  async loginTeacherProfileController(req, res, next) {}
}

export default TeacherController;
