import React, { useState, useEffect } from "react";
import axios from "axios";

function Popup({ isOpen, onClose, onTestsSelected }) {
  const [availableTests, setAvailableTests] = useState([]);
  const [selectedTests, setSelectedTests] = useState([]);

  useEffect(() => {
    if (isOpen) {
      fetchAvailableTests();
    }
  }, [isOpen]);

  const fetchAvailableTests = async () => {
    try {
      const response = await axios.get("/api/available-tests");
      setAvailableTests(response.data);
    } catch (error) {
      console.error("Error fetching available tests:", error);
    }
  };

  const handleTestSelect = (id) => {
    setSelectedTests((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((testId) => testId !== id)
        : [...prevSelected, id]
    );
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post("/api/selected-tests", {
        testIds: selectedTests,
      });
      onTestsSelected(response.data);
      onClose();
    } catch (error) {
      console.error("Error submitting selected tests:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h2>Choose from the below available tests</h2>
        <div className="tests-list">
          {availableTests.map((test) => (
            <div
              key={test.id}
              className={`test-item ${
                selectedTests.includes(test.id) ? "selected" : ""
              }`}
              onClick={() => handleTestSelect(test.id)}
            >
              <div className="test-image"></div>
              <div className="test-info">
                <h3>{test.name}</h3>
                <p>{test.description}</p>
                <p className="test-price">{test.price}</p>
              </div>
              <input
                type="checkbox"
                checked={selectedTests.includes(test.id)}
                readOnly
              />
            </div>
          ))}
        </div>
        <button className="primary-button" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
}

export default Popup;
