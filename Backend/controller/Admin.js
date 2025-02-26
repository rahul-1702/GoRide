import { validationResult } from "express-validator";
import { query } from "../Database/db.js";
import md5 from "md5";

import dotenv from "dotenv";

import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

dotenv.config();

// getAllAdmins ======================

export const getAllAdmins = async (req, res) => {
  try {
    const sql = "SELECT id, name, status, email, mobile FROM admins";
    const result = await query(sql);

    if (result.length > 0) {
      return res.status(200).json({
        code: 1,
        status: 200,
        message: "Admins fetched successfully",
        data: result,
      });
    } else {
      return res.status(404).json({
        code: 0,
        status: 404,
        message: "No admins found",
        data: null,
      });
    }
  } catch (err) {
    return res.status(500).json({
      code: 0,
      status: 500,
      message: "Something went wrong",
      error: err.message,
      data: null,
    });
  }
};

// loginAdmin ======================

export const loginAdmin = async (req, res) => {
  try {
    // Validations --------
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        code: 0,
        status: 400,
        message: errors.errors[0].msg,
        data: null,
      });
    }

    const { email } = req.body;
    const token = jwt.sign({ email }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1h",
    });

    const hashedPassword = md5(req.body.password);

    const sql = "SELECT * FROM admins WHERE `email` = ? AND `password` = ?";
    const values = [email, hashedPassword];
    let result = await query(sql, values);

    if (result && result.length > 0) {
      return res.status(200).json({
        code: 1,
        status: 200,
        message: "Successfully logged in",
        data: { token: token },
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
      message: "Something went wrong",
      error: err.message,
      data: null,
    });
  }
};

// signupAdmin ======================

export const signupAdmin = async (req, res) => {
  try {
    // Validations --------
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        code: 0,
        status: 400,
        message: errors.errors[0].msg,
        data: null,
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

    const hashedPassword = md5(req.body.password);

    const sql =
      "INSERT INTO admins (`name`, `email`, `mobile`, `password`) VALUES (?, ?, ?, ?)";
    const values = [
      req.body.name,
      req.body.email,
      req.body.mobile,
      hashedPassword,
    ];
    let result = await query(sql, values);

    if (result.affectedRows > 0) {
      return res.status(201).json({
        code: 1,
        status: 201,
        message: "Admin registered successfully",
        data: null,
      });
    } else {
      return res.status(500).json({
        code: 0,
        status: 500,
        message: "Failed to register admin",
        data: null,
      });
    }
  } catch (err) {
    return res.status(500).json({
      code: 0,
      status: 500,
      message: "Something went wrong",
      error: err.message,
      data: null,
    });
  }
};

// adminForgotPassword ======================

export const adminForgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        code: 0,
        status: 400,
        message: "Please provide email",
        data: null,
      });
    }

    const checkEmailQuery = "SELECT * FROM admins WHERE email = ?";
    const checkEmail = await query(checkEmailQuery, [email]);

    if (!checkEmail || checkEmail.length === 0) {
      return res.status(404).json({
        code: 0,
        status: 404,
        message: "Admin not found, Please register",
        data: null,
      });
    }

    const token = jwt.sign({ email }, process.env.JWT_SECRET_KEY, {
      expiresIn: "10m",
    });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      secure: true,
      auth: {
        user: process.env.MY_GMAIL,
        pass: process.env.MY_APP_PASSWORD,
      },
    });

    const receiver = {
      from: process.env.MY_GMAIL,
      to: email,
      subject: "Password Reset Request",
      html: `
        <div style="text-align: center; font-family: Arial, sans-serif;">
          <h2>Password Reset Request For  <span style="color: #007bff">GoRide</span> Admin Panel</h2>
          <p>You requested a password reset. Click the button below to reset your password:</p>
          <a href="http://${process.env.REACT_HOST}:${process.env.REACT_PORT}/admin/reset-password/${token}" 
             style="display: inline-block; background-color: #007bff; color: white; padding: 12px 20px; text-decoration: none; border-radius: 5px; font-size: 16px;">
             Reset Your Password
          </a>
          <p>If you did not request this, please ignore this email.</p>
        </div>
      `,
    };

    try {
      let sentToGmail = await transporter.sendMail(receiver);
      if (sentToGmail) {
        return res.status(200).json({
          code: 1,
          status: 200,
          message: "Password reset link sent successfully to your email",
          data: {
            token: token,
          },
        });
      } else {
        return res.status(500).json({
          code: 0,
          status: 500,
          message: "Failed to send password reset link",
          data: null,
        });
      }
    } catch (error) {
      return res.status(500).json({
        code: 0,
        status: 500,
        message: "Failed to send password reset link",
        error: error.message,
        data: null,
      });
    }
  } catch (err) {
    return res.status(500).json({
      code: 0,
      status: 500,
      message: "Something went wrong",
      error: err.message,
      data: null,
    });
  }
};

// adminResetPassword ======================

export const adminResetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    // Validations --------
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        code: 0,
        status: 400,
        message: errors.errors[0].msg,
        data: null,
      });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    } catch (error) {
      return res.status(401).json({
        code: 0,
        status: 401,
        message: "Invalid or expired token",
        data: null,
      });
    }

    const getEmailSql = "SELECT * FROM admins WHERE email = ?";
    const user = await query(getEmailSql, [decoded.email]);

    if (!user.length) {
      return res.status(404).json({
        code: 0,
        status: 404,
        message: "User not found",
        data: null,
      });
    }

    const hashedPassword = md5(password);

    const passSql = "UPDATE admins SET password = ? WHERE email = ?";
    const updated = await query(passSql, [hashedPassword, decoded.email]);

    if (updated.affectedRows > 0) {
      return res.status(200).json({
        code: 1,
        status: 200,
        message: "Password reset successfully",
        data: null,
      });
    } else {
      return res.status(500).json({
        code: 0,
        status: 500,
        message: "Failed to reset password",
        data: null,
      });
    }
  } catch (err) {
    return res.status(500).json({
      code: 0,
      status: 500,
      message: "Something went wrong",
      error: err.message,
      data: null,
    });
  }
};
