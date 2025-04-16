import bcrypt from "bcryptjs";
import { staffModel } from "../models/staffs.model.js";
import CustomError from "../utils/custom.error.js";
import JwtService from "./jwt.service.js";
import ValidateService from "./validation.service.js";

class StaffService {
  constructor() {
    this.staffModel = staffModel;
    this.jwtService = new JwtService();
  }

  async loginStaff(data) {
    const { username, password } = data;

    const staff = await this.staffModel.findOne({ username });
    console.log(staff);
    if (!staff) throw new CustomError("Staff not found", 401);

    const isMatch = await bcrypt.compare(password, staff.password);
    if (!isMatch) throw new CustomError("Invalid password", 404);

    const token = this.jwtService.generateToken(staff.id, staff.role);

    return token;
  }
}

export default StaffService;
