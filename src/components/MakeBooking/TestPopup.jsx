import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function Popup({ isOpen, onClose, onTestsSelected }) {
  const [availableTests, setAvailableTests] = useState([]);
  const [selectedTest, setSelectedTest] = useState(null);
  const [testData, setTestData] = useState([]);
  const [loading, setLoading] = useState(false);
  const params = useParams();

  const fetchTests = async () => {
    setLoading(true);
    console.log("Fetching Lab Tests", params);
    try {
      const response = await axios.get(`/api/product/get/${params?.listingId}`);
      setTestData(response.data[0].productList);
      setAvailableTests(response.data[0].productList);
      setLoading(false);
      console.log("Lab Tests:", response.data[0].productList);
    } catch (error) {
      console.error("Error fetching lab tests:", error);
      setTestData([]);
      setAvailableTests([]);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchTests();
    }
  }, [isOpen, params?.listingId]);

  const handleTestSelect = (test) => {
    setSelectedTest(test);
  };

  const handleSubmit = () => {
    onTestsSelected(selectedTest ? [selectedTest] : []);
    onClose();
  };

  if (!isOpen) return null;

  if (loading) {
    return (
      <div className="popup-overlay">
        <div className="popup-content">
          <h2>Loading...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h2>Choose from the below available tests</h2>
        <div className="tests-list">
          {availableTests && availableTests.length > 0 ? (
            availableTests.map((test, index) => (
              <div
                key={index}
                className={`test-item ${
                  selectedTest === test ? "selected" : ""
                }`}
                onClick={() => handleTestSelect(test)}
              >
                <div className="test-image"></div>
                <div className="test-info">
                  <h3>{test.name}</h3>
                  <p>{test.description}</p>
                  <p className="test-price">₹{test.price}</p>
                </div>
                <input
                  type="radio"
                  checked={selectedTest === test}
                  onChange={() => handleTestSelect(test)}
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
            ))
          ) : (
            <p>No tests available</p>
          )}
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
