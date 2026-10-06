import React, { useState } from "react";
import logo from "../../assets/logo.svg";
import "./AuthPage.css";

export default function AuthPage() {
    const [isSignUp, setIsSignUp] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        surname: "",
        nickname: "",
        email: "",
        password: "",
    });

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const switchMode = (signUp) => {
        setIsSignUp(signUp);
        setMessage("");
        setError("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setMessage("");
        setError("");
        setLoading(true);

        const endpoint = isSignUp
            ? "/api/auth/register"
            : "/api/auth/login";

        const payload = isSignUp
            ? formData
            : {
                email: formData.email,
                password: formData.password,
            };

        try {
            const response = await fetch(
                `http://localhost:8080${endpoint}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(payload),
                }
            );

            const data = await response.json().catch(() => null);

            if (!response.ok) {
                throw new Error(
                    data?.message ||
                    "Wystąpił błąd podczas autoryzacji."
                );
            }

            if (isSignUp) {
                setMessage(
                    "Rejestracja zakończona sukcesem. Możesz się teraz zalogować."
                );

                setIsSignUp(false);

                setFormData((prev) => ({
                    ...prev,
                    password: "",
                }));
            } else {
                if (!data?.token) {
                    throw new Error("Serwer nie zwrócił tokenu JWT.");
                }

                localStorage.setItem("token", data.token);

                setMessage(
                    "Zalogowano pomyślnie."
                );
            }
        } catch (err) {
            setError(
                err?.message ||
                "Błąd połączenia z serwerem lub niepoprawne dane."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            {/* Pełnoekranowe tło */}
            <div className="auth-bg-glow" />
            <div className="auth-grid" />
            <div className="auth-vignette" />

            {/* =====================================================
                HEADER
               ===================================================== */}
            <header className="auth-header">
                {/* LEWA STRONA */}
                <a href="/" className="auth-brand-link">
                    <span className="auth-logo-wrap">
                        <img
                            src={logo}
                            alt="Piston Protocol Logo"
                            className="auth-logo-img"
                        />
                    </span>

                    <span className="auth-brand-text">
                        Piston Protocol
                    </span>
                </a>

                {/* PRAWA STRONA */}
                <div className="system-status">
                    <span className="status-dot" />
                    <span>SYSTEM ONLINE</span>
                </div>
            </header>

            {/* =====================================================
                MAIN / CENTRALNY FORMULARZ
               ===================================================== */}
            <main className="auth-main">
                <section className="auth-card">
                    {/* TABS */}
                    <div className="auth-tabs">
                        <button
                            type="button"
                            onClick={() => switchMode(false)}
                            className={`tab-btn ${
                                !isSignUp ? "active" : ""
                            }`}
                        >
                            Sign In
                        </button>

                        <button
                            type="button"
                            onClick={() => switchMode(true)}
                            className={`tab-btn ${
                                isSignUp ? "active" : ""
                            }`}
                        >
                            Sign Up
                        </button>
                    </div>

                    {/* TITLE */}
                    <div
                        className="auth-title-section"
                        key={isSignUp ? "signup-title" : "signin-title"}
                    >
                        <p className="auth-subtitle">
                            {isSignUp
                                ? "Create Profile"
                                : "Secure Access"}
                        </p>

                        <h1 className="auth-title">
                            {isSignUp
                                ? "Join the protocol."
                                : "Welcome back."}
                        </h1>

                        <p className="auth-desc">
                            {isSignUp
                                ? "Create your identity for a more intelligent driving experience."
                                : "Sign in to continue to your connected driving environment."}
                        </p>
                    </div>

                    {/* ALERTS */}
                    {message && (
                        <div className="alert-box alert-success">
                            {message}
                        </div>
                    )}

                    {error && (
                        <div className="alert-box alert-error">
                            {error}
                        </div>
                    )}

                    {/* FORM */}
                    <form
                        onSubmit={handleSubmit}
                        className="auth-form"
                        key={isSignUp ? "signup-form" : "signin-form"}
                    >
                        {/* NAME + SURNAME */}
                        {isSignUp && (
                            <div className="form-row">
                                <div className="input-group">
                                    <label
                                        htmlFor="name"
                                        className="input-label"
                                    >
                                        First Name
                                    </label>

                                    <input
                                        id="name"
                                        type="text"
                                        name="name"
                                        placeholder="First name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        autoComplete="given-name"
                                        className="auth-input"
                                    />
                                </div>

                                <div className="input-group">
                                    <label
                                        htmlFor="surname"
                                        className="input-label"
                                    >
                                        Last Name
                                    </label>

                                    <input
                                        id="surname"
                                        type="text"
                                        name="surname"
                                        placeholder="Last name"
                                        value={formData.surname}
                                        onChange={handleChange}
                                        required
                                        autoComplete="family-name"
                                        className="auth-input"
                                    />
                                </div>
                            </div>
                        )}

                        {/* USERNAME */}
                        {isSignUp && (
                            <div className="input-group">
                                <label
                                    htmlFor="nickname"
                                    className="input-label"
                                >
                                    Username
                                </label>

                                <input
                                    id="nickname"
                                    type="text"
                                    name="nickname"
                                    placeholder="Choose a nickname"
                                    value={formData.nickname}
                                    onChange={handleChange}
                                    required
                                    autoComplete="username"
                                    className="auth-input"
                                />
                            </div>
                        )}

                        {/* EMAIL */}
                        <div className="input-group">
                            <label
                                htmlFor="email"
                                className="input-label"
                            >
                                Email
                            </label>

                            <input
                                id="email"
                                type="email"
                                name="email"
                                placeholder="name@example.com"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                autoComplete="email"
                                className="auth-input"
                            />
                        </div>

                        {/* PASSWORD */}
                        <div className="input-group">
                            <label
                                htmlFor="password"
                                className="input-label"
                            >
                                Password
                            </label>

                            <input
                                id="password"
                                type="password"
                                name="password"
                                placeholder={
                                    isSignUp
                                        ? "Create a secure password"
                                        : "Enter your password"
                                }
                                value={formData.password}
                                onChange={handleChange}
                                required
                                autoComplete={
                                    isSignUp
                                        ? "new-password"
                                        : "current-password"
                                }
                                className="auth-input"
                            />
                        </div>

                        {/* SUBMIT */}
                        <button
                            type="submit"
                            className="submit-btn"
                            disabled={loading}
                        >
                            {loading
                                ? "Processing..."
                                : isSignUp
                                    ? "Create Profile"
                                    : "Sign In"}
                        </button>
                    </form>
                </section>
            </main>

            {/* =====================================================
                FOOTER
               ===================================================== */}
            <footer className="auth-footer">
                <div className="footer-left">
                    <span>
                        © {new Date().getFullYear()} Piston Protocol.
                        All rights reserved.
                    </span>

                    <div className="footer-links">
                        <a href="/privacy">Privacy Policy</a>
                        <a href="/terms">Terms of Service</a>
                        <a href="/support">Support</a>
                    </div>
                </div>

                <div className="footer-right">
                    <span>UI v1.0 // Secure Environment</span>
                </div>
            </footer>
        </div>
    );
}