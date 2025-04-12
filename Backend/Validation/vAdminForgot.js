import { body } from "express-validator";

// Validation rules for Admin forgot password
export const forgotValidation = [
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email address"),
];