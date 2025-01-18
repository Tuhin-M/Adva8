import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../../components/OAuth";

const SignUp = () => {
  const [formData, setFormData] = useState({ role: 0 });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    console.log("change - ", e.target);
    setFormData(() => {
      if (e.target.id === "role") {
        const val = e.target.checked ? 1 : 0;
        return { ...formData, [e.target.id]: val };
      }
      return { ...formData, [e.target.id]: e.target.value };
    });
  };
  useEffect(() => {
    console.log("formdata - ", formData);
  }, [formData]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch("/api/auth/signup", {
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
        }}>Create Account</h1>
        <p style={{ margin: '15px 0', color: '#636e72', fontSize: '16px' }}>Please signup using account detail below.</p>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <input
            type="text"
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
            id="username"
            placeholder="Full Name"
            required
            onChange={handleChange}
          />
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
            id="email"
            placeholder="Email Address"
            required
            onChange={handleChange}
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
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '10px',
            justifyContent: 'center'
          }}>
            <input 
              type="checkbox" 
              id="role" 
              onChange={handleChange}
              style={{
                width: '16px',
                height: '16px',
                accentColor: '#00b894'
              }}
            />
            <p style={{ margin: '0', color: '#636e72' }}>Sign Up as Lab Owner</p>
          </div>

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
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>
        <p style={{ margin: '20px 0', color: '#636e72', fontSize: '15px' }}>
          <Link to="/login" style={{ 
            color: '#00b894', 
            textDecoration: 'none',
            fontWeight: '500',
            transition: 'color 0.3s ease',
            '&:hover': {
              color: '#00a884',
              textDecoration: 'underline'
            }
          }}>Already have an account? Login</Link>
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
          <OAuth />
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

export default SignUp;