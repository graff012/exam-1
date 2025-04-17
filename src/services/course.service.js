import { courseModel } from "../models/courses.model.js";

class CourseService {
  constructor() {
    this.courseModel = courseModel;
  }

  async createCourse(data) {
    const course = await this.courseModel.create(data);
    return course;
  }

  async getCourses() {
    const courses = await this.courseModel.find();
    return courses;
  }

  async getCourseById(id) {
    const course = await this.courseModel.findById(id);
    return course;
  }

  async updateCourse(id, data) {
    const course = await this.courseModel.findByIdAndUpdate(id, data, { new: true });
    return course;
  }

  async deleteCourse(id) {
    await this.courseModel.findByIdAndDelete(id);
  }
}

export default CourseService;