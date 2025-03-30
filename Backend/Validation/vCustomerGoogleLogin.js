import { body } from "express-validator";

// Validation rules for customer google login
export const googleValidation = [
  body("token")
    .notEmpty()
    .withMessage("token is required")
    .isLength({ min: 36, max: 36 })
    .withMessage("token must be exactly 36 characters long")
    .isUUID(4)
    .withMessage("Invalid token format"),

  body("name")
    .notEmpty()
    .withMessage("Name is required")
    .isString()
    .withMessage("Name must be a string")
    .isLength({ min: 3, max: 30 })
    .withMessage("Name must be between 3 and 30 characters"),

  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email address"),

  body("mobile")
    .notEmpty()
    .withMessage("Mobile is required")
    .isString()
    .withMessage("Mobile must be a string")
    .matches(/^[0-9]{10}$/)
    .withMessage("Mobile must be a 10-digit number"),

  body("profile_pic")
    .optional()
    .isURL()
    .withMessage("Invalid URL format for profile picture"),
];
