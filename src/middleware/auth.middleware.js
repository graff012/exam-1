import jwt from "jsonwebtoken";
import CustomError from "../utils/custom.error.js";

const authorizeRole = (...data) => {
  return (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return next(new CustomError("No token provided", 401));
    }

    const token = authHeader.split(" ")[1];

    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);

      if (!data.includes(payload.role)) {
        return next(new CustomError("Access denied"), 403);
      }

      req.user = payload;
      next();
    } catch (err) {
      return next(new CustomError("Invalid token", 401));
    }
  };
};

export default authorizeRole;
