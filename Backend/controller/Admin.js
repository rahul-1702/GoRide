import { validationResult } from "express-validator";
import { query } from "../Database/db.js";

// getAllAdmins ======================

export const getAllAdmins = async (req, res) => {
  try {
    const sql = "SELECT * FROM admins";
    const result = await query(sql);

    if (result.length > 0) {
      res.json({
        code: 1,
        message: "Admins fetched successully",
        data: result,
      });
    } else {
      res.json({ code: 0, message: "No admins found", data: "" });
    }
  } catch (err) {
    res
      .status(500)
      .json({ code: 0, message: "Something went wrong", data: err.message });
  }
};

// loginAdmin ======================

export const loginAdmin = async (req, res) => {
  try {
    // Validations --------
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json({
        code: 0,
        message: errors.errors[0].msg,
        data: "",
      });
    }

    const sql = "SELECT * FROM admins WHERE `email` = ? AND `password` = ?";
    const values = [req.body.email, req.body.password];
    let result = await query(sql, values);

    if (result && result.length > 0) {
      res.json({ code: 1, message: "Successfully logged In", data: "" });
    } else {
      res.json({ code: 0, message: "No records found", data: "" });
    }
  } catch (err) {
    res
      .status(500)
      .json({ code: 0, message: "Something went wrong", data: err.message });
  }
};

// signupAdmin ======================

export const signupAdmin = async (req, res) => {
  try {
    // Validations --------
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json({
        code: 0,
        message: errors.errors[0].msg,
        data: "",
      });
    }

    // Check if email or mobile number already exists
    const checkUserQuery = "SELECT * FROM admins WHERE email = ? OR mobile = ?";
    const existingUser = await query(checkUserQuery, [
      req.body.email,
      req.body.mobile,
    ]);

    if (existingUser.length > 0) {
      const existingEmail = existingUser.some(
        (user) => user.email === req.body.email
      );
      const existingMobile = existingUser.some(
        (user) => user.mobile === req.body.mobile
      );

      return res.json({
        code: 0,
        message:
          existingEmail && existingMobile
            ? "Email and Mobile number already exist. Please use different credentials."
            : existingEmail
            ? "Email already exists. Please use a different email."
            : "Mobile number already exists. Please use a different mobile number.",
        data: "",
      });
    }

    const sql =
      "INSERT INTO admins (`name`, `email`, `mobile`, `password`) VALUES (?, ?, ?, ?)";
    const values = [
      req.body.name,
      req.body.email,
      req.body.mobile,
      req.body.password,
    ];
    let result = await query(sql, values);

    if (result) {
      res.json({ code: 1, message: "Admin registered successfully", data: "" });
    } else {
      res.json({ code: 0, message: "Failed to register admin", data: "" });
    }
  } catch (err) {
    res
      .status(500)
      .json({ code: 0, message: "Something went wrong", data: err.message });
  }
};
