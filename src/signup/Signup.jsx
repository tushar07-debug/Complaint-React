import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./signup.css";

const Signup = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    reenterPassword: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSignup = (e) => {
    e.preventDefault();
    const { name, email, password, reenterPassword } = formData;

    if (password !== reenterPassword) {
      setError("Passwords do not match");
      return;
    }

    if (!validatePassword(password)) {
      setError("Password must be at least 8 characters long and include at least one number, one capital letter, and one special character.");
      return;
    }

    const existingAccounts = JSON.parse(localStorage.getItem("accounts")) || [];

    if (existingAccounts.some(account => account.email === email)) {
      setError("An account with this email already exists");
      return;
    }

    // Add new account to local storage
    const newAccount = { name, email, password };
    existingAccounts.push(newAccount);
    localStorage.setItem("accounts", JSON.stringify(existingAccounts));

    // Redirect to the login page after successful signup
    navigate("/login");
  };

  return (
    <div className="addUser">
      <h3>Sign Up</h3>
      {error && <div className="alert alert-danger">{error}</div>}
      <form className="addUserForm" onSubmit={handleSignup}>
        <div className="inputGroup">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            autoComplete="off"
            placeholder="Enter your name"
          />
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            autoComplete="off"
            placeholder="Enter your Email"
          />
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            autoComplete="off"
            placeholder="Enter Password"
          />
          <label htmlFor="reenterPassword">Re-enter Password:</label>
          <input
            type="password"
            id="reenterPassword"
            name="reenterPassword"
            value={formData.reenterPassword}
            onChange={handleInputChange}
            autoComplete="off"
            placeholder="Re-enter Password"
          />
          <button type="submit" className="btn btn-success">
            Sign Up
          </button>
        </div>
      </form>
      <div className="login">
        <p>Already have an Account? </p>
        <Link to="/login" className="btn btn-primary">
          Login
        </Link>
      </div>
    </div>
  );
};

export default Signup;
