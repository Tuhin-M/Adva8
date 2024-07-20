import React from "react";
import "./signup.css";

const SignUp = () => {
  return (
    <div className="auth-container">
      <div className="auth-form">
        <h1>Signup</h1>
        <p>Please login using account detail below.</p>
        <form>
          <input
            type="text"
            style={{
              backgroundColor: "white",
              borderColor: "rgb(35, 187, 184)",
              borderWidth: "2px",
            }}
            placeholder="Full Name"
            required
          />
          <input
            type="text"
            style={{
              backgroundColor: "white",
              borderColor: "rgb(35, 187, 184)",
              borderWidth: "2px",
            }}
            placeholder="Email Address"
            required
          />
          <input
            type="password"
            style={{
              backgroundColor: "white",
              borderColor: "rgb(35, 187, 184)",
              borderWidth: "2px",
            }}
            placeholder="Password"
            required
          />
          <button
            type="submit"
            style={{
              backgroundColor: "rgb(35, 187, 184)",
              borderColor: "skyblue",
              borderWidth: "2px",
              fontWeight: "bold",
            }}
          >
            Sign Up
          </button>
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
