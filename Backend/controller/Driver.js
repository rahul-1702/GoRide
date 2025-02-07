import { validationResult } from "express-validator";
import { query } from "../Database/db.js";

// getAllDrivers =======================

export const getAllDrivers = async (req, res) => {
  try {
    const sql =
      "SELECT d.*, r.* FROM drivers d JOIN ride_details r ON d.ride_no = r.ride_id";

    const result = await query(sql);

    if (result.length > 0) {
      res.json({
        code: 1,
        message: "Drivers fetched successully",
        data: result,
      });
    } else {
      res.json({ code: 0, message: "No drivers found.", data: "" });
    }
  } catch (err) {
    res
      .status(500)
      .json({ code: 0, message: "Something went wrong", data: err.message });
  }
};

// loginDriver ======================

export const loginDriver = async (req, res) => {
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

    const sql = "SELECT * FROM drivers WHERE `email` = ? AND `password` = ?";
    let result = await query(sql, [req.body.email, req.body.password]);

    if (result && result.length > 0) {
      res.json({ code: 1, message: "Successfully Logged in", data: "" });
    } else {
      res.json({ code: 0, message: "No records found", data: "" });
    }
  } catch (err) {
    res
      .status(500)
      .json({ code: 0, message: "Something went wrong", data: err.message });
  }
};

// signupDrivers ======================

export const signupDriver = async (req, res) => {
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
    const emailCheckQuery = "SELECT * FROM drivers WHERE email = ?";
    const existingUser = await query(emailCheckQuery, [req.body.email]);

    if (existingUser.length > 0) {
      return res.json({
        code: 0,
        message: "Email already exists. Please use a different email.",
        data: "",
      });
    }

    const sql =
      "INSERT INTO drivers (`first_name`,`last_name`,`mobile`,`gender`,`dob`,`profile_pic`,`email`,`password`,`current_address`,`permanent_address`,`city`,`state`,`zip_code`, `ride_no`, `license`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    const values = [
      req.body.first_name,
      req.body.last_name,
      req.body.mobile,
      req.body.gender,
      req.body.dob,
      req.body.profile_pic,
      req.body.email,
      req.body.password,
      req.body.current_address,
      req.body.permanent_address,
      req.body.city,
      req.body.state,
      req.body.zip_code,
      req.body.ride_no,
      req.body.license,
    ];
    let result = await query(sql, values);

    if (result) {
      res.json({ code: 1, message: "Signup Successfully", data: "" });
    } else {
      res.json({ code: 0, message: "Failed to Signup", data: "" });
    }
  } catch (err) {
    res
      .status(500)
      .json({ code: 0, message: "Something went wrong", data: err.message });
  }
};
