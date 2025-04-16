import bcrypt from "bcryptjs";
import { staffModel } from "../models/staffs.model.js";

export const createRoles = async () => {
  const RolesToCreate = [
    {
      username: process.env.SUPER_ADMIN_USERNAME,
      password: process.env.SUPER_ADMIN_PASSWORD,
      role: "superadmin",
      first_name: "Hoji",
      last_name: "Jabborov",
      position: "Head of Everything",
    },
    {
      username: process.env.ADMIN_USERNAME,
      password: process.env.ADMIN_PASSWORD,
      role: "admin",
      first_name: "Sherzod",
      last_name: "Qosimov",
      position: "Second in Command",
    },
    {
      username: process.env.TEACHER_USERNAME,
      password: process.env.TEACHER_PASSWORD,
      role: "teacher",
      first_name: "Ilhom",
      last_name: "Karimov",
      position: "Teach students",
    },
  ];

  for (const role of RolesToCreate) {
    const exists = await staffModel.findOne({ username: role.username });
    if (exists) {
      // console.log(`${admin.role} already exists: ${admin.username}`);
      continue;
    }

    const hashedPassword = await bcrypt.hash(role.password, 12);

    await staffModel.create({
      username: role.username,
      password: hashedPassword,
      role: role.role,
      first_name: role.first_name,
      last_name: role.last_name,
      position: role.position,
    });

    console.log(`${role.role} created: ${role.username}`);
  }
};
