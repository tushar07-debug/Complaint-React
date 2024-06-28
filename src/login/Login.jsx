import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./login.css";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const { email, password } = formData;

    if (!email || !password) {
      setError("Please fill in all details");
      return;
    }

    // Add your authentication logic here

    // For now, we assume the login is successful and navigate to the ComplaintLogger page
    navigate("/complaint-logger");
  };

  return (
    <div className="addUser">
      <h3>Log in</h3>
      {error && <div className="alert alert-danger">{error}</div>}
      <form className="addUserForm" onSubmit={handleFormSubmit}>
        <div className="inputGroup">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            autoComplete="off"
            placeholder="Enter your Email"
            value={formData.email}
            onChange={handleInputChange}
          />
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            autoComplete="off"
            placeholder="Enter your Password"
            value={formData.password}
            onChange={handleInputChange}
          />
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </div>
      </form>
      <div className="login">
        <p>Don't have an Account? </p>
        <Link to="/signup" className="btn btn-success">
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default Login;
