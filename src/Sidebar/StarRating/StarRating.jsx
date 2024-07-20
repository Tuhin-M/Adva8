import React, { useState } from 'react';

function StarRating() {
  const [rating, setRating] = useState(0);


  const handleRatingChange = (event) => {
    setRating(parseInt(event.target.value));
  };

  return (
    <div>
 
   
  <h6 className="sidebar-title">Ratings</h6>
      <div>
        <label>
          <input
            type="radio"
            value="5"
            checked={rating === 5}
            onChange={handleRatingChange}
          />
          <span className="stars">★★★★★</span>
        </label>
      </div> 
      <div>
        <label>
          <input
            type="radio"
            value="4"
            checked={rating === 4}
            onChange={handleRatingChange}
          />
          <span className="stars">★★★★☆</span>
        </label>
      </div>
      <div>
        <label>
          <input
            type="radio"
            value="3"
            checked={rating === 3}
            onChange={handleRatingChange}
          />
          <span className="stars">★★★☆☆</span>
        </label>
      </div>
      <div>
        <label>
          <input
            type="radio"
            value="2"
            checked={rating === 2}
            onChange={handleRatingChange}
          />
          <span className="stars">★★☆☆☆</span>
        </label>
      </div>
    </div>
  );
}

export default StarRating;