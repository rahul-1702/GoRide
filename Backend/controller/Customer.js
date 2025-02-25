import { validationResult } from "express-validator";
import { query } from "../Database/db.js";
import md5 from "md5";

import jwt from "jsonwebtoken";

// getAllCustomer =======================

export const getAllCustomers = async (req, res) => {
  try {
    const sql = "SELECT * FROM customers";
    const result = await query(sql);

    if (result.length > 0) {
      res.json({
        code: 1,
        message: "Customers fetched successully",
        data: result,
      });
    } else {
      res.json({ code: 0, message: "No customers found", data: "" });
    }
  } catch (err) {
    res
      .status(500)
      .json({ code: 0, message: "Something went wrong", data: err.message });
  }
};

// loginCustomer ======================

export const loginCustomer = async (req, res) => {
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

    const sql = "SELECT * FROM customers WHERE `email` = ? AND `password` = ?";
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

// signupCustomer ======================

export const signupCustomer = async (req, res) => {
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
      "SELECT * FROM customers WHERE email = ? OR mobile = ?";
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

    const hashedPassword = md5(req.body.password);

    const sql =
      "INSERT INTO customers (`name`, `email`, `mobile`, `password`) VALUES (?, ?, ?, ?)";
    const values = [
      req.body.name,
      req.body.email,
      req.body.mobile,
      hashedPassword,
    ];

    let result = await query(sql, values);

    if (result) {
      res.json({
        code: 1,
        message: "Customer registered Successfully",
        data: "",
      });
    } else {
      res.json({ code: 0, message: "Failed to register customer", data: "" });
    }
  } catch (err) {
    res
      .status(500)
      .json({ code: 0, message: "Something went wrong", data: err.message });
  }
};
