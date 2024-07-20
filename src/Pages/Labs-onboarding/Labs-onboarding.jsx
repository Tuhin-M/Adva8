import React, { useState } from "react";
import "./Labs-onboarding.css";

function LabsOnboarding() {
  const [labDetails, setLabDetails] = useState({
    labName: "",
    labAddress: "",
    phoneNumber: "",
    email: "",
    website: "",
    operatingDays: [],
    availableTimeSlots: [],
    labImages: null,
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

  const [tests, setTests] = useState([
    { name: "Blood Test", description: "Complete blood count", price: "1300" },
    { name: "Urine Analysis", description: "Urinalysis test", price: "500" },
    { name: "X-Ray", description: "Chest X-ray", price: "1100" },
  ]);

  const [newTest, setNewTest] = useState({
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

  const handleInputChange = (e, setState, state) => {
    const { name, value } = e.target;
    setState({
      ...state,
      [name]: value,
    });
  };

  const handleCheckboxChange = (e, setState, state) => {
    const { name, value, checked } = e.target;
    setState((prevDetails) => {
      const newValues = checked
        ? [...prevDetails[name], value]
        : prevDetails[name].filter((val) => val !== value);
      return { ...prevDetails, [name]: newValues };
    });
  };

  const handleFileChange = (e) => {
    setLabDetails({ ...labDetails, labImages: e.target.files[0] });
  };

  const handleClickForDayChange = (day) => {
    setDays({
      ...days,
      [day]: !days[day],
    });
  };

  const handleClickForTimeChange = (slot) => {
    setTimeSlots({
      ...timeSlots,
      [slot]: !timeSlots[slot],
    });
  };

  const addTest = () => {
    setTests([...tests, newTest]);
    setNewTest({
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
  };
  const deleteTest = (index) => {
    setTests(tests.filter((_, i) => i !== index));
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      labDetails: {
        ...labDetails,
        operatingDays: Object.keys(days).filter((day) => days[day]),
        availableTimeSlots: Object.keys(timeSlots).filter(
          (slot) => timeSlots[slot]
        ),
        labImages: labDetails.labImages ? labDetails.labImages.name : null,
      },
      tests,
    };

    console.log("Payload:", payload);

    // Replace with your POST request logic
    fetch("https://your-api-endpoint.com/save-details", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="LabsOnboarding">
      <section className="lab-information">
        <h2>Lab Information</h2>
        <form>
          <div className="form-row">
            <div className="column">
              <label>Lab Name</label>
              <input
                type="text"
                name="labName"
                value={labDetails.labName}
                onChange={(e) =>
                  handleInputChange(e, setLabDetails, labDetails)
                }
                placeholder="Enter Lab Name"
              />
            </div>
            <div className="column">
              <label>Lab Address</label>
              <input
                type="text"
                name="labAddress"
                value={labDetails.labAddress}
                onChange={(e) =>
                  handleInputChange(e, setLabDetails, labDetails)
                }
                placeholder="Enter Lab Address"
              />
            </div>
          </div>
          <div className="form-row">
            <div className="column">
              <label>Phone Number</label>
              <input
                type="text"
                name="phoneNumber"
                value={labDetails.phoneNumber}
                onChange={(e) =>
                  handleInputChange(e, setLabDetails, labDetails)
                }
                placeholder="Enter Phone Number"
              />
            </div>
            <div className="column">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={labDetails.email}
                onChange={(e) =>
                  handleInputChange(e, setLabDetails, labDetails)
                }
                placeholder="Enter Email"
              />
            </div>
          </div>
          <div className="form-row">
            <div className="column">
              <label>Website</label>
              <input
                type="text"
                name="website"
                value={labDetails.website}
                onChange={(e) =>
                  handleInputChange(e, setLabDetails, labDetails)
                }
                placeholder="Enter Website URL"
              />
            </div>
            <div className="column">
              <label>Operating Days</label>
              <div className="date-container">
                {Object.keys(days).map((day) => {
                  return (
                    <div
                      type="checkbox"
                      key={day}
                      className={
                        "days " +
                        (days[day].toString() === "true" ? "active" : "")
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
            <div className="column">
              <label>Upload Lab Images</label>
              <input type="file" onChange={handleFileChange} />
              <p>Maximum file size: 1MB</p>
            </div>
            <div className="column">
              <label>Available Time Slots</label>
              <div className="time-slots-container">
                {Object.keys(timeSlots).map((slot) => {
                  return (
                    <div
                      type="checkbox"
                      key={slot}
                      className={
                        "timeSlots " +
                        (timeSlots[slot].toString() === "true" ? "active" : "")
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
        </form>
      </section>

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
                onChange={(e) => handleInputChange(e, setNewTest, newTest)}
                placeholder="Enter Test Name"
              />
            </div>
            <div className="column">
              <label>Test Description</label>
              <input
                type="text"
                name="description"
                value={newTest.description}
                onChange={(e) => handleInputChange(e, setNewTest, newTest)}
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
                onChange={(e) => handleInputChange(e, setNewTest, newTest)}
                placeholder="Enter Sample Name"
              />
            </div>
            <div className="column">
              <label>Sample Type</label>
              <input
                type="text"
                name="sampleType"
                value={newTest.sampleType}
                onChange={(e) => handleInputChange(e, setNewTest, newTest)}
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
                onChange={(e) => handleInputChange(e, setNewTest, newTest)}
                placeholder="Enter Vial Name"
              />
            </div>
            <div className="column">
              <label>Preparation Time</label>
              <input
                type="text"
                name="preparationTime"
                value={newTest.preparationTime}
                onChange={(e) => handleInputChange(e, setNewTest, newTest)}
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
                onChange={(e) => handleInputChange(e, setNewTest, newTest)}
                placeholder="Enter Test Price"
              />
            </div>
            <div className="column">
              <label>Sample Collection</label>
              <div className="sample-collection-container">
                {["Home", "At Lab"].map((sample) => {
                  return (
                    <div
                      key={sample}
                      className={
                        "sampleCollection " +
                        (newTest.sampleCollection.includes(sample)
                          ? "active"
                          : "")
                      }
                      onClick={() =>
                        handleCheckboxChange(
                          {
                            target: {
                              name: "sampleCollection",
                              value: sample,
                              checked:
                                !newTest.sampleCollection.includes(sample),
                            },
                          },
                          setNewTest,
                          newTest
                        )
                      }
                    >
                      {sample}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="form-row">
            <div className="column">
              <label>Availability</label>
              <div className="date-container">
                {Object.keys(days).map((day) => {
                  return (
                    <div
                      key={day}
                      className={
                        "daysAvailability " +
                        (newTest.availability.includes(day) ? "active" : "")
                      }
                      onClick={() =>
                        handleCheckboxChange(
                          {
                            target: {
                              name: "availability",
                              value: day,
                              checked: !newTest.availability.includes(day),
                            },
                          },
                          setNewTest,
                          newTest
                        )
                      }
                    >
                      {day}
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="column">
              <label>Additional features</label>
              <div className="additional-features-container">
                {["Express Service", "Online Reports"].map((feature) => {
                  return (
                    <div
                      key={feature}
                      className={
                        "features " +
                        (newTest.features.includes(feature) ? "active" : "")
                      }
                      onClick={() =>
                        handleCheckboxChange(
                          {
                            target: {
                              name: "features",
                              value: feature,
                              checked: !newTest.features.includes(feature),
                            },
                          },
                          setNewTest,
                          newTest
                        )
                      }
                    >
                      {feature}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="form-row">
            <div className="column">
              <label>Available Time Slots</label>
              <div className="time-slots-container">
                {Object.keys(timeSlots).map((slot) => {
                  return (
                    <div
                      key={slot}
                      className={
                        "timeSlots " +
                        (newTest.availableTimeSlots.includes(slot)
                          ? "active"
                          : "")
                      }
                      onClick={() =>
                        handleCheckboxChange(
                          {
                            target: {
                              name: "availableTimeSlots",
                              value: slot,
                              checked:
                                !newTest.availableTimeSlots.includes(slot),
                            },
                          },
                          setNewTest,
                          newTest
                        )
                      }
                    >
                      {slot}
                    </div>
                  );
                })}
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
          {tests.map((test, index) => (
            <div className="test-card" key={index}>
              <div className="delete-button" onClick={() => deleteTest(index)}>
                &#10005;
              </div>
              <h3>{test.name}</h3>
              <p>{test.description}</p>
              <p>{test.price}</p>
            </div>
          ))}
        </div>
      </section>
      <center>
        <button type="submit" className="submit-button" onClick={handleSubmit}>
          Save Details
        </button>
      </center>
    </div>
  );
}

export default LabsOnboarding;
