import React, { useState } from "react";
import "./distance.css";

function FilterForm() {
  const [distanceMin, setDistanceMin] = useState(0);
  const [distanceMax, setDistanceMax] = useState(100);
  // const [priceMin, setPriceMin] = useState(0);
  // const [priceMax, setPriceMax] = useState(999999);

  const handleDistanceChange = (event) => {
    const value = parseInt(event.target.value, 10);
    if (value >= 0 && value <= 100) {
      setDistanceMin(value);
    }
  };

  // const handlePriceChange = (event) => {
  //   const value = parseInt(event.target.value, 10);
  //   if (value >= 0) {
  //     setPriceMin(value);
  //   }
  // };

  const handleApply = () => {
    // Handle filter application with the selected values
    console.log("Applied Filters:", {
      distance: { min: distanceMin, max: distanceMax },
      price: { min: priceMin, max: priceMax },
    });
  };

  return (
    <>
      <div>
        <h6 className="sidebar-title">Distance Range</h6>
        <div className="flex">
          <input
            type="range"
            min="0"
            max="100"
            value={distanceMin}
            onChange={handleDistanceChange}
            className=" h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
        </div>

        <input
          type="number"
          min="0"
          max="100"
          value={distanceMin}
          onChange={handleDistanceChange}
          className="w-20 pl-2 pr-2 text-sm text-black-700"
        />

        <input
          type="number"
          min="0"
          max="100"
          value={distanceMax}
          onChange={(event) => setDistanceMax(parseInt(event.target.value, 10))}
          className="w-20 pl-2 pr-2 text-sm text-black-700"
        />
      </div>
      <div className="container">
        <button onClick={handleApply} className="button">
          Apply
        </button>
      </div>

      {/* <div className="mb-4">
        <h3 className="text-lg font-bold mb-2">Price Range</h3>
        <div className="flex items-center mb-2">
          <input
            type="range"
            min="0"
            max="999999"
            value={priceMin}
            onChange={handlePriceChange}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
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
          className="w-20 pl-2 pr-2 text-sm text-gray-700"
        />
      </div> */}
      {/* <button
        onClick={handleApply}
        className="bg-orange-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Apply
      </button> */}
    </>
  );
}

export default FilterForm;
