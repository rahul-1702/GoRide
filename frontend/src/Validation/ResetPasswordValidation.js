function Validation(values) {
  let error = {};
  const password_pattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  // Validations for Password ===============

  if (values.password === "") {
    error.password = "Password should not be empty";
  } else if (!password_pattern.test(values.password)) {
    error.password = "Password didn't match the conditions";
  }

  // Validations for Confirm Password ===============
  
  if (values.cpassword === "") {
    error.cpassword = "Confirm Password should not be empty";
  } else if (!password_pattern.test(values.cpassword)) {
    error.cpassword = "Confirm Password didn't match the conditions";
  } else if (values.cpassword != values.password) {
    error.cpassword = "Password and Confirm password Didn't match";
  }
  
  return error;
}

export default Validation;
