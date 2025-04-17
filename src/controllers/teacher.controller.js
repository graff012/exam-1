import TeacherProfileService from "../services/teachers.service.js";

class TeacherProfileController {
  constructor() {
    this.teacherProfileService = new TeacherProfileService();
  }

  async registerTeacherProfileController(req, res, next) {
    const body = req.body;

    try {
      const teacher =
        await this.teacherProfileService.registerTeacherProfile(body);

      res.status(201).json({
        success: true,
        teacher: {
          id: teacher._id,
          firstName: teacher.staffId.firstName,
          lastName: teacher.staffId.lastName,
        },
        specialization: teacher.specialization,
        education: teacher.education,
        experience: teacher.experience,
      });
    } catch (err) {
      next(err);
    }
  }

  async loginTeacherProfileController(req, res, next) {}
}

export default TeacherProfileController;
