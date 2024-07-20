import React, { useState } from "react";

const tests = [
  { id: 1, name: "Test 1", description: "Lorem Ipsum", price: "$50" },
  { id: 2, name: "Test 2", description: "Lorem Ipsum", price: "$50" },
  { id: 3, name: "Test 3", description: "Lorem Ipsum", price: "$50" },
  { id: 4, name: "Test 4", description: "Lorem Ipsum", price: "$50" },
  { id: 5, name: "Test 5", description: "Lorem Ipsum", price: "$50" },
  // Add more tests as needed
];

function Popup({ isOpen, onClose }) {
  const [selectedTests, setSelectedTests] = useState([]);

  const handleTestSelect = (id) => {
    setSelectedTests((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((testId) => testId !== id)
        : [...prevSelected, id]
    );
  };

  const handleSubmit = () => {
    // Handle submit action
    console.log("Selected tests:", selectedTests);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h2>Choose from the below available tests</h2>
        <div className="tests-list">
          {tests.map((test) => (
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
