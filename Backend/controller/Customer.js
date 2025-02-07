import { validationResult } from "express-validator";
import { query } from "../Database/db.js";

// getAllCustomer =======================

export const getAllCustomers = async (req, res) => {
  try {
    const sql = "SELECT * FROM customers";
    const result = await query(sql);

    if (result.length > 0) {
      res.json({ code: 1, message: "Customers fetched successully", data: result });
    } else {
      res.json({ code: 0, message: "No customers found", data: "" });
    }
  } catch (err) {
    res.status(500).json({ code: 0, message: "Something went wrong", data: err.message });
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

    const sql = "SELECT * FROM customers WHERE `email` = ? AND `password` = ?";
    let result = await query(sql, [req.body.email, req.body.password]);

    if (result && result.length > 0) {
      res.json({ code: 1, message: "Successfully Logged in", data: "" });
    } else {
      res.json({ code: 0, message: "No records found", data: "" });
    }
  } catch (err) {
    res.status(500).json({ code: 0, message: "Something went wrong", data: err.message });
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

    // Check if mail already exists
    const emailCheckQuery = "SELECT * FROM customers WHERE email = ?";
    const existingUser = await query(emailCheckQuery, [req.body.email]);

    if (existingUser.length > 0) {
      return res.json({
        code: 0,
        message: "Email already exists. Please use a different email.",
        data: "",
      });
    }

    const sql =
      "INSERT INTO customers (`name`, `email`, `mobile`, `password`) VALUES (?, ?, ?, ?)";
    const values = [
      req.body.name,
      req.body.email,
      req.body.mobile,
      req.body.password,
    ];
    let result = await query(sql, values);

    if (result) {
      res.json({ code: 1, message: "Signup Successfully", data: "" });
    }else{
      res.json({ code: 0, message: "Failed to Signup", data: "" });
    }
  } catch (err) {
    res.status(500).json({ code: 0, message: "Something went wrong", data: err.message });
  }
};
