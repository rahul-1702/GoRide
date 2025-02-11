import { validationResult } from "express-validator";
import { query } from "../Database/db.js";

import dotenv from "dotenv";

import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

dotenv.config();

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

// adminForgotPassword ======================

export const adminForgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.json({ code: 0, message: "Please provide email", data: "" });
    }

    const checkEmailQuery = "SELECT * FROM admins WHERE email = ?";
    const checkEmail = await query(checkEmailQuery, [email]);

    if (!checkEmail || checkEmail.length === 0) {
      return res.json({
        code: 0,
        message: "Admin not found, Please register",
        data: "",
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
          <h2>Password Reset Request</h2>
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
        return res.json({
          code: 1,
          message: "Password reset link sent successfully to your email",
          data: "",
        });
      }
    } catch (error) {
      return res.json({
        code: 0,
        message: "Failed to send password reset link",
        data: error.message,
      });
    }
  } catch (err) {
    return res.status(500).json({
      code: 0,
      message: "Something went wrong",
      data: err.message,
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
      return res.json({
        code: 0,
        message: errors.errors[0].msg,
        data: "",
      });
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);

    const getEmailSql = "SELECT * FROM admins WHERE email = ?";
    const user = await query(getEmailSql, [decode.email]);

    if (!user.length) {
      return res.json({ code: 0, message: "User not found", data: "" });
    }

    // // Hash the new password
    // const saltRounds = 10;
    // const newHashPassword = await bcrypt.hash(password, saltRounds);

    const passSql = "UPDATE admins SET password = ? WHERE email = ?";
    const updated = await query(passSql, [password, decode.email]);

    if (updated.affectedRows > 0) {
      return res.json({
        code: 1,
        message: "Password Reset Successfully",
        data: "",
      });
    } else {
      return res.json({
        code: 0,
        message: "Failed to reset password",
        data: "",
      });
    }
  } catch (err) {
    return res.status(500).json({
      code: 0,
      message: "Something went wrong",
      data: err.message,
    });
  }
};
