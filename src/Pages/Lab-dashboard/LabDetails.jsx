import React, { useState } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const LabDetails = () => {
  const [productList, setProductList] = useState([
    {
      name: "Blood Test",
      description: "Complete blood count",
      price: "1300",
    },
    {
      name: "Urine Analysis",
      description: "Urinalysis test",
      price: "500",
    },
    {
      name: "X-Ray",
      description: "Chest X-ray",
      price: "1100",
    },
  ]);

  const [newTest, setNewTest] = useState({
    name: "",
    description: "",
    price: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTest({
      ...newTest,
      [name]: value,
    });
  };

  const addTest = () => {
    setProductList([...productList, newTest]);
    setNewTest({
      name: "",
      description: "",
      price: "",
    });
  };

  const deleteTest = (index) => {
    setProductList(productList.filter((_, i) => i !== index));
  };

  return (
    <div className="lab-details">
      <h2>Lab Details</h2>
      <h3>Tests Offered</h3>
      <div className="test-cards">
        {productList.map((test, index) => (
          <div className="test-card" key={index}>
            <div className="delete-button" onClick={() => deleteTest(index)}>
              &#10005;
            </div>
            <h4>{test.name}</h4>
            <p>{test.description}</p>
            <p>Price: {test.price}</p>
          </div>
        ))}
      </div>
      <h3>Add New Test</h3>
      <form>
        <div className="form-row">
          <label>Test Name</label>
          <input
            type="text"
            name="name"
            value={newTest.name}
            onChange={handleInputChange}
            placeholder="Enter Test Name"
          />
        </div>
        <div className="form-row">
          <label>Test Description</label>
          <input
            type="text"
            name="description"
            value={newTest.description}
            onChange={handleInputChange}
            placeholder="Enter Test Description"
          />
        </div>
        <div className="form-row">
          <label>Test Price</label>
          <input
            type="text"
            name="price"
            value={newTest.price}
            onChange={handleInputChange}
            placeholder="Enter Test Price"
          />
        </div>
        <button type="button" onClick={addTest}>
          Add Test
        </button>
      </form>
    </div>
  );
};

export default LabDetails;
