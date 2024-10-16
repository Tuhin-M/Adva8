import axios from "axios";
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
  const [testData, setTestData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchTests();
  }, []);
  console.log("Fetching Lab Tests");
  const fetchTests = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/lab/get");
      setTestData(response.data);
    } catch (error) {
      console.error("Error fetching lab tests:", error);
      setTestData([]);
    }
    console.log("Lab Test Data here", testData);
  };

  useEffect(() => {
    if (isOpen) {
      setAvailableTests(testData);
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
    const selectedTestData = testData.filter((test) =>
      selectedTests.includes(test._id)
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
              key={test._id}
              className={`test-item ${
                selectedTests.includes(test._id) ? "selected" : ""
              }`}
              onClick={() => handleTestSelect(test._id)}
            >
              <div className="test-image"></div>
              <div className="test-info">
                <h3>{test.labName}</h3>
                <p>{test.labAddress}</p>
                <p className="test-price">{test.price}</p>
              </div>
              <input
                type="checkbox"
                checked={selectedTests.includes(test._id)}
                readOnly
              />
            </div>
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <button className="primary-button" onClick={handleSubmit}>
            Submit
          </button>
          <button className="secondary-button" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default Popup;
