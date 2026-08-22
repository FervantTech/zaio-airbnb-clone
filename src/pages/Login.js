import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../CSS/Login.css";

function Login() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    function handleChange(event) {
        const { name, value } = event.target;

        setFormData({
            ...formData,
            [name]: value,
        });
    }

    function validateForm() {
        const newErrors = {};

        if (!formData.email.trim()) {
            newErrors.email = "Email is required.";
        } else if (!formData.email.includes("@")) {
            newErrors.email = "Enter a valid email address.";
        }

        if (!formData.password) {
            newErrors.password = "Password is required.";
        } else if (formData.password.length < 6) {
            newErrors.password =
                "Password must contain at least 6 characters.";
        }

        return newErrors;
    }

    function handleSubmit(event) {
        event.preventDefault();

        const formErrors = validateForm();
        setErrors(formErrors);

        if (Object.keys(formErrors).length > 0) {
            return;
        }

        const user = {
            username: formData.email.split("@")[0],
            email: formData.email,
        };

        localStorage.setItem("user", JSON.stringify(user));
        navigate("/admin");
    }

    return (
        <main className="login-page">
            <form className="login-form" onSubmit={handleSubmit}>
                <h1>Log in</h1>
                <p>Welcome back to Airbnb Clone</p>

                <label htmlFor="email">Email address</label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="name@example.com"
                />

                {errors.email && (
                    <p className="form-error">{errors.email}</p>
                )}

                <label htmlFor="password">Password</label>
                <input
                    id="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                />

                {errors.password && (
                    <p className="form-error">{errors.password}</p>
                )}

                <button type="submit">Continue</button>
            </form>
        </main>
    );
}

export default Login;