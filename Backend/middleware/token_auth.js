import jwt from "jsonwebtoken";

import dotenv from "dotenv";
dotenv.config();

const secretKey = process.env.JWT_SECRET_KEY;

export const verifyToken = (req, res, next) => {
  let token = req.headers["authorization"];

  token = token.split(" ")[1];

  if (!token) {
    return res.status(403).send({
      code: 0,
      message: "Access Denied! Unauthorized User",
      data: "",
    });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res
        .status(500)
        .send({ code: 0, message: "Invalid token", data: "" });
    }

    next();
  });
};
