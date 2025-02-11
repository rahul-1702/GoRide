import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Container, Form, Button, Alert } from "react-bootstrap";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:5000/admin/reset-password/${token}`,
        { password }
      );

      if (response.data.code === 1) {
        setSuccess("Password reset successfully! Redirecting...");
        setTimeout(() => navigate("/"), 3000); // Redirect to home page after 3 sec
      } else {
        setError(response.data.message || "Failed to reset password.");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <Container className="d-flex flex-column align-items-center justify-content-center" style={{ height: "100vh" }}>
      <div className="card p-4 shadow" style={{ width: "400px" }}>
        <h3 className="text-center">Reset Password</h3>
        {error && <Alert variant="danger">{error}</Alert>}
        {success && <Alert variant="success">{success}</Alert>}
        
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="password">
            <Form.Label>New Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Button type="submit" variant="primary" className="mt-3 w-100">
            Reset Password
          </Button>
        </Form>
      </div>
    </Container>
  );
};

export default ResetPassword;
