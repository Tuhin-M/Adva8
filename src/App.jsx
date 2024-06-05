import "./App.css";
import { Route, Routes } from 'react-router-dom'
import Home from "./Pages/Home/Home";
import SignUp from "./Pages/Signup/SignUp";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/signup" element={<SignUp/>} />
        {/* <Route path="/login" element={<Appointments />} /> */}
      </Routes>
    </>
  );
}

export default App;

// App.css
