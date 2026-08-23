import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API_URL from "../config/api";
import "../CSS/Login.css";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
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
      newErrors.password = "Password must contain at least 6 characters.";
    }

    return newErrors;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const formErrors = validateForm();
    setErrors(formErrors);

    if (Object.keys(formErrors).length > 0) {
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(`${API_URL}/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrors({
          form: data.message || "Login failed.",
        });

        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      navigate("/admin");
    } catch (error) {
      setErrors({
        form: "Could not connect to the server.",
      });
    } finally {
      setLoading(false);
    }
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

        {errors.email && <p className="form-error">{errors.email}</p>}

        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter your password"
        />

        {errors.password && <p className="form-error">{errors.password}</p>}
{errors.form && (
    <p className="form-error">{errors.form}</p>
)}
        <button type="submit" disabled={loading}>
    {loading ? "Logging in..." : "Continue"}
</button>
      </form>
    </main>
  );
}

export default Login;
