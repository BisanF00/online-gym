import { useState } from "react";
import "./register.css";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    gender: "",
    role: "",
  });
  const [userNameError, setUserNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    let isValid = true;

    if (formData.name.trim() === "") {
      setUserNameError("user name field cannot be empty!");
      isValid = false;
    } else {
      setUserNameError("");
    }

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
      const response = await fetch("http://localhost:1010/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          gender: formData.gender,
          role: formData.role,
        }),
      });
      const data = await response.json();
      console.log(data);
      alert("Registered successfully");
      setFormData({ name: "", email: "", password: "", gender: "", role: "" });
    } catch (error) {
      console.error("Sign Up error :", error);
    }
    navigate("/");
  };

  return (
    <div className="loginPage">
      <form className="SignForm">
        <h2 className="formUp">Coachly</h2>
        <label htmlFor="name">UserName :</label>
        <br />
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter your username"
          required
        />
        <br />
        {userNameError && <p>{userNameError}</p>}

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

        <label htmlFor="gender">Gender :</label>
        <select name="gender" value={formData.gender} onChange={handleChange}>
          <option value="">-- Select Gender --</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>

        <label htmlFor="role">Role :</label>
        <select name="role" value={formData.role} onChange={handleChange}>
          <option value="">-- Select Role --</option>
          <option value="user">User</option>
          <option value="trainer">Trainer</option>
          <option value="nutritionist">Nutritionist</option>
        </select>

        <button onClick={handleSignUp} className="loginBtn">
          Sign Up
        </button>

        <p className="formdown">
          Already have account ?{" "}
          <Link to="/" className="signUp">
            Login
          </Link>{" "}
        </p>
      </form>
    </div>
  );
}
