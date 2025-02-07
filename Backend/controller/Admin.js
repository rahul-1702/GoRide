import { validationResult } from "express-validator";
import { query } from "../Database/db.js";

// getAllAdmins ======================

export const getAllAdmins = async (req, res) => {
  try {
    const sql = "SELECT * FROM admins";
    const result = await query(sql);

    if (result.length > 0) {
      res.json({ code: 1, message: "Admins fetched successully", data: result });
    } else {
      res.json({ code: 0, message: "No admins found", data: "" });
    }
  } catch (err) {
    res.status(500).json({ code: 0, message: "Something went wrong", data: err.message });
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


    // Check if mail already exists
    const emailCheckQuery = "SELECT * FROM admins WHERE email = ?";
    const existingUser = await query(emailCheckQuery, [req.body.email]);

    if (existingUser.length > 0) {
      return res.json({
        code: 0,
        message: "Email already exists. Please use a different email.",
        data: "",
      });
    }

    const sql = "INSERT INTO admins (`name`, `email`, `mobile`, `password`) VALUES (?, ?, ?, ?)";
    const values = [req.body.name, req.body.email, req.body.mobile, req.body.password];
    let result = await query(sql, values);

    if (result) {
      res.json({ code: 1, message: "Signup successfully", data: "" });
    } else {
      res.json({ code: 0, message: "Failed to Signup", data: "" }); 
    }
  } catch (err) {
    res
      .status(500)
      .json({ code: 0, message: "Something went wrong", data: err.message });
  }
};
