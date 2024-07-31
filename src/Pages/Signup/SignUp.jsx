import React, { useState, useEffect } from "react";
// import appleimage from "../../assets/apple-logo.png";
import "./signup.css"; // Create a separate CSS file for styling
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    console.log("change - ", e.target);
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  useEffect(() => {
    console.log("formdata - ", formData);
  }, [formData]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch("http://localhost:3000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        setLoading(false);
        setError(data.message);
        return;
      }
      setLoading(false);
      setError(null);
      navigate("/login");
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h1>Signup</h1>
        <p>Please login using account detail below.</p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            style={{
              backgroundColor: "white",
              borderColor: "rgb(35, 187, 184)",
              borderWidth: "2px",
            }}
            id="username"
            placeholder="Full Name"
            required
            onChange={handleChange}
          />
          <input
            type="email"
            style={{
              backgroundColor: "white",
              borderColor: "rgb(35, 187, 184)",
              borderWidth: "2px",
            }}
            id="email"
            placeholder="Email Address"
            required
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="password"
            className="border p-3 rounded-lg"
            id="password"
            onChange={handleChange}
            required
          />
          <input
            type="submit"
            style={{
              backgroundColor: "rgb(35, 187, 184)",
              borderColor: "skyblue",
              borderWidth: "2px",
              fontWeight: "bold",
            }}
            value="Sign Up"
          />
        </form>
        <p>
          <a href="/signupotp">SignUp with Mobile number? Sign Up</a>
        </p>
        <p>
          <a href="/login">Already have an account? Login</a>
        </p>
        <p>Or Login with</p>
        <div className="social-login">
          <a href="#" className="google">
            <img
              style={{ width: "30px", height: "30px" }}
              src="https://img.icons8.com/color/48/000000/google-logo.png"
              alt=""
            />
          </a>
          {/* <a href="#" className="facebook">
            <img
              style={{ width: "30px", height: "30px" }}
              src="https://img.icons8.com/color/48/000000/facebook-new.png"
              alt=""
            />
          </a>
          <a href="#" className="twitter">
            <img
              style={{ width: "30px", height: "30px" }}
              src="https://img.icons8.com/color/48/000000/twitter.png"
              alt=""
            />
          </a> */}
        </div>
        <a href="#" className="skip">
          Skip
        </a>
      </div>
    </div>
  );
};

export default SignUp;
