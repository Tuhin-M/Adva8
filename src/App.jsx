import "./App.css";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./Pages/Home/Home";
import SignUp from "./Pages/Signup/SignUp";
import SignUpOtp from "./Pages/Signup/SignUpOtp";
import Login from "./Pages/Login/Login";
import LoginOtp from "./Pages/Login/LoginOtp";
import Listing from "./Pages/Listing/Listing";
import About from "./Pages/About/About";
import Details from "./Pages/Details/Details";
import Dashboard from "./Pages/Lab-dashboard/Lab-dashboard";
import Bookings from "./Pages/Lab-dashboard/Bookings";
import OtpValidation from "./components/OtpValidation/OtpValidation";
import Labs from "./Pages/Labs-onboarding/Labs-onboarding";
import Blog from "./Pages/Blog/Blog";
import MakeBooking from "./Pages/MakeBooking/MakeBooking";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signupotp" element={<SignUpOtp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/loginotp" element={<LoginOtp />} />
        <Route path="/otp" element={<OtpValidation />} />
        <Route path="/labs" element={<Labs />} />
        <Route path="/listing" element={<Listing />} />
        <Route path="/about" element={<About />} />
        <Route path="/details" element={<Details />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/bookings" element={<Bookings />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/make-booking" element={<MakeBooking />} />
      </Routes>
    </>
  );
}

export default App;

// App.css
