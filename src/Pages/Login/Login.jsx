import React, { useState, useEffect } from "react";
//import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../../redux/user/userSlice";

const Login = () => {
  const [otp, setOtp] = useState(0);

  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);

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
      dispatch(signInStart());
      const res = await fetch("/api/auth/signin", {
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
        alert(data.message);
        return;
      }
      dispatch(signInSuccess(data));
      localStorage.setItem("userRole", data.role);
      navigate("/");
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div style={{ 
      display: 'flex', 
      width: '100vw', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh', 
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      overflow: 'hidden'
    }}>
      <div style={{ 
        background: 'rgba(255, 255, 255, 0.95)', 
        marginTop:'10vh',
        padding: '40px', 
        borderRadius: '20px', 
        boxShadow: '0 10px 25px rgba(0,0,0,0.1)', 
        textAlign: 'center', 
        width: '400px',
        height: '100%',
        backdropFilter: 'blur(10px)',
        animation: 'slideIn 0.6s ease-out',
        '@keyframes slideIn': {
          from: {
            opacity: 0,
            transform: 'translateY(30px)'
          },
          to: {
            opacity: 1,
            transform: 'translateY(0)'
          }
        },
        '&:hover': {
          transform: 'translateY(-5px)',
          boxShadow: '0 15px 30px rgba(0,0,0,0.15)',
          transition: 'all 0.3s ease'
        }
      }}>
        <h1 style={{ 
          fontFamily: "'Poppins', sans-serif", 
          marginBottom: '20px', 
          fontSize: '32px', 
          fontWeight: '600', 
          color: '#2d3436',
          letterSpacing: '-0.5px',
          animation: 'fadeIn 0.8s ease-out',
          '@keyframes fadeIn': {
            from: { opacity: 0 },
            to: { opacity: 1 }
          }
        }}>Welcome Back</h1>
        <p style={{ margin: '15px 0', color: '#636e72', fontSize: '16px' }}>Please login using account detail below.</p>
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <input
            type="email"
            style={{
              padding: '12px 15px',
              border: '2px solid #00b894',
              borderRadius: '12px',
              backgroundColor: '#f8f9fa',
              fontSize: '14px',
              transition: 'all 0.3s ease',
              outline: 'none',
              '&:focus': {
                borderColor: '#00b894',
                boxShadow: '0 0 0 4px rgba(0,184,148,0.1)'
              },
              '&:hover': {
                borderColor: '#00b894'
              }
            }}
            placeholder="Email Address"
            id="email"
            onChange={handleChange}
            required
          />
          <input
            type="password"
            style={{
              padding: '12px 15px',
              border: '2px solid #00b894',
              borderRadius: '12px',
              backgroundColor: '#f8f9fa',
              fontSize: '14px',
              transition: 'all 0.3s ease',
              outline: 'none',
              '&:focus': {
                borderColor: '#00b894',
                boxShadow: '0 0 0 4px rgba(0,184,148,0.1)'
              },
              '&:hover': {
                borderColor: '#00b894'
              }
            }}
            placeholder="Password"
            id="password"
            onChange={handleChange}
            required
          />
          <button
            type="submit"
            style={{
              backgroundColor: '#00b894',
              color: '#fff',
              padding: '12px',
              border: 'none',
              borderRadius: '12px',
              fontWeight: '600',
              fontSize: '16px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              '&:hover': {
                backgroundColor: '#00a884',
                transform: 'translateY(-2px)',
                boxShadow: '0 5px 15px rgba(0,184,148,0.2)'
              },
              '&:active': {
                transform: 'translateY(0)'
              }
            }}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
        <p style={{ margin: '20px 0', color: '#636e72', fontSize: '15px' }}>
          <Link to="/signup" style={{ 
            color: '#00b894', 
            textDecoration: 'none',
            fontWeight: '500',
            transition: 'color 0.3s ease',
            '&:hover': {
              color: '#00a884',
              textDecoration: 'underline'
            }
          }}>Don't have an account? Create Account</Link>
        </p>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '15px',
          margin: '25px 0',
          justifyContent: 'center'
        }}>
          <div style={{ height: '1px', flex: 1, background: 'linear-gradient(to right, transparent, #e0e0e0, transparent)' }}></div>
          <p style={{ color: '#636e72', margin: '0' }}>Or</p>
          <div style={{ height: '1px', flex: 1, background: 'linear-gradient(to right, transparent, #e0e0e0, transparent)' }}></div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
          <button style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '12px 25px',
            border: '2px solid #e0e0e0',
            borderRadius: '12px',
            backgroundColor: 'white',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            '&:hover': {
              backgroundColor: '#f8f9fa',
              borderColor: '#00b894',
              transform: 'translateY(-2px)',
              boxShadow: '0 5px 15px rgba(0,0,0,0.1)'
            },
            '&:active': {
              transform: 'translateY(0)'
            }
          }}>
            <img
              style={{ width: "24px", height: "24px" }}
              src="https://img.icons8.com/color/48/000000/google-logo.png"
              alt="Google"
            />
            <span style={{ color: '#2d3436', fontWeight: '500' }}>Continue with Google</span>
          </button>
        </div>
        <Link to="/" style={{ 
          display: 'block', 
          marginTop: '20px', 
          color: '#636e72', 
          textDecoration: 'none',
          fontSize: '14px',
          transition: 'color 0.3s ease',
          '&:hover': {
            color: '#2d3436',
            textDecoration: 'underline'
          }
        }}>
          Skip for now
        </Link>
      </div>
    </div>
  );
};

export default Login;