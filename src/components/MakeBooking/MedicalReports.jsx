import React from "react";

function MedicalReports() {
  return (
    <div className="section">
      <h2>Medical Reports</h2>
      <form>
        <button type="button" className="upload-button">
          Upload
        </button>
        <ul className="file-list">
          <li>
            <a href="#">Medical_Report_1.pdf</a>
          </li>
          <li>
            <a href="#">Medical_Report_2.pdf</a>
          </li>
        </ul>
      </form>
    </div>
  );
}

export default MedicalReports;
