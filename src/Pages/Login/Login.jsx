import React, { useState, useNavigate } from "react";
import "./Login.css";

const Login = () => {
  const [otp, setOtp] = useState(0);

  // Function to handle login
  const handleLogin = () => {
    setOtp(1);
  };
  //   const navigate = useNavigate();
  //   navigate("/otp");
  return (
    <div className="auth-container">
      <div className="auth-form">
        <h1>Log-in</h1>
        <p>Please login using account detail below.</p>
        <form>
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
            onClick={(handleLogin) => navigate("/otp")}
            type="submit"
            style={{
              backgroundColor: "rgb(35, 187, 184)",
              borderColor: "skyblue",
              borderWidth: "2px",
              fontWeight: "bold",
            }}
          >
            Sign In
          </button>
        </form>
        <p>
          <a href="/loginotp">Login with OTP? Login</a>
        </p>
        <p>
          <a href="/signup">Don't have an account? Create Account</a>
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
        <a href="/" className="skip">
          Skip
        </a>
      </div>
    </div>
  );
};

export default Login;
