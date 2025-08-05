import { useState } from "react";
import "./login.css";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    let isValid = true;

    if (formData.email.trim() === "") {
      setEmailError("email field cannot be empty!");
      isValid = false;
    } else {
      setEmailError("");
    }

    if (formData.password.trim() === "") {
      setPasswordError("password field cannot be empty!");
      isValid = false;
    } else {
      setPasswordError("");
    }

    if (!isValid) return;

    try {
      const response = await fetch("http://localhost:1010/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });
      const data = await response.json();
      const token = data.token;

      if (!response.ok) {
        alert(data.message || "Login failed. Please try again.");
        return;
      }
      
      console.log(data);
      localStorage.setItem("token", token);
      alert("Login successful!");
      setFormData({ email: "", password: "" });
      navigate("/home");
    } catch (error) {
      console.error("Login error :", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="loginPage">
      <form className="loginForm">
        <h2 className="formUp">Coachly</h2>
        <label htmlFor="email">Email :</label>
        <br />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email"
          required
        />
        <br />
        {emailError && <p>{emailError}</p>}

        <label htmlFor="password">Password :</label>
        <br />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter your password"
          required
        />
        <br />
        {passwordError && <p>{passwordError}</p>}

        <button type="submit" onClick={handleLogin} className="loginBtn">
          Login
        </button>

        <p className="formdown">
          Don't have an account ?{" "}
          <Link to="/register" className="signUp">
            Sign Up
          </Link>{" "}
        </p>
      </form>
    </div>
  );
}
