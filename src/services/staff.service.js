import bcrypt from "bcryptjs";
import { staffModel } from "../models/staffs.model.js";
import CustomError from "../utils/custom.error.js";
import JwtService from "./jwt.service.js";

class StaffService {
  constructor() {
    this.staffModel = staffModel;
    this.jwtService = new JwtService();
  }

  async registerStaff(data) {
    const { username, password } = data;

    const existingStaff = await this.staffModel.findOne({ username });
    if (existingStaff) throw new CustomError("Staff already exists", 400);

    const hashedPassword = await bcrypt.hash(password, 12);
    const staff = await this.staffModel.create({
      username,
      password: hashedPassword,
    });

    return await staff.populate({
      path: "role",
      select: "name",
    });
  }

  async loginStaff(data) {
    const { username, password } = data;

    const staff = await this.staffModel.findOne({ username });
    if (!staff) throw new CustomError("Staff not found", 401);

    const isMatch = await bcrypt.compare(password, staff.password);
    if (!isMatch) throw new CustomError("Invalid password", 404);

    const token = await this.jwtService.generateToken(staff.id, staff.role);
    const { accessToken, refreshToken } = token;
    console.log(accessToken, refreshToken);

    return {
      accessToken,
      refreshToken,
      staff,
    };
  }

  async getAllStaffs() {
    const staffs = await this.staffModel.find();
    return staffs;
  }

  async getStaffById(id) {
    const staff = await this.staffModel.findById(id);
    if (!staff) throw new CustomError("Staff not found", 404);
    return staff;
  }
}

export default StaffService;
