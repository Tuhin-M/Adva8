import React, { useState } from "react";
import "./PriceRange.css";

function PriceRange() {
  const [priceMin, setPriceMin] = useState(0);
  const [priceMax, setPriceMax] = useState(999999);

  const handlePriceChange = (event) => {
    const value = parseInt(event.target.value, 10);
    if (value >= 0) {
      setPriceMin(value);
    }
  };

  const handleApply = () => {
    // Handle filter application with the selected values
    console.log("Applied Filters:", {
      price: { min: priceMin, max: priceMax },
    });
  };

  return (
    <>
      <h6 className="sidebar-title">Price Range</h6>
      <div className="cantainer text-align-center">
        <div className="flex">
          <input
            type="range"
            min="0"
            max="999999"
            value={priceMin}
            onChange={handlePriceChange}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <br />
          <input
            type="number"
            min="0"
            value={priceMin}
            onChange={handlePriceChange}
            className="w-20 pl-2 pr-2 text-sm text-gray-700"
          />
        </div>
        <input
          type="number"
          min="0"
          value={priceMax}
          onChange={(event) => setPriceMax(parseInt(event.target.value, 10))}
          className="w-10 pl-2 pr-2 text-sm text-gray-700"
        />
      </div>
      <div className="container">
        <button onClick={handleApply} className="button">
          Apply
        </button>
      </div>
    </>
  );
}

export default PriceRange;
