import React from "react";

function BookingSummary() {
  return (
    <div className="section">
      <h2>Bookings Summary</h2>
      <div className="booking-summary">
        <div className="form-row">
          <div className="form-group">
            <label>Total Tests</label>
            <input type="text" placeholder="3" readOnly />
          </div>
          <div className="form-group">
            <label>Total Price</label>
            <input type="text" placeholder="$160" readOnly />
          </div>
        </div>
        <button type="button" className="primary-button">
          Proceed to Payment
        </button>
      </div>
    </div>
  );
}

export default BookingSummary;
