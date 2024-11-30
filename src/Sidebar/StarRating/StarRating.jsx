import React, { useState } from 'react';
import { Collapse, Typography } from 'antd';

const { Title } = Typography;
const { Panel } = Collapse;

const StarRating = () => {
  const [rating, setRating] = useState(0);

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  // Function to render the stars based on the selected rating
  const renderStars = (selectedRating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          className={`star ${i <= selectedRating ? 'filled' : ''}`}
          onClick={() => handleRatingChange(i)}
        >
          ★
        </span>
      );
    }
    return stars;
  };

  return (
    <div style={styles.container}>
      <Title level={5}>Ratings</Title>

      <Collapse defaultActiveKey={['1']} expandIconPosition="right" style={{ border: "none" }}>
        <Panel header="Click to Rate" key="1">
          <div style={styles.starBody}>
            {renderStars(rating)}
          </div>
          <div style={styles.starContent}>
            {rating > 0 ? `You rated this ${rating} star${rating > 1 ? 's' : ''}.` : "Please select a rating."}
          </div>
        </Panel>
      </Collapse>
    </div>
  );
};

export default StarRating;

const styles = {
  container:{ backgroundColor: "#f0f2f5", padding: "24px", borderRadius: "8px" ,marginBottom: "50px"},
  starBody:{ fontSize: "24px", cursor: "pointer" },
  starContent:{ marginTop: "10px" }
  
}