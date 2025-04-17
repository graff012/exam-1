import {groupModel} from '../models/group.model.js';

class GroupService {
  constructor() {
    this.groupModel = groupModel;
  }

  async createGroup(data) {
    const group = await this.groupModel.create(data);
    return await this.groupModel.findById(group._id)
      .populate({
        path: 'course_id',
        select: 'name'
      })
      .populate({
        path: 'teacher_id',
        select: 'staff_id',
        populate: {
          path: 'staff_id',
          select: 'first_name last_name'
        }
      });
  }
  
  async getGroups() {
    const groups = await this.groupModel.find()
      .populate({
        path: 'course_id',
        select: 'name'
      })
      .populate({
        path: 'teacher_id',
        select: 'staff_id',
        populate: {
          path: 'staff_id',
          select: 'first_name last_name'
        }
      });
    return groups;
  }

  async getGroupById(id) {
    const group = await this.groupModel.findById(id)
      .populate({
        path: 'course_id',
        select: 'name'
      })
      .populate({
        path: 'teacher_id',
        select: 'staff_id',
        populate: {
          path: 'staff_id',
          select: 'first_name last_name'
        }
      });
    return group;
  }

  async updateGroup(id, data) {
    const group = await this.groupModel.findByIdAndUpdate(id, data, { new: true })
      .populate({
        path: 'course_id',
        select: 'name'
      })
      .populate({
        path: 'teacher_id',
        select: 'staff_id',
        populate: {
          path: 'staff_id',
          select: 'first_name last_name'
        }
      });
    return group;
  }
  
  async deleteGroup(id) {
    await this.groupModel.findByIdAndDelete(id);
  }
}

export default GroupService;