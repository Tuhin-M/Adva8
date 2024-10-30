import React, { useState, useEffect } from "react";
import "./TestOffered.css";

function TestOffered(props) {
  const [productList, setProductList] = useState([]);
  const [isNewLab, setIsNewLab] = useState(true);

  useEffect(() => {
    fetchSavedTests();
  }, []);

  const fetchSavedTests = () => {
    fetch(`/api/product/get/${props.labId}`)
      .then((response) => response.json())
      .then((data) => {
        if (
          data &&
          Array.isArray(data) &&
          data.length > 0 &&
          data.some(
            (item) => item.productList && Array.isArray(item.productList)
          )
        ) {
          const allProducts = data.flatMap((item) => item.productList || []);
          setProductList(allProducts);
          setIsNewLab(false);
        } else {
          console.error("Invalid data format received:", data);
          setProductList([]);
          setIsNewLab(true);
        }
      })
      .catch((error) => {
        console.error("Error fetching saved tests:", error);
        setProductList([]);
        setIsNewLab(true);
      });
  };

  const [newTest, setNewTest] = useState({
    testId: "",
    name: "",
    description: "",
    sampleName: "",
    sampleType: "",
    vialName: "",
    preparationTime: "",
    price: "",
    sampleCollection: [],
    availability: [],
    features: [],
    availableTimeSlots: [],
  });

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTest({
      ...newTest,
      [name]: value,
    });
  };

  const handleCheckboxChange = (e) => {
    const { name, value, checked } = e.target;
    setNewTest((prevDetails) => {
      const newValues = checked
        ? [...prevDetails[name], value]
        : prevDetails[name].filter((val) => val !== value);
      return { ...prevDetails, [name]: newValues };
    });
  };

  const generateTestId = () => {
    return "test_" + Math.random().toString(36).substr(2, 9);
  };

  const addTest = () => {
    const testWithId = { ...newTest, testId: generateTestId() };
    setProductList([...productList, testWithId]);
  };

  const deleteTest = (index) => {
    setProductList(productList.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      labRef: props.labId,
      productList,
    };

    console.log("Payload:", payload);

    const apiEndpoint = isNewLab
      ? `/api/product/create`
      : `/api/product/update/${props.labId}`;

    fetch(apiEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        alert("Test added successfully");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <>
      <div className="TestOffered">
        <section className="tests-offered">
          <h2>Tests Offered</h2>
          <form>
            <div className="form-row">
              <div className="column">
                <label>Test Name</label>
                <input
                  type="text"
                  name="name"
                  value={newTest.name}
                  onChange={handleInputChange}
                  placeholder="Enter Test Name"
                />
              </div>
              <div className="column">
                <label>Test Description</label>
                <input
                  type="text"
                  name="description"
                  value={newTest.description}
                  onChange={handleInputChange}
                  placeholder="Enter Test Description"
                />
              </div>
            </div>
            <div className="form-row">
              <div className="column">
                <label>Sample Name</label>
                <input
                  type="text"
                  name="sampleName"
                  value={newTest.sampleName}
                  onChange={handleInputChange}
                  placeholder="Enter Sample Name"
                />
              </div>
              <div className="column">
                <label>Sample Type</label>
                <input
                  type="text"
                  name="sampleType"
                  value={newTest.sampleType}
                  onChange={handleInputChange}
                  placeholder="Choose Sample Type"
                />
              </div>
            </div>
            <div className="form-row">
              <div className="column">
                <label>Vial Name</label>
                <input
                  type="text"
                  name="vialName"
                  value={newTest.vialName}
                  onChange={handleInputChange}
                  placeholder="Enter Vial Name"
                />
              </div>
              <div className="column">
                <label>Preparation Time</label>
                <input
                  type="text"
                  name="preparationTime"
                  value={newTest.preparationTime}
                  onChange={handleInputChange}
                  placeholder="Enter Preparation Time"
                />
              </div>
            </div>
            <div className="form-row">
              <div className="column">
                <label>Pricing</label>
                <input
                  type="text"
                  name="price"
                  value={newTest.price}
                  onChange={handleInputChange}
                  placeholder="Enter Test Price"
                />
              </div>
              <div className="column">
                <label>Sample Collection</label>
                <div className="sample-collection-container">
                  {["Home", "At Lab"].map((sample) => (
                    <div
                      key={sample}
                      className={`sampleCollection ${
                        newTest.sampleCollection.includes(sample)
                          ? "active"
                          : ""
                      }`}
                      onClick={() =>
                        handleCheckboxChange({
                          target: {
                            name: "sampleCollection",
                            value: sample,
                            checked: !newTest.sampleCollection.includes(sample),
                          },
                        })
                      }
                    >
                      {sample}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="form-row">
              <div className="column">
                <label>Availability</label>
                <div className="date-container">
                  {Object.keys(days).map((day) => (
                    <div
                      key={day}
                      className={`daysAvailability ${
                        newTest.availability.includes(day) ? "active" : ""
                      }`}
                      onClick={() =>
                        handleCheckboxChange({
                          target: {
                            name: "availability",
                            value: day,
                            checked: !newTest.availability.includes(day),
                          },
                        })
                      }
                    >
                      {day}
                    </div>
                  ))}
                </div>
              </div>
              <div className="column">
                <label>Additional features</label>
                <div className="additional-features-container">
                  {["Express Service", "Online Reports"].map((feature) => (
                    <div
                      key={feature}
                      className={`features ${
                        newTest.features.includes(feature) ? "active" : ""
                      }`}
                      onClick={() =>
                        handleCheckboxChange({
                          target: {
                            name: "features",
                            value: feature,
                            checked: !newTest.features.includes(feature),
                          },
                        })
                      }
                    >
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="form-row">
              <div className="column">
                <label>Available Time Slots</label>
                <div className="time-slots-container">
                  {Object.keys(timeSlots).map((slot) => (
                    <div
                      key={slot}
                      className={`timeSlots ${
                        newTest.availableTimeSlots.includes(slot)
                          ? "active"
                          : ""
                      }`}
                      onClick={() =>
                        handleCheckboxChange({
                          target: {
                            name: "availableTimeSlots",
                            value: slot,
                            checked: !newTest.availableTimeSlots.includes(slot),
                          },
                        })
                      }
                    >
                      {slot}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <center>
              <button type="button" className="submit-button" onClick={addTest}>
                Add Test
              </button>
            </center>
          </form>
        </section>

        <section className="saved-tests">
          <h2>Saved Tests</h2>
          <div className="test-cards">
            {productList.map((test, index) => (
              <div className="test-card" key={index}>
                <div
                  className="delete-button"
                  onClick={() => deleteTest(index)}
                >
                  ✕
                </div>
                <h3>{test.name || "N/A"}</h3>
                <p>{test.description || "N/A"}</p>
                <p>{test.price || "N/A"}</p>
              </div>
            ))}
          </div>
        </section>
        <center>
          <button
            type="submit"
            className="submit-button"
            onClick={handleSubmit}
          >
            Save Details
          </button>
        </center>
      </div>
    </>
  );
}

export default TestOffered;
