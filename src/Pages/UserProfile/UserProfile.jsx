import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./UserProfile.css";
import {
  deleteUserFailure,
  deleteUserSuccess,
  signOutUserStart,
} from "../../redux/user/userSlice";

const UserProfile = () => {
  const [editMode, setEditMode] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({});
  const [activeTab, setActiveTab] = useState("general");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //const [data, setUserData] = useState(null);
  //const [healthStats, setHealthStats] = useState(null);
  const [latestHealthReport, setLatestHealthReport] = useState(null);
  const [monthlyStats, setMonthlyStats] = useState(null);
  const [latestTestReport, setLatestTestReport] = useState(null);
  const [assignment, setAssignment] = useState(null);

  const [data, setUserData] = useState({
    username: "Roy Anderhat",
    email: "roy.anderhat@example.com",
    avatar: "https://via.placeholder.com/150",
    diagnosedCourse: "Diabetes Management",
    fullName: "Roy Anderhat",
    courseStartDate: "2023-01-01",
    courseEndDate: "2023-12-31",
    patientCode: "RA12345",
    healthCenter: {
      pincode: "123456",
      district: "Example District",
      state: "Example State",
      address: "123 Example St, Example City",
      phone: "123-456-7890",
      email: "healthcenter@example.com",
    },
  });

  const [healthStats, setHealthStats] = useState({
    bookingsLog: [
      {
        image: "https://via.placeholder.com/100",
        patientName: "Jane Doe",
        TestName: "Blood Test",
        status: "Waiting",
        time: "10:00 AM, 2023-08-01",
      },
      {
        image: "https://via.placeholder.com/100",
        patientName: "Jim Doe",
        TestName: "X-Ray",
        status: "Completed",
        time: "02:00 PM, 2023-08-02",
      },
    ],
    records: [
      {
        TestName: "Blood Test",
        date: "2023-08-01",
        time: "10:00 AM",
        TestType: "Routine",
        TestReport: "Normal",
        contact: "Doctor A",
      },
      {
        TestName: "X-Ray",
        date: "2023-08-02",
        time: "02:00 PM",
        TestType: "Diagnostic",
        TestReport: "Normal",
        contact: "Doctor B",
      },
    ],
    latestHealthReport: {
      totalTests: 5,
      attended: 5,
      missed: 0,
    },
    monthlyStats: {
      totalPoint: 80,
      average: 90,
      positive: 70,
      negative: 10,
    },
    latestTestReport: {
      totalExams: 3,
      attempted: 3,
      passed: 3,
      failed: 0,
    },
    assignment: {
      total: 5,
      attempted: 4,
      passed: 4,
      failed: 0,
    },
  });

  useEffect(() => {
    fetchUserData();
    // fetchHealthStats();
    // fetchLatestHealthReport();
    // fetchMonthlyStats();
    // fetchLatestTestReport();
    // fetchAssignment();
  }, []);

  // useEffect(() => {
  //   if (data) {
  //     setFormData({
  //       username: data.username,
  //       email: data.email,
  //       avatar: data.avatar,
  //     });
  //   }
  // }, [data]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const fetchUserData = async () => {
    try {
      const response = await axios.get(`/api/user/${currentUser._id}`);
      console.log("user - > ", response, response.data);
      // setUserData(response.data);
      setFormData({
        username: response.data.username,
        email: response.data.email,
        avatar: response.data.avatar,
      });
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  // const fetchHealthStats = async () => {
  //   try {
  //     const response = await axios.get("/api/health-stats");
  //     setHealthStats(response.data);
  //   } catch (error) {
  //     console.error("Error fetching health stats:", error);
  //   }
  // };

  // const fetchLatestHealthReport = async () => {
  //   try {
  //     const response = await axios.get("/api/latest-health-report");
  //     setLatestHealthReport(response.data);
  //   } catch (error) {
  //     console.error("Error fetching latest health report:", error);
  //   }
  // };

  // const fetchMonthlyStats = async () => {
  //   try {
  //     const response = await axios.get("/api/monthly-stats");
  //     setMonthlyStats(response.data);
  //   } catch (error) {
  //     console.error("Error fetching monthly stats:", error);
  //   }
  // };

  // const fetchLatestTestReport = async () => {
  //   try {
  //     const response = await axios.get("/api/latest-test-report");
  //     setLatestTestReport(response.data);
  //   } catch (error) {
  //     console.error("Error fetching latest test report:", error);
  //   }
  // };

  // const fetchAssignment = async () => {
  //   try {
  //     const response = await axios.get("/api/assignment");
  //     setAssignment(response.data);
  //   } catch (error) {
  //     console.error("Error fetching assignment:", error);
  //   }
  // };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `/api/user/update/${currentUser._id}`,
        formData
      );
      setUserData(response.data);
      setEditMode(false);
      // Update the user in Redux store
      dispatch({ type: "UPDATE_USER_SUCCESS", payload: response.data });
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleLogout = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch("/api/auth/signout");
      const data = await res.json();
      console.log("data - signput ", data);
      if (data.success === false) {
        dispatch(deleteUserFailure(data?.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
      localStorage.setItem("userRole", " ");
      navigate("/login");
    } catch (error) {
      dispatch(deleteUserFailure(data?.message));
    }
    // try {
    //   await axios.get("/api/auth/signout");
    //   dispatch({ type: "LOGOUT" });
    //   // navigate("/login");
    // } catch (error) {
    //   console.error("Error logging out:", error);
    // }
  };

  console.log(
    "----- ",
    !data,
    !healthStats,
    !latestHealthReport,
    !monthlyStats,
    !latestTestReport,
    !assignment
  );
  if (
    !data ||
    !healthStats ||
    !latestHealthReport ||
    !monthlyStats ||
    !latestTestReport ||
    !assignment
  ) {
    // return <div>Loading...</div>;
  }

  const renderContent = () => {
    switch (activeTab) {
      case "general":
        return (
          <div className="general">
            <div className="general-info">
              <p>Diagnosed Course: {data.diagnosedCourse}</p>
              <p>Full name: {data.fullName}</p>
              <p>Course Start Date: {data.courseStartDate}</p>
              <p>Assumed Course End Date: {data.courseEndDate}</p>
              <p>Patient Code: {data.patientCode}</p>
            </div>
            <div className="health-center-details">
              <div>
                <h3>Health Center Details</h3>
                <p>Pincode: {data.healthCenter?.pincode}</p>
                <p>District: {data.healthCenter?.district}</p>
                <p>State: {data.healthCenter?.state}</p>
                <p>Address: {data.healthCenter?.address}</p>
              </div>
              <div>
                <h3>Center Contact</h3>
                <p>Phone: {data.healthCenter?.phone}</p>
                <p>Email: {data.healthCenter?.email}</p>
              </div>
            </div>

            <div className="health-reports">
              <div className="report-card">
                <h3>Latest health report 1</h3>
                <p>Total health test: {latestHealthReport?.totalTests}</p>
                <p>Attended: {latestHealthReport?.attended}</p>
                <p>Missed: {latestHealthReport?.missed}</p>
                <button>Download Report</button>
              </div>
              <div className="report-card">
                <h3>Monthly health Statistics</h3>
                <p>Total point: {monthlyStats?.totalPoint}</p>
                <p>Average: {monthlyStats?.average}</p>
                <p>Positive: {monthlyStats?.positive}</p>
                <p>Negative: {monthlyStats?.negative}</p>
                <button>View Details</button>
              </div>
              <div className="report-card">
                <h3>Latest test Report</h3>
                <p>Total Exams: {latestTestReport?.totalExams}</p>
                <p>Attempted: {latestTestReport?.attempted}</p>
                <p>Passed: {latestTestReport?.passed}</p>
                <p>Failed: {latestTestReport?.failed}</p>
                <button>Download Report Details</button>
              </div>
              <div className="report-card">
                <h3>Assignment</h3>
                <p>Total Assignment: {assignment?.total}</p>
                <p>Attempted: {assignment?.attempted}</p>
                <p>Passed: {assignment?.passed}</p>
                <p>Failed: {assignment?.failed}</p>
                <button>View Details</button>
              </div>
            </div>
          </div>
        );
      case "bookings":
        return (
          <div className="bookings-log">
            {healthStats.bookingsLog?.map((booking, index) => (
              <div key={index} className="booking-entry">
                <img
                  src={booking.image}
                  alt="Patient"
                  className="patient-image"
                />
                <div className="booking-info">
                  <div>
                    {" "}
                    <p>
                      <strong>{booking.patientName}</strong>
                    </p>
                    <p>{booking.TestName}</p>
                  </div>
                  <div>
                    <p>
                      <strong>Status:</strong> {booking.status}
                    </p>
                    <p>{booking.time}</p>
                  </div>
                </div>
                <div className="booking-actions">
                  {booking.status === "Waiting" ? (
                    <>
                      <button className="accept-button">Accept</button>
                      <button className="decline-button">Decline</button>
                    </>
                  ) : (
                    <span className={`status-${booking.status.toLowerCase()}`}>
                      {booking.status}
                    </span>
                  )}
                </div>
                <div className="view-details">
                  <button className="view-details-button">View Details</button>
                </div>
              </div>
            ))}
          </div>
        );
      case "records":
        return (
          <div className="records">
            {healthStats.records.map((record, index) => (
              <div key={index} className="records-entry">
                <p>{record.SiNumber}</p>
                <div className="records-details">
                  <p>{record.TestName}</p>
                  <p>
                    {record.date} {record.time}
                  </p>
                  <div className="view-details">
                    <button className="view-details-button">
                      View Details
                    </button>
                  </div>
                  <p>{record.TestType}</p>
                  <p>{record.TestReport}</p>
                  <p>{record.contact}</p>
                </div>
              </div>
            ))}
          </div>
        );
      default:
        return null;
    }
  };
  return (
    <div className="user-profile">
      <header style={{ marginTop: "50px" }}>
        <button className="back-button" onClick={() => navigate(-1)}>
          ←
        </button>
        <h1>User Profile</h1>
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </header>

      <div className="profile-header">
        <img src={data.avatar} alt={data.username} className="profile-image" />
        <div className="profile-info">
          <h2>{data.username}</h2>
          <p>Email: {data.email}</p>
        </div>
      </div>

      {editMode ? (
        <form onSubmit={handleUpdateProfile} className="edit-profile-form">
          <input
            type="text"
            id="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Username"
          />
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
          />
          <input
            type="text"
            id="avatar"
            value={formData.avatar}
            onChange={handleChange}
            placeholder="Avatar URL"
          />
          <button type="submit">Save Changes</button>
          <button type="button" onClick={() => setEditMode(false)}>
            Cancel
          </button>
        </form>
      ) : (
        <button onClick={() => setEditMode(true)}>Edit Profile</button>
      )}

      <div className="profile-nav">
        <button
          className={`tab-button ${activeTab === "general" ? "active" : ""}`}
          onClick={() => setActiveTab("general")}
        >
          General
        </button>
        <button
          className={`tab-button ${activeTab === "bookings" ? "active" : ""}`}
          onClick={() => setActiveTab("bookings")}
        >
          Bookings Log
        </button>
        <button
          className={`tab-button ${activeTab === "records" ? "active" : ""}`}
          onClick={() => setActiveTab("records")}
        >
          Records
        </button>
      </div>
      {renderContent()}
    </div>
  );
};

export default UserProfile;

// import React, { useState } from "react";
// import "./UserProfile.css";

// const UserProfile = () => {
//   const [data, setUserData] = useState({
//     username: "Roy Anderhat",
//     email: "roy.anderhat@example.com",
//     avatar: "https://via.placeholder.com/150",
//     diagnosedCourse: "Diabetes Management",
//     fullName: "Roy Anderhat",
//     courseStartDate: "2023-01-01",
//     courseEndDate: "2023-12-31",
//     patientCode: "RA12345",
//     healthCenter: {
//       pincode: "123456",
//       district: "Example District",
//       state: "Example State",
//       address: "123 Example St, Example City",
//       phone: "123-456-7890",
//       email: "healthcenter@example.com",
//     },
//   });

//   const [healthStats, setHealthStats] = useState({
//     bookingsLog: [
//       {
//         image: "https://via.placeholder.com/100",
//         patientName: "Jane Doe",
//         TestName: "Blood Test",
//         status: "Waiting",
//         time: "10:00 AM, 2023-08-01",
//       },
//       {
//         image: "https://via.placeholder.com/100",
//         patientName: "Jim Doe",
//         TestName: "X-Ray",
//         status: "Completed",
//         time: "02:00 PM, 2023-08-02",
//       },
//     ],
//     records: [
//       {
//         TestName: "Blood Test",
//         date: "2023-08-01",
//         time: "10:00 AM",
//         TestType: "Routine",
//         TestReport: "Normal",
//         contact: "Doctor A",
//       },
//       {
//         TestName: "X-Ray",
//         date: "2023-08-02",
//         time: "02:00 PM",
//         TestType: "Diagnostic",
//         TestReport: "Normal",
//         contact: "Doctor B",
//       },
//     ],
//     latestHealthReport: {
//       totalTests: 5,
//       attended: 5,
//       missed: 0,
//     },
//     monthlyStats: {
//       totalPoint: 80,
//       average: 90,
//       positive: 70,
//       negative: 10,
//     },
//     latestTestReport: {
//       totalExams: 3,
//       attempted: 3,
//       passed: 3,
//       failed: 0,
//     },
//     assignment: {
//       total: 5,
//       attempted: 4,
//       passed: 4,
//       failed: 0,
//     },
//   });

//   return (
//     <div className="user-profile">
//       <header>
//         <button className="back-button">←</button>
//         <h1>User Profile</h1>
//         <button className="logout-button">Logout</button>
//       </header>

//       <div className="profile-header">
//         <img
//           src={data.avatar}
//           alt={data.username}
//           className="profile-image"
//         />
//         <div className="profile-info">
//           <h2>{data.username}</h2>
//           <p>Email: {data.email}</p>
//         </div>
//       </div>

//       <button className="edit-profile-button">Edit Profile</button>

//       <div className="profile-nav">
//         <button className="tab-button active">General</button>
//         <button className="tab-button">Bookings Log</button>
//         <button className="tab-button">Records</button>
//       </div>

//       <div className="general">
//         <div className="general-info">
//           <p>Diagnosed Course: {data.diagnosedCourse}</p>
//           <p>Full name: {data.fullName}</p>
//           <p>Course Start Date: {data.courseStartDate}</p>
//           <p>Assumed Course End Date: {data.courseEndDate}</p>
//           <p>Patient Code: {data.patientCode}</p>
//         </div>

//         <div className="health-center-details">
//           <h3>Health Center Details</h3>
//           <p>Pincode: {data.healthCenter.pincode}</p>
//           <p>District: {data.healthCenter.district}</p>
//           <p>State: {data.healthCenter.state}</p>
//           <p>Address: {data.healthCenter.address}</p>
//         </div>

//         <div className="center-contact">
//           <h3>Center Contact</h3>
//           <p>Phone: {data.healthCenter.phone}</p>
//           <p>Email: {data.healthCenter.email}</p>
//         </div>

//         <div className="health-reports">
//           <div className="report-card">
//             <h3>Latest health report 1</h3>
//             <p>
//               Total health test: {healthStats.latestHealthReport.totalTests}
//             </p>
//             <p>Attended: {healthStats.latestHealthReport.attended}</p>
//             <p>Missed: {healthStats.latestHealthReport.missed}</p>
//             <button>Download Report</button>
//           </div>
//           <div className="report-card">
//             <h3>Monthly health Statistics</h3>
//             <p>Total point: {healthStats.monthlyStats.totalPoint}</p>
//             <p>Average: {healthStats.monthlyStats.average}</p>
//             <p>Positive: {healthStats.monthlyStats.positive}</p>
//             <p>Negative: {healthStats.monthlyStats.negative}</p>
//             <button>View Details</button>
//           </div>
//           <div className="report-card">
//             <h3>Latest test Report</h3>
//             <p>Total Exams: {healthStats.latestTestReport.totalExams}</p>
//             <p>Attempted: {healthStats.latestTestReport.attempted}</p>
//             <p>Passed: {healthStats.latestTestReport.passed}</p>
//             <p>Failed: {healthStats.latestTestReport.failed}</p>
//             <button>Download Report Details</button>
//           </div>
//           <div className="report-card">
//             <h3>Assignment</h3>
//             <p>Total Assignment: {healthStats.assignment.total}</p>
//             <p>Attempted: {healthStats.assignment.attempted}</p>
//             <p>Passed: {healthStats.assignment.passed}</p>
//             <p>Failed: {healthStats.assignment.failed}</p>
//             <button>View Details</button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserProfile;
