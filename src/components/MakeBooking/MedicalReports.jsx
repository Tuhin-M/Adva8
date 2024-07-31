import React from "react";

function MedicalReports() {
  return (
    <div className="section medical-reports">
      <h2>Medical Reports</h2>
      <p>Upload any previous medical reports</p>
      <button type="button" className="upload-button">
        Upload
      </button>
      <ul className="file-list">
        <li>
          <span className="file-icon">📄</span> Medical_Report_1.pdf
        </li>
        <li>
          <span className="file-icon">📄</span> Medical_Report_2.pdf
        </li>
      </ul>
    </div>
  );
}

export default MedicalReports;
