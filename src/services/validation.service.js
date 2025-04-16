import { staffModel } from "../models/staffs.model.js";
import CustomError from "../utils/custom.error.js";

class ValidateService {
  constructor() {
    this.staffModel = staffModel;
  }

  async validateTeacher(data) {
    const staff = await this.staffModel.findById(data.staff_id);
    if (!staff) throw new CustomError("Staff not found", 404);

    if (staff.role !== "teacher") {
      throw new CustomError(
        "Only staff with teacher role can have a teacher profile",
        403
      );
    }
  }
}

export default ValidateService;
