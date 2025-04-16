import StaffService from "../services/staff.service.js";

class StaffController {
  constructor() {
    this.staffService = new StaffService();
  }

  async loginStaffController(req, res, next) {
    const body = req.body;
    try {
      const staff = await this.staffService.loginStaff(body);

      res.status(201).json(staff);
    } catch (err) {
      next(err);
    }
  }
}

export default StaffController;
