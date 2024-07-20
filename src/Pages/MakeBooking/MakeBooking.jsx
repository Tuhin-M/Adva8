import React from "react";
import "./MakeBooking.css";
import UserDetails from "../../components/MakeBooking/UserDetails";
import MedicalReports from "../../components/MakeBooking/MedicalReports";
import TestSelection from "../../components/MakeBooking/TestSelection";
import BookingSummary from "../../components/MakeBooking/BookingSummary";

function MakeBooking() {
  return (
    <div className="MakeBooking">
      <UserDetails />
      <MedicalReports />
      <TestSelection />
      <BookingSummary />
    </div>
  );
}

export default MakeBooking;
