import React, { useState } from "react";
import {
    Container,
    Row,
    Col,
    Form,
    Button,
    Spinner,
} from "react-bootstrap";
import { FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const PasswordReset = ({ currentPassword, onPasswordChange }) => {
    const [form, setForm] = useState({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
    });
    const [errors, setErrors] = useState({});
    const [serverError, setServerError] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setErrors((prev) => ({ ...prev, [name]: "" }));
        setServerError("");
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const validate = () => {
        const errs = {};
        if (!form.oldPassword) errs.oldPassword = "Please enter your old password.";
        else if (form.oldPassword !== currentPassword)
            errs.oldPassword = "Old password is incorrect.";
        if (!form.newPassword) errs.newPassword = "Please enter a new password.";
        else if (form.newPassword.length < 6)
            errs.newPassword = "New password must be at least 6 characters.";
        if (!form.confirmPassword) errs.confirmPassword = "Please confirm your new password.";
        else if (form.newPassword !== form.confirmPassword)
            errs.confirmPassword = "New passwords do not match.";
        return errs;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errs = validate();
        if (Object.keys(errs).length > 0) {
            setErrors(errs);
            return;
        }

        setLoading(true);
        try {
            await onPasswordChange(form.newPassword);
            alert("Password changed successfully!");
            navigate("/users");
        } catch (err) {
            setServerError(err.message || "Failed to change password.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container fluid className="vh-100">
            <Row className="h-100">
                <Col
                    md={6}
                    className="d-none d-md-block"
                    style={{
                        background: "linear-gradient(120deg, #eef1fc, #f9f9ff)",
                    }}
                />
                <Col
                    md={6}
                    className="d-flex align-items-center justify-content-center"
                >
                    <div style={{ width: "100%", maxWidth: "400px" }}>
                        <h3 className="mb-2 text-center">Reset Your Password</h3>
                        <p className="text-muted text-center mb-4">
                            Please enter your old and new password below
                        </p>

                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3">
                                <div className="position-relative">
                                    <FaLock
                                        className="position-absolute"
                                        style={{
                                            top: "50%",
                                            left: "12px",
                                            transform: "translateY(-50%)",
                                            color: "#999",
                                            pointerEvents: "none",
                                            zIndex: 1,
                                        }}
                                    />
                                    <Form.Control
                                        type="password"
                                        name="oldPassword"
                                        placeholder="Old Password"
                                        value={form.oldPassword}
                                        onChange={handleChange}
                                        style={{ paddingLeft: "40px", borderRadius: "0.5rem" }}
                                    />
                                </div>
                                {errors.oldPassword && (
                                    <div className="text-danger small mt-1">{errors.oldPassword}</div>
                                )}
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <div className="position-relative">
                                    <FaLock
                                        className="position-absolute"
                                        style={{
                                            top: "50%",
                                            left: "12px",
                                            transform: "translateY(-50%)",
                                            color: "#999",
                                            pointerEvents: "none",
                                            zIndex: 1,
                                        }}
                                    />
                                    <Form.Control
                                        type="password"
                                        name="newPassword"
                                        placeholder="New Password"
                                        value={form.newPassword}
                                        onChange={handleChange}
                                        style={{ paddingLeft: "40px", borderRadius: "0.5rem" }}
                                    />
                                </div>
                                {errors.newPassword && (
                                    <div className="text-danger small mt-1">{errors.newPassword}</div>
                                )}
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <div className="position-relative">
                                    <FaLock
                                        className="position-absolute"
                                        style={{
                                            top: "50%",
                                            left: "12px",
                                            transform: "translateY(-50%)",
                                            color: "#999",
                                            pointerEvents: "none",
                                            zIndex: 1,
                                        }}
                                    />
                                    <Form.Control
                                        type="password"
                                        name="confirmPassword"
                                        placeholder="Confirm New Password"
                                        value={form.confirmPassword}
                                        onChange={handleChange}
                                        style={{ paddingLeft: "40px", borderRadius: "0.5rem" }}
                                    />
                                </div>
                                {errors.confirmPassword && (
                                    <div className="text-danger small mt-1">{errors.confirmPassword}</div>
                                )}
                            </Form.Group>

                            {serverError && (
                                <div className="alert alert-danger">{serverError}</div>
                            )}

                            <Button
                                type="submit"
                                className="w-100 d-flex justify-content-center align-items-center gap-2"
                                disabled={loading}
                                style={{
                                    backgroundColor: "#0050ff",
                                    borderColor: "#0050ff",
                                    borderRadius: "0.5rem",
                                    height: "45px",
                                }}
                            >
                                {loading && (
                                    <Spinner
                                        as="span"
                                        animation="border"
                                        size="sm"
                                        role="status"
                                        aria-hidden="true"
                                    />
                                )}
                                {loading ? "Changing..." : "Change Password"}
                            </Button>
                        </Form>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default PasswordReset;
