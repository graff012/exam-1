import GroupService from '../services/group.service.js';

class GroupController {
  constructor() {
    this.groupService = new GroupService();
  }

  async createGroup(req, res, next) {
    try {
      const group = await this.groupService.createGroup(req.body);
      res.status(201).json({
        success: true,
        group: {
          id: group._id,
          name: group.name,
          course: {
            id: group.course_id._id,
            name: group.course_id.name
          },
          teacher: {
            id: group.teacher_id._id,
            staff: {
              firstName: group.teacher_id.staff_id.first_name,
              lastName: group.teacher_id.staff_id.last_name
            }
          },
          startDate: group.start_date,
          schedule: group.schedule,
          maxStudents: group.max_students,
          status: group.status
        }
      });
    } catch (error) {
      next(error);
    }
  }

  async getGroups(req, res, next) {
    try {
      const groups = await this.groupService.getGroups();
      res.status(200).json({
        success: true,
        groups: groups.map(group => ({
          id: group._id,
          name: group.name,
          course: {
            id: group.course_id._id,
            name: group.course_id.name
          },
          teacher: {
            id: group.teacher_id._id,
            staff: {
              firstName: group.teacher_id.staff_id.first_name,
              lastName: group.teacher_id.staff_id.last_name
            }
          },
          startDate: group.start_date,
          schedule: group.schedule,
          maxStudents: group.max_students,
          status: group.status
        }))
      });
    } catch (error) {
      next(error);
    }
  }

  async getGroupById(req, res, next) {
    try {
      const group = await this.groupService.getGroupById(req.params.id);
      res.status(200).json({
        success: true,
        group: {
          id: group._id,
          name: group.name,
          course: {
            id: group.course_id._id,
            name: group.course_id.name
          },
          teacher: {
            id: group.teacher_id._id,
            staff: {
              firstName: group.teacher_id.staff_id.first_name,
              lastName: group.teacher_id.staff_id.last_name
            }
          },
          startDate: group.start_date,
          schedule: group.schedule,
          maxStudents: group.max_students,
          status: group.status
        }
      });
    } catch (error) {
      next(error);
    }
  }

  async updateGroup(req, res, next) {
    try {
      const group = await this.groupService.updateGroup(req.params.id, req.body);
      res.status(200).json({
        success: true,
        group: {
          id: group._id,
          name: group.name,
          course: {
            id: group.course_id._id,
            name: group.course_id.name
          },
          teacher: {
            id: group.teacher_id._id,
            staff: {
              firstName: group.teacher_id.staff_id.first_name,
              lastName: group.teacher_id.staff_id.last_name
            }
          },
          startDate: group.start_date,
          schedule: group.schedule,
          maxStudents: group.max_students,
          status: group.status
        }
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteGroup(req, res, next) {
    try {
      await this.groupService.deleteGroup(req.params.id);
      res.status(204).json({
        success: true,
        message: 'Group deleted successfully'
      });
    } catch (error) {
      next(error);
    }
  }
}

export default GroupController;