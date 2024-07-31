import React, { useState, useEffect } from "react";
import Popup from "./TestPopup";
import axios from "axios";
function TestSelection() {
  const [selectedTests, setSelectedTests] = useState([]);
  const [days, setDays] = useState({
    Monday: false,
    Tuesday: false,
    Wednesday: false,
    Thursday: false,
    Friday: false,
    Saturday: false,
    Sunday: false,
  });
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
  const [isPopupOpen, setPopupOpen] = useState(false);

  useEffect(() => {
    fetchSelectedTests();
  }, []);

  const fetchSelectedTests = async () => {
    try {
      const response = await axios.get("/api/selected-tests");
      setSelectedTests(response.data);
    } catch (error) {
      console.error("Error fetching selected tests:", error);
      // Initialize with an empty array if the API call fails
      setSelectedTests([]);
    }
  };

  const deleteTest = async (testId) => {
    try {
      await axios.delete(`/api/selected-tests/${testId}`);
      setSelectedTests(selectedTests.filter((test) => test.id !== testId));
    } catch (error) {
      console.error("Error deleting test:", error);
    }
  };

  const handleClickForDayChange = (day) => {
    setDays((prevDays) => ({
      ...prevDays,
      [day]: !prevDays[day],
    }));
  };

  const handleClickForTimeChange = (slot) => {
    setTimeSlots((prevTimeSlots) => ({
      ...prevTimeSlots,
      [slot]: !prevTimeSlots[slot],
    }));
  };
  return (
    <div className="section">
      <h2>Test Selection</h2>
      <div className="test-popup">
        <button className="primary-button" onClick={() => setPopupOpen(true)}>
          Add Test
        </button>
        <Popup
          isOpen={isPopupOpen}
          onClose={() => setPopupOpen(false)}
          onTestsSelected={(newTests) =>
            setSelectedTests((prevTests) => [...prevTests, ...newTests])
          }
        />
      </div>
      <div className="test-cards">
        {Array.isArray(selectedTests) &&
          selectedTests.map((test) => (
            <div className="test-card" key={test.id}>
              <div
                className="delete-button"
                onClick={() => deleteTest(test.id)}
              >
                &#10005;
              </div>
              <h3>{test.name}</h3>
              <p>{test.description}</p>
              <p>{test.price}</p>
            </div>
          ))}
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

  // return (
  //   <div className="section test-selection">
  //     <h2>Test Selection</h2>
  //     <p>Choose tests for your appointment</p>
  //     <button className="add-test-button">Add Test</button>
  //     <div className="test-cards">
  //       <div className="test-card">
  //         <h3>Blood Test</h3>
  //         <p>Complete blood count</p>
  //         <p>$30</p>
  //       </div>
  //       <div className="test-card">
  //         <h3>Urine Analysis</h3>
  //         <p>Urinalysis test</p>
  //         <p>$30</p>
  //       </div>
  //       <div className="test-card">
  //         <h3>X-Ray</h3>
  //         <p>Chest X-ray</p>
  //         <p>$50</p>
  //       </div>
  //     </div>
  //     <div className="availability">
  //       <h3>Availability</h3>
  //       <div className="days">
  //         <span>Monday</span>
  //         <span>Tuesday</span>
  //         <span>Wednesday</span>
  //         <span>Thursday</span>
  //         <span>Friday</span>
  //         <span>Saturday</span>
  //       </div>
  //     </div>
  //     <div className="time-slots">
  //       <h3>Available Time slots</h3>
  //       <div className="slots">
  //         <span>9AM - 10AM</span>
  //         <span>10AM - 11AM</span>
  //         <span>11AM - 12PM</span>
  //         <span>12PM - 1PM</span>
  //         <span>1PM - 2PM</span>
  //         <span>2PM - 3PM</span>
  //         <span>3PM - 4PM</span>
  //         <span>4PM - 5PM</span>
  //         <span>5PM - 6PM</span>
  //         <span>6PM - 7PM</span>
  //       </div>
  //     </div>
  //     <div className="additional-features">
  //       <h3>Additional Features</h3>
  //       <div className="checkbox-group">
  //         <input type="checkbox" id="express" />
  //         <label htmlFor="express">Express Service</label>
  //         <input type="checkbox" id="online-reports" />
  //         <label htmlFor="online-reports">Online Reports</label>
  //       </div>
  //     </div>
  //   </div>
  // );
}

export default TestSelection;
