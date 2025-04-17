import StaffService from "../services/staff.service.js";

class StaffController {
  constructor() {
    this.staffService = new StaffService();
  }

  async registerStaffController(req, res, next) {
    try {
      const body = req.body;

      if (!body || !body.username || !body.password) {
        return res.status(400).json({
          success: false,
          message: "Username and password are required"
        });
      }

      const staff = await this.staffService.registerStaff(body);
      res.status(201).json({
        success: true,
        staff,
      });
    } catch (error) {
      next(error);
    }
  }

  async loginStaffController(req, res, next) {
    const body = req.body;
    
    if (!body || !body.username || !body.password) {
      return res.status(400).json({
        success: false,
        message: "Username and password are required"
      });
    }

    try {
      const staff = await this.staffService.loginStaff(body);

      res.status(201).json({
        success: true,
        accessToken: staff.accessToken,
        refreshToken: staff.refreshToken,
        staff: staff.staff,
      });
    } catch (err) {
      next(err);
    }
  }

  async getAllStaffsController(req, res, next) {
    try {
      const staffs = await this.staffService.getAllStaffs();
      res.status(200).json({
        success: true,
        staffs,
      });
    } catch (err) {
      next(err);
    }
  }

  async getStaffByIdController(req, res, next) {
    const { id } = req.params;
    try {
      const staff = await this.staffService.getStaffById(id);
      res.status(200).json({
        success: true,
        staff,
      });
    } catch (err) {
      next(err);
    }
  }
}

export default StaffController;
