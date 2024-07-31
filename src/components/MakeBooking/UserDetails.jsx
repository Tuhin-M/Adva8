import React from "react";

function UserDetails() {
  return (
    <div className="section user-details">
      <h2>User Details</h2>
      <p>Please provide your information</p>
      <form>
        <div className="form-row">
          <div className="form-group">
            <label>Full Name</label>
            <input type="text" placeholder="Enter your full name" />
          </div>
          <div className="form-group">
            <label>Date of Birth</label>
            <input type="text" placeholder="MM/DD/YYYY" />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Gender</label>
            <div className="radio-group">
              <input type="radio" id="male" name="gender" />
              <label htmlFor="male">Male</label>
              <input type="radio" id="female" name="gender" />
              <label htmlFor="female">Female</label>
              <input type="radio" id="other" name="gender" />
              <label htmlFor="other">Other</label>
              {/* {["Male", "Female", "Other"].map((gender) => {
                return (
                  <div
                    key={gender}
                    className={
                      "genderSelection " +
                      (genderSelection.includes(gender) ? "active" : "")
                    }
                    // onClick={() =>
                    //   handleCheckboxChange(
                    //     {
                    //       target: {
                    //         name: "genderSelection",
                    //         value: gender,
                    //         checked:
                    //           !newTest.genderSelection.includes(gender),
                    //       },
                    //     },
                    //     setNewTest,
                    //     newTest
                    //   )
                    // }
                  >
                    {gender}
                  </div>
                );
              })} */}
            </div>
          </div>
          <div className="form-group">
            <label>Contact Information</label>
            <input type="text" placeholder="Enter your phone number" />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Email</label>
            <input type="email" placeholder="Enter your email" />
          </div>
          <div className="form-group">
            <label>Address</label>
            <input type="text" placeholder="Enter your address" />
          </div>
        </div>
        {/* <button type="button" className="primary-button">
          Next
        </button> */}
      </form>
    </div>
  );
}

export default UserDetails;
