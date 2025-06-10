import React, { useState } from "react";
import {
    Container,
    Row,
    Col,
    Form,
    Button,
    Spinner,
} from "react-bootstrap";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Login = ({ onSubmit }) => {
    const [form, setForm] = useState({
        email: "",
        password: "",
        remember: false,
    });
    const [errors, setErrors] = useState({});
    const [serverError, setServerError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
        setServerError("");

        setForm((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const validate = () => {
        const errs = {};
        if (!form.email.trim()) errs.email = "Please enter a valid email.";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
            errs.email = "Please enter a valid email address.";
        if (!form.password.trim()) errs.password = "Please enter a password.";
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
            await onSubmit(form);
            navigate("/users");
        } catch (err) {
            setServerError(err.message || "Invalid credentials");
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
                        <h3 className="mb-2 text-center">Sign In to your Account</h3>
                        <p className="text-muted text-center mb-4">
                            Welcome back! please enter your detail
                        </p>

                        <Form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <div className="position-relative">
                                    <FaEnvelope
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
                                        type="email"
                                        name="email"
                                        placeholder="Email"
                                        value={form.email}
                                        onChange={handleChange}
                                        style={{
                                            paddingLeft: "40px",
                                            borderRadius: "0.5rem",
                                        }}
                                    />
                                </div>
                                {errors.email && (
                                    <div className="text-danger small mt-1">{errors.email}</div>
                                )}
                            </div>

                            <div className="mb-3">
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
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        placeholder="Password"
                                        value={form.password}
                                        onChange={handleChange}
                                        style={{
                                            paddingLeft: "40px",
                                            paddingRight: "40px",
                                            borderRadius: "0.5rem",
                                        }}
                                    />
                                    <div
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="position-absolute"
                                        style={{
                                            top: "50%",
                                            right: "12px",
                                            transform: "translateY(-50%)",
                                            color: "#999",
                                            cursor: "pointer",
                                            zIndex: 1,
                                        }}
                                    >
                                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                                    </div>
                                </div>
                                {errors.password && (
                                    <div className="text-danger small mt-1">{errors.password}</div>
                                )}
                            </div>

                            {serverError && (
                                <div className="alert alert-danger">{serverError}</div>
                            )}

                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <div className="form-check" style={{ cursor: "pointer" }}>
                                    <Form.Check.Input
                                        type="checkbox"
                                        id="rememberMe"
                                        name="remember"
                                        checked={form.remember}
                                        onChange={handleChange}
                                        style={{ cursor: "pointer" }}
                                    />
                                    <Form.Check.Label
                                        htmlFor="rememberMe"
                                        style={{ cursor: "pointer", marginLeft: "8px" }}
                                    >
                                        Remember me
                                    </Form.Check.Label>
                                </div>

                                <span
                                    role="button"
                                    tabIndex="0"
                                    onClick={() => navigate("/reset-password")}
                                    onKeyDown={(e) => e.key === 'Enter' && navigate("/reset-password")}
                                    className="text-decoration-none text-primary"
                                    style={{ cursor: "pointer" }}
                                >
                                    Forgot Password?
                                </span>

                            </div>

                            <Button
                                type="submit"
                                className="w-100 d-flex justify-content-center align-items-center gap-2"
                                disabled={loading || !form.email || !form.password}
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
                                {loading ? "Signing in..." : "Sign In"}
                            </Button>
                        </Form>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default Login;
