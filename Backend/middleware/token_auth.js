import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const secretKey = process.env.JWT_SECRET_KEY;

export const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(403).json({
        code: 0,
        message: "Access Denied! Unauthorized User",
        data: null,
      });
    }

    const token = authHeader.split(" ")[1];

    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        return res.status(401).json({
          code: 0,
          message: "Invalid or expired token",
          data: null,
        });
      }

      req.user = decoded; // Store decoded token data in request
      next();
    });
  } catch (err) {
    res.status(500).json({
      code: 0,
      message: "Something went wrong",
      error: err.message,
      data: null,
    });
  }
};
