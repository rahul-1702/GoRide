import { validationResult } from "express-validator";
import { query } from "../Database/db.js";
import md5 from "md5";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

// getAllDrivers =======================

export const getAllDrivers = async (req, res) => {
  try {
    const sql = `
      SELECT 
        d.id, 
        d.first_name, 
        d.last_name, 
        d.mobile, 
        d.email, 
        d.status, 
        d.gender, 
        d.city, 
        d.state, 
        d.zip_code, 
        d.license, 
        d.profile_pic, 
        d.dob,
        r.ride_id, 
        r.ride_type, 
        r.fuel_type, 
        r.auto_number, 
        r.total_seats, 
        r.number_of_wheels 
      FROM drivers d
      JOIN ride_details r ON d.ride_no = r.ride_id
    `;

    const result = await query(sql);

    // Driver not found ========
    if (!result.length) {
      return res.status(404).json({
        code: 0,
        status: 404,
        message: "No drivers found.",
        total: 0,
        data: null,
      });
    }

     // Append full URL for profile images
     const backendUrl = process.env.FREE_BACKEND_URL || "http://0.0.0.0:5000";
     const driversWithImage = result.map(driver => ({
       ...driver,
       profile_pic_url: driver.profile_pic ? `${backendUrl}/uploads/driver/${driver.profile_pic}` : null,
     }));

    if (result.length > 0) {
      return res.status(200).json({
        code: 1,
        status: 200,
        message: "Drivers fetched successfully",
        total: driversWithImage.length,
        data: driversWithImage,
      });
    }
  } catch (err) {
    return res.status(500).json({
      code: 0,
      status: 500,
      message: "Internal Server Error",
      error: err.message,
      total: 0,
      data: null,
    });
  }
};

// loginDriver ======================

export const loginDriver = async (req, res) => {
  try {
    // Validations
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        code: 0,
        status: 400,
        message: errors.errors[0].msg,
        data: null,
      });
    }

    const { email, password } = req.body;
    const hashedPassword = md5(password);

    // Fetch only required driver fields
    const sql = `
      SELECT d.id, d.first_name, d.last_name, d.mobile, d.email, d.status, d.dob, d.profile_pic, d.ride_no, r.ride_type, 
        r.fuel_type, 
        r.auto_number, 
        r.total_seats, 
        r.number_of_wheels 
      FROM drivers d
      JOIN ride_details r ON d.ride_no = r.ride_id WHERE email = ? AND password = ?
    `;
    const result = await query(sql, [email, hashedPassword]);

    if (result.length > 0) {
      // Generate token with essential details
      const token = jwt.sign(
        { id: result[0].id, email: result[0].email },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "7d" }
      );

      return res.status(200).json({
        code: 1,
        status: 200,
        message: "Successfully Logged in",
        data: {
          token: token,
          driver: result[0],
        },
      });
    } else {
      return res.status(401).json({
        code: 0,
        status: 401,
        message: "Invalid email or password",
        data: null,
      });
    }
  } catch (err) {
    return res.status(500).json({
      code: 0,
      status: 500,
      message: "Internal Server Error",
      error: err.message,
      data: null,
    });
  }
};

// signupDrivers ======================

export const signupDriver = async (req, res) => {
  try {
    // Validations
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        code: 0,
        status: 400,
        message: errors.errors[0].msg,
        data: null,
      });
    }

    if (req.file === undefined) {
      return res.status(400).json({
        code: 0,
        status: 400,
        message: "Profile Picture is required",
        data: null,
      });
    }

    const {
      first_name,
      last_name,
      mobile,
      gender,
      dob,
      email,
      password,
      current_address,
      permanent_address,
      city,
      state,
      zip_code,
      license,
      ride_type,
      fuel_type,
      auto_number,
      total_seats,
      number_of_wheels,
    } = req.body;

    const profilePic = req.file ? req.file.filename : null;

    // Check if email or mobile number already exists
    const checkUserQuery =
      "SELECT email, mobile FROM drivers WHERE email = ? OR mobile = ?";
    const existingUser = await query(checkUserQuery, [email, mobile]);

    if (existingUser.length > 0) {
      const existingEmail = existingUser.some((user) => user.email === email);
      const existingMobile = existingUser.some(
        (user) => user.mobile === mobile
      );

      return res.status(409).json({
        code: 0,
        status: 409,
        message:
          existingEmail && existingMobile
            ? "Email and mobile number already exist. Please use different credentials."
            : existingEmail
            ? "Email already exists. Please use a different email."
            : "Mobile number already exists. Please use a different mobile number.",
        data: null,
      });
    }

    // Insert ride details
    const rideSql = `
      INSERT INTO ride_details (ride_type, fuel_type, auto_number, total_seats, number_of_wheels)
      VALUES (?, ?, ?, ?, ?)
    `;
    const rideValues = [
      ride_type,
      fuel_type,
      auto_number,
      total_seats,
      number_of_wheels,
    ];

    const rideResult = await query(rideSql, rideValues);
    if (!rideResult.insertId) {
      return res.status(500).json({
        code: 0,
        status: 500,
        message: "Failed to create ride details",
        data: null,
      });
    }

    // Encrypt password
    const hashedPassword = md5(password);

    // Insert driver details
    const driverSql = `
      INSERT INTO drivers 
      (first_name, last_name, mobile, gender, dob, profile_pic, email, password, 
      current_address, permanent_address, city, state, zip_code, ride_no, license) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const driverValues = [
      first_name,
      last_name,
      mobile,
      gender,
      dob,
      profilePic,
      email,
      hashedPassword,
      current_address,
      permanent_address,
      city,
      state,
      zip_code,
      rideResult.insertId,
      license,
    ];

    const driverResult = await query(driverSql, driverValues);

    if (driverResult.insertId) {
      return res.status(201).json({
        code: 1,
        status: 201,
        message: "Driver registered successfully",
        data: {
          driver_id: driverResult.insertId,
          profile_pic: profilePic ? `/uploads/driver/${profilePic}` : null,
        },
      });
    } else {
      return res.status(500).json({
        code: 0,
        status: 500,
        message: "Failed to register driver",
        data: null,
      });
    }
  } catch (err) {
    return res.status(500).json({
      code: 0,
      status: 500,
      message: "Internal Server Error",
      error: err.message,
      data: null,
    });
  }
};
