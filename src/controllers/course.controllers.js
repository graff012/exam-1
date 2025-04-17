import CourseService from '../services/course.service.js';

class CourseController {
  constructor() {
    this.courseService = new CourseService(); 
  }

  async createCourse(req, res, next) {
    const courseData = req.body;
    try {
      const course = await this.courseService.createCourse(courseData);
      res.status(201).json({
        success: true,
        message: 'Course created successfully',
        data: course
      });
    } catch (error) {
      next(error);
    }
  }

  async getCourses(req, res) {
    try {
      const courses = await this.courseService.getCourses();
      res.status(200).json({
        success: true,
        message: 'Courses fetched successfully',
        data: courses
      });
    } catch (error) {
      next(error);
    }
  }

  async getCourseById(req, res) {
    const { id } = req.params;
    try {
      const course = await this.courseService.getCourseById(id);
      res.status(200).json({
      success: true,
      message: 'Course fetched successfully',
      data: course
    });
    } catch (error) {
      next(error)
    }
  }

  async updateCourse(req, res) {
    const { id } = req.params;
    const { name, description } = req.body;
    try {
      const course = await this.courseService.updateCourse(id, name, description);
      res.status(200).json({
        success: true,
        message: 'Course updated successfully',
        data: course
      });
    } catch (error) {
      next(error)
    }
  }

  async deleteCourse(req, res) {
    const { id } = req.params;
    try {
      await this.courseService.deleteCourse(id);
      res.status(204).json({
        success: true,
        message: 'Course deleted successfully'
      });
    } catch (error) {
      next(error)
    }
  }
}

export default CourseController;