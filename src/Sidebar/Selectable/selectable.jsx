import React, { useState } from 'react';
import './Selectable.css';

function Selectable() {
  const [selectedOption, setSelectedOption] = useState(1);
 

  const handleOptionChange = (event) => {
    setSelectedOption(parseInt(event.target.value));
   };

 

  return (
    <div>
     <h6 className="sidebar-title">Selectable</h6>
      <div>
      <label > 
          <input
            type="radio"
            value="1"
            checked={selectedOption === 1}
            onChange={handleOptionChange}
          />
          Selectable 1
          </label>
      </div>
      <div>
        <label>
          <input
            type="radio"
            value="2"
            checked={selectedOption === 2}
            onChange={handleOptionChange}
          />
          Selectable 2
        </label>
      </div>
      <div>
        <label>
          <input
            type="radio"
            value="3"
            checked={selectedOption === 3}
            onChange={handleOptionChange}
          />
          Selectable 3
        </label>
      </div>
      <div>
        <label>
          <input
            type="radio"
            value="4"
            checked={selectedOption === 4}
            onChange={handleOptionChange}
          />
          Selectable 4
        </label>
        
      </div>
     
      </div>
  )
}

export default Selectable;