import jwt from "jsonwebtoken";
import CustomError from "../utils/custom.error.js";

class JwtService {
  #secretKey = process.env.JWT_SECRET_KEY;

  async generateToken(userId, role) {
    const accessToken = jwt.sign({ userId, role }, this.#secretKey, {
      expiresIn: "1h",
    });

    const refreshToken = jwt.sign({ userId, role }, this.#secretKey, {
      expiresIn: "3h",
    });

    return { accessToken, refreshToken };
  }

  async generateTeacherToken(userId) {
    const accessToken = jwt.sign({ userId }, this.#secretKey, {
      expiresIn: "1h",
    });

    const refreshToken = jwt.sign({ userId }, this.#secretKey, {
      expiresIn: "3h",
    });

    return { accessToken, refreshToken };
  }

  async generateStudentToken(userId) {
    const accessToken = jwt.sign({ userId }, this.#secretKey, {
      expiresIn: "1h",
    });

    const refreshToken = jwt.sign({ userId }, this.#secretKey, {
      expiresIn: "3h",
    });

    return { accessToken, refreshToken };
  }

  async verifyToken(token) {
    try {
      return jwt.verify(token, this.#secretKey);
    } catch (err) {
      console.error(err);
      throw new CustomError("Invalid token", 404);
    }
  }
}

export default JwtService;
