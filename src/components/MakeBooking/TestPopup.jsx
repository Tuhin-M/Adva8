import React, { useState, useEffect } from "react";

const dummyTests = [
  {
    id: 1,
    name: "Blood Test",
    description: "Complete blood count",
    price: "$50",
  },
  { id: 2, name: "Urine Test", description: "Urinalysis", price: "$30" },
  { id: 3, name: "X-Ray", description: "Chest X-ray", price: "$100" },
  {
    id: 4,
    name: "MRI",
    description: "Magnetic Resonance Imaging",
    price: "$500",
  },
];

function Popup({ isOpen, onClose, onTestsSelected }) {
  const [availableTests, setAvailableTests] = useState([]);
  const [selectedTests, setSelectedTests] = useState([]);

  useEffect(() => {
    if (isOpen) {
      setAvailableTests(dummyTests);
    }
  }, [isOpen]);

  const handleTestSelect = (id) => {
    setSelectedTests((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((testId) => testId !== id)
        : [...prevSelected, id]
    );
  };

  const handleSubmit = () => {
    const selectedTestData = dummyTests.filter((test) =>
      selectedTests.includes(test.id)
    );
    onTestsSelected(selectedTestData);
    onClose();
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
