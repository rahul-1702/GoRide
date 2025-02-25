import { validationResult } from "express-validator";
import { query } from "../Database/db.js";
import md5 from "md5";

import jwt from "jsonwebtoken";

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

    const { email } = req.body;

    const hashedPassword = md5(req.body.password);

    const token = jwt.sign({ email }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1h",
    });

    const sql = "SELECT * FROM drivers WHERE `email` = ? AND `password` = ?";
    let result = await query(sql, [email, hashedPassword]);

    if (result && result.length > 0) {
      res.json({
        code: 1,
        message: "Successfully Logged in",
        data: {
          token: token,
        },
      });
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

    // Check if email or mobile number already exists
    const checkUserQuery =
      "SELECT * FROM drivers WHERE email = ? OR mobile = ?";
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

    // Insert into ride_details first
    const rideSql =
      "INSERT INTO ride_details (`ride_type`, `fuel_type`, `auto_number`, `total_seats`, `number_of_wheels`) VALUES (?, ?, ?, ?, ?)";
    const rideValues = [
      req.body.ride_type,
      req.body.fuel_type,
      req.body.auto_number,
      req.body.total_seats,
      req.body.number_of_wheels,
    ];

    const rideResult = await query(rideSql, rideValues);

    if (!rideResult.insertId) {
      return res.json({
        code: 0,
        message: "Failed to create ride details",
        data: "",
      });
    }

    const hashedPassword = md5(req.body.password);

    // Insert into drivers using ride_id from ride_details
    const driverSql =
      "INSERT INTO drivers (`first_name`,`last_name`,`mobile`,`gender`,`dob`,`profile_pic`,`email`,`password`,`current_address`,`permanent_address`,`city`,`state`,`zip_code`, `ride_no`, `license`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    const driverValues = [
      req.body.first_name,
      req.body.last_name,
      req.body.mobile,
      req.body.gender,
      req.body.dob,
      req.body.profile_pic,
      req.body.email,
      hashedPassword,
      req.body.current_address,
      req.body.permanent_address,
      req.body.city,
      req.body.state,
      req.body.zip_code,
      rideResult.insertId,
      req.body.license,
    ];

    const driverResult = await query(driverSql, driverValues);

    if (driverResult.insertId) {
      res.json({
        code: 1,
        message: "Driver registered successfully",
        data: "",
      });
    } else {
      res.json({
        code: 0,
        message: "Failed to register driver",
        data: "",
      });
    }
  } catch (err) {
    res
      .status(500)
      .json({ code: 0, message: "Something went wrong", data: err.message });
  }
};
