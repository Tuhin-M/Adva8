import React, { useState, useEffect } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../../redux/user/userSlice";

const Login = () => {
  const [otp, setOtp] = useState(0);

  // Function to handle login
  // const handleLogin = () => {
  //   setOtp(1);
  // };
  //   const navigate = useNavigate();
  //   navigate("/otp")

  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);

  // const [error, setError] = useState(null);
  // const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

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

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // setLoading(true);
      dispatch(signInStart());
      const res = await fetch("http://localhost:3000/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        dispatch(signInFailure(data.message));
        // setLoading(false);
        // setError(data.message);
        return;
      }
      dispatch(signInSuccess(data));
      // setLoading(false);
      // setError(null);
      navigate("/");
    } catch (error) {
      // setLoading(false);
      // setError(error.message);
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h1>Log-in</h1>
        <p>Please login using account detail below.</p>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            style={{
              backgroundColor: "white",
              borderColor: "rgb(35, 187, 184)",
              borderWidth: "2px",
            }}
            placeholder="Email Address"
            id="email"
            onChange={handleChange}
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
            value="Sign In"
          />
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
