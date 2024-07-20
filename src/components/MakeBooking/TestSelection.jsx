import React, { useState } from "react";
import Popup from "./TestPopup";
function TestSelection() {
  const [days, setDays] = useState({
    Monday: false,
    Tuesday: false,
    Wednesday: false,
    Thursday: false,
    Friday: false,
    Saturday: false,
    Sunday: false,
  });
  const handleClickForDayChange = (day) => {
    setDays({
      ...days,
      [day]: !days[day],
    });
  };
  const [timeSlots, setTimeSlots] = useState({
    "9AM - 10AM": false,
    "10AM - 11AM": false,
    "11AM - 12PM": false,
    "12PM - 1PM": false,
    "1PM - 2PM": false,
    "2PM - 3PM": false,
    "3PM - 4PM": false,
    "4PM - 5PM": false,
    "5PM - 6PM": false,
    "6PM - 7PM": false,
  });
  const handleClickForTimeChange = (slot) => {
    setTimeSlots({
      ...timeSlots,
      [slot]: !timeSlots[slot],
    });
  };
  const [isPopupOpen, setPopupOpen] = useState(false);
  return (
    <div className="section">
      <h2>Test Selection</h2>
      {/* <button type="button" className="primary-button">
        Add Test
      </button> */}
      <div className="test-popup">
        <button className="primary-button" onClick={() => setPopupOpen(true)}>
          Add Test
        </button>
        <Popup isOpen={isPopupOpen} onClose={() => setPopupOpen(false)} />
      </div>
      <div className="test-cards">
        <div className="test-card">
          <h3>Blood Test</h3>
          <p>Complete blood count</p>
          <p>$30</p>
        </div>
        <div className="test-card">
          <h3>Urine Analysis</h3>
          <p>Urinalysis test</p>
          <p>$30</p>
        </div>
        <div className="test-card">
          <h3>X-Ray</h3>
          <p>Chest X-ray</p>
          <p>$50</p>
        </div>
      </div>
      <form>
        <div className="form-row">
          <div className="form-group">
            <label>Availability</label>
            <div className="date-container">
              {Object.keys(days).map((day) => {
                return (
                  <div
                    type="checkbox"
                    key={day}
                    className={
                      "days " + (days[day].toString() == "true" ? "active" : "")
                    }
                    onClick={() => handleClickForDayChange(day)}
                  >
                    {day}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Available Time slots</label>
            <div className="time-slots-container">
              {Object.keys(timeSlots).map((slot) => {
                return (
                  <div
                    type="checkbox"
                    key={slot}
                    className={
                      "timeSlots " +
                      (timeSlots[slot].toString() == "true" ? "active" : "")
                    }
                    onClick={() => handleClickForTimeChange(slot)}
                  >
                    {slot}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Additional Features</label>
            <div className="checkbox-group">
              <input type="checkbox" id="express" />
              <label htmlFor="express">Express Service</label>
              <input type="checkbox" id="online-reports" />
              <label htmlFor="online-reports">Online Reports</label>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default TestSelection;
