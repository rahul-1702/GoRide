import { validationResult } from "express-validator";
import { query } from "../Database/db.js";
import md5 from "md5";
import jwt from "jsonwebtoken";

// getAllCustomer =======================

export const getAllCustomers = async (req, res) => {
  try {
    const sql = "SELECT id, name, status, email, mobile FROM customers"; // Fetch only required fields
    const result = await query(sql);

    if (result.length > 0) {
      return res.status(200).json({
        code: 1,
        status: 200,
        message: "Customers fetched successfully",
        total: result.length,
        data: result,
      });
    } else {
      return res.status(404).json({
        code: 0,
        status: 404,
        message: "No customers found",
        total: 0,
        data: null,
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

// loginCustomer ======================

export const loginCustomer = async (req, res) => {
  try {
    // Validate input
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

    // Fetch customer details with only required fields
    const sql =
      "SELECT id, name, email, mobile, status FROM customers WHERE email = ? AND password = ?";
    const result = await query(sql, [email, hashedPassword]);

    if (result.length > 0) {
      // Generate JWT Token with best expiry time
      const token = jwt.sign(
        { id: result[0].id, email },
        process.env.JWT_SECRET_KEY,
        {
          expiresIn: "7d",
        }
      );

      return res.status(200).json({
        code: 1,
        status: 200,
        message: "Successfully logged in",
        data: {
          token: token,
          customer: result[0],
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

// signupCustomer ======================

export const signupCustomer = async (req, res) => {
  try {
    // Validate input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        code: 0,
        status: 400,
        message: errors.errors[0].msg,
        data: null,
      });
    }

    const { name, email, mobile, password } = req.body;

    // Check if email or mobile number already exists
    const checkUserQuery =
      "SELECT email, mobile FROM customers WHERE email = ? OR mobile = ?";
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
            ? "Email and Mobile number already exist. Please use different credentials."
            : existingEmail
            ? "Email already exists. Please use a different email."
            : "Mobile number already exists. Please use a different mobile number.",
        data: null,
      });
    }

    const hashedPassword = md5(password);

    // Insert customer data
    const sql =
      "INSERT INTO customers (`name`, `email`, `mobile`, `password`) VALUES (?, ?, ?, ?)";
    const values = [name, email, mobile, hashedPassword];
    const result = await query(sql, values);

    if (result.affectedRows > 0) {
      return res.status(201).json({
        code: 1,
        status: 201,
        message: "Customer registered successfully",
        data: { customer_id: result.insertId },
      });
    } else {
      return res.status(500).json({
        code: 0,
        status: 500,
        message: "Failed to register customer",
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

// googleLogin ========================

export const googleLogin = async (req, res) => {
  try {
    // Validate input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        code: 0,
        status: 400,
        message: errors.errors[0].msg,
        data: null,
      });
    }

    const { name, email, mobile, uuid } = req.body;

    // Fetch customer details with only required fields
    const sql =
      "SELECT id, name, email, mobile, status FROM customers WHERE email = ?";
    const result = await query(sql, [email]);

    if (result.length > 0) {
      const sql2 = "UPDATE customers SET uuid = ? WHERE email = ?";
      const values2 = [uuid, email];
      const result2 = await query(sql2, values2);

      if (result2.affectedRows === 0) {
        return res.status(500).json({
          code: 0,
          status: 500,
          message: "Failed to login",
          data: null,
        });
      } else {
        return res.status(200).json({
          code: 1,
          status: 200,
          message: "Successfully logged in",
          data: {
            token: token,
            customer: result[0],
          },
        });
      }
    } else {
      // Generate a random password
      const randomPassword = Math.random().toString(36).slice(-8);
      const hashedPassword = md5(randomPassword);

      const profilePic = req.file ? req.file.filename : null;

      // Insert new admin
      const sql =
        "INSERT INTO customers (`name`, `email`, `mobile`, `password`, `uuid`, `profile_pic`) VALUES (?, ?, ?, ?, UNHEX(REPLACE(?, '-', '')), ?)";
      const values = [name, email, mobile, hashedPassword, uuid, profilePic];

      const result = await query(sql, values);

      if (result.affectedRows > 0) {
        return res.status(201).json({
          code: 1,
          status: 201,
          message: "Customer registered successfully",
          data: {
            customer_id: result.insertId,
            profile_pic: profilePic ? `/uploads/customer/${profilePic}` : null,
          },
        });
      } else {
        return res.status(500).json({
          code: 0,
          status: 500,
          message: "Failed to register customer",
          data: null,
        });
      }
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
