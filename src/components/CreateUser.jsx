import React, { useState } from "react";
import { Container, Form, Button, Row, Col, Alert, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { createUser } from "../services/userService";

const CreateUser = () => {
  const [form, setForm] = useState({
    fname: "",
    lname: "",
    email: "",
    phone: "",
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handlePhoneChange = (e) => {
    const { value } = e.target;
    if (value === "" || (/^\d+$/.test(value) && value.length <= 10)) {
      setForm((prev) => ({ ...prev, phone: value }));
      setErrors((prev) => ({ ...prev, phone: "" }));
    }
  };

  const validate = () => {
    const errs = {};
    if (!form.fname.trim()) errs.fname = "First name is required.";
    if (!form.lname.trim()) errs.lname = "Last name is required.";
    if (!form.email.trim()) errs.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      errs.email = "Invalid email format.";
    if (!form.phone.trim()) errs.phone = "Phone number is required.";
    else if (!/^\d{10}$/.test(form.phone))
      errs.phone = "Phone number must be exactly 10 digits.";
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    try {
      createUser(form);
      setSubmitted(true);

      setTimeout(() => {
        navigate("/users");
      }, 2000);
    } catch (error) {
      setErrors({ email: error.message });
    }
  };

  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: "100vh",
        width: "100vw",
        background: "linear-gradient(120deg, #eef1fc, #f9f9ff)",
        padding: "1rem",
      }}
    >
      <Card
        style={{
          maxWidth: "600px",
          width: "100%",
          padding: "2.5rem 2rem",
          borderRadius: "1rem",
          boxShadow:
            "0 4px 15px rgba(0, 0, 50, 0.1), 0 6px 20px rgba(0, 0, 50, 0.08)",
          backgroundColor: "#fff",
        }}
      >
        <h2
          className="mb-4 text-center"
          style={{ color: "#0d6efd", fontWeight: "700", letterSpacing: "1px" }}
        >
          Create User
        </h2>

        {submitted && (
          <Alert variant="success" className="text-center">
            User created successfully!
          </Alert>
        )}

        <Form onSubmit={handleSubmit} noValidate>
          <Row className="g-3">
            <Col md={6}>
              <Form.Group controlId="fname">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  name="fname"
                  value={form.fname}
                  onChange={handleChange}
                  placeholder="Enter first name"
                />
                {errors.fname && (
                  <div
                    style={{ color: "red", fontSize: "0.85rem", marginTop: "0.25rem" }}
                  >
                    {errors.fname}
                  </div>
                )}
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group controlId="lname">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  name="lname"
                  value={form.lname}
                  onChange={handleChange}
                  placeholder="Enter last name"
                />
                {errors.lname && (
                  <div
                    style={{ color: "red", fontSize: "0.85rem", marginTop: "0.25rem" }}
                  >
                    {errors.lname}
                  </div>
                )}
              </Form.Group>
            </Col>
          </Row>

          <Form.Group controlId="email" className="mt-3">
            <Form.Label>Email ID</Form.Label>
            <Form.Control
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter email address"
            />
            {errors.email && (
              <div
                style={{ color: "red", fontSize: "0.85rem", marginTop: "0.25rem" }}
              >
                {errors.email}
              </div>
            )}
          </Form.Group>

          <Form.Group controlId="phone" className="mt-3">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              name="phone"
              value={form.phone}
              onChange={handlePhoneChange}
              placeholder="Enter 10-digit phone number"
            />
            {errors.phone && (
              <div
                style={{ color: "red", fontSize: "0.85rem", marginTop: "0.25rem" }}
              >
                {errors.phone}
              </div>
            )}
          </Form.Group>

          <Button
            variant="primary"
            type="submit"
            className="w-100 mt-4"
            style={{ borderRadius: "0.5rem", padding: "0.65rem" }}
          >
            Create User
          </Button>
        </Form>
      </Card>
    </Container>
  );
};

export default CreateUser;
