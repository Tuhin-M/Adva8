import React from "react";
import "./MakeBooking.css";
import { useState, useEffect } from "react";
import axios from "axios";
import Popup from "../../components/MakeBooking/TestPopup";
import { storage } from "../../../firebaseConfig";
import {
  ref,
  uploadBytes,
  listAll,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { useParams } from "react-router-dom";
import { Button, Card, Carousel, Checkbox, Col, DatePicker, Form, Input, List, Radio, Row, Table, Tag, Typography, Upload } from "antd";
import moment from "moment";
import { CloseOutlined, CloudUploadOutlined, UploadOutlined } from "@ant-design/icons";

function MakeBooking() {
  const [selectedTests, setSelectedTests] = useState([]);
  const [selectedDay, setSelectedDay] = useState("");


  const [isPopupOpen, setPopupOpen] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [recommendedTests, setRecommendedTests] = useState([]);
  const params = useParams();
  const [userDetails, setUserDetails] = useState({
    fullName: "",
    dateOfBirth: "",
    gender: "",
    phoneNumber: "",
    email: "",
    address: "",
  });
  const [additionalFeatures, setAdditionalFeatures] = useState({
    expressService: false,
    onlineReports: false,
  });

  useEffect(() => {
    fetchSelectedTests();
    fetchUploadedFiles();
    // if(selectedTests.length > 0) {
    fetchRecommendedTests()
    // }
  }, []);

  const fetchSelectedTests = async () => {
    try {
      const response = await axios.get("/api/tests");
      setSelectedTests(response.data);
    } catch (error) {
      console.error("Error fetching selected tests:", error);
      setSelectedTests([]);
    }
  };

  const fetchUploadedFiles = async () => {
    const filesListRef = ref(storage, "medical_reports/");
    try {
      const response = await listAll(filesListRef);
      const filesPromises = response.items.map(async (item) => {
        const url = await getDownloadURL(item);
        return { name: item.name, url };
      });
      const files = await Promise.all(filesPromises);
      setUploadedFiles(files);
    } catch (error) {
      console.error("Error fetching uploaded files:", error);
    }
  };

  const deleteTest = async (testId) => {
    try {
      await axios.delete(`/api/selected-tests/${testId}`);
      setSelectedTests(selectedTests.filter((test) => test.id !== testId));
    } catch (error) {
      console.error("Error deleting test:", error);
    }
  };

  const handleDeleteTest = async (testId) => {

    setSelectedTests(selectedTests.filter((test) => test.id !== testId));

  };

  const handleClickForDayChange = (day) => {
    setSelectedDay(day);
  };


  const handleFileSelect = (event) => {
    const files = Array.from(event.target.files);
    if (files.length + selectedFiles.length <= 3) {
      setSelectedFiles((prevFiles) => [...prevFiles, ...files]);
    } else {
      alert("You can only upload up to 3 files.");
    }
  };

  const handleFileUpload = async () => {
    const uploadPromises = selectedFiles.map(async (file) => {
      const fileRef = ref(storage, `medical_reports/${file.name}`);
      try {
        await uploadBytes(fileRef, file);
        console.log(`File ${file.name} uploaded successfully`);
        const url = await getDownloadURL(fileRef);
        return { name: file.name, url };
      } catch (error) {
        console.error(`Error uploading file ${file.name}:`, error);
        return null;
      }
    });

    try {
      const uploadedFiles = await Promise.all(uploadPromises);
      const validFiles = uploadedFiles.filter((file) => file !== null);
      setUploadedFiles((prevFiles) => [...prevFiles, ...validFiles]);
      setSelectedFiles([]);
    } catch (error) {
      console.error("Error uploading files:", error);
    }

    fetchUploadedFiles();
  };

  const handleFileDelete = async (fileName) => {
    const fileRef = ref(storage, `medical_reports/${fileName}`);
    try {
      await deleteObject(fileRef);
      console.log("File deleted successfully");
      setUploadedFiles(uploadedFiles.filter((file) => file.name !== fileName));
    } catch (error) {
      console.error("Error deleting file:", error);
    }
  };

  const handleUserDetailsChange = (e) => {
    const { id, value } = e.target;
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      [id]: value,
    }));
  };

  const handleGenderChange = (gender) => {
    console.log("Selected gender:", gender);
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      gender: gender.target.value,
    }));
  };

  const handleProceedToPayment = async () => {
    let selectedTestData = selectedTests.map((test) => {
      return {
        id: test.testId,
        name: test.name,
        price: test.price,
        description: test.description,
      };
    });
    const payload = {
      userDetails,
      uploadedFiles: [uploadedFiles[0].url],
      selectedTests: selectedTestData,
      availability: {
        day: selectedDay,
        timeSlot: selectedTimeSlot,
      },
      additionalFeatures,
      totalTests: selectedTests.length,
      totalPrice: selectedTests
        .reduce((total, test) => total + parseFloat(test.price.slice(1)), 0)
        .toFixed(2),
      labRef: params.listingId,
    };

    console.log(JSON.stringify(payload));

    try {
      const response = await axios.post("/api/order/create", payload);
      console.log("Booking successful:", response.data);

      if (response.status === 200) {
        Swal.fire({
          title: "Success!",
          text: "Booking successful",
          icon: "success",
          confirmButtonText: "OK",
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.href = "/home";
          }
        });
      }
    } catch (error) {
      console.error("Error making booking:", error);
      popToaster("Error making booking", "error");
    }
  };
  const [timeSlots, setTimeSlots] = useState([
    "9AM - 10AM",
    "10AM - 11AM",
    "11AM - 12PM",
    "12PM - 1PM",
    "1PM - 2PM",
    "2PM - 3PM",
    "3PM - 4PM",
    "4PM - 5PM",
    "5PM - 6PM",
    "6PM - 7PM",
  ]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const handleClickForTimeChange = (slot) => {
    console.log("Clicked time slot:", slot);
    setSelectedTimeSlot(slot);
  };

  const handleAdditionalFeaturesChange = (e) => {
    const { id, checked } = e.target;

    const featureId =
      id === "Express Service"
        ? "expressService"
        : id === "Online Reports"
          ? "onlineReports"
          : id;
    setAdditionalFeatures((prevFeatures) => ({
      ...prevFeatures,
      [featureId]: checked,
    }));
  };
  const fetchRecommendedTests = async (testIds) => {
    try {
      const response = await axios.get(`/api/product/getByCategory/${params?.listingId}`);
      // console.log("Lab Tests:", response.data);
      console.log("Lab Recommended Tests resonse:", response.data);
      setRecommendedTests(response.data);
    } catch (error) {
      console.error("Error fetching lab tests:", error);
      setTestData([]);
      setAvailableTests([]);
      setLoading(false);
    }
  };
  const handleSelectedTest = (newTests) => {
    setSelectedTests((prevTests) => [newTests]);
  };
  return (
    <div className="MakeBooking">
      <div className="section user-details">
        <h2>User Details</h2>
        <p>Please provide your information</p>
        <Form layout="vertical">
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12}>
              <Form.Item label="Full Name">
                <Input
                  id="fullName"
                  placeholder="Enter your full name"
                  value={userDetails.fullName}
                  onChange={handleUserDetailsChange}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item label="Date of Birth">
                <DatePicker
                  id="dateOfBirth"
                  style={{ width: '100%' }}
                  value={userDetails.dateOfBirth ? moment(userDetails.dateOfBirth) : null} onChange={(date) => handleUserDetailsChange({ target: { id: 'dateOfBirth', value: date ? date.format('YYYY-MM-DD') : '' } })}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12}>
              <Form.Item label="Gender">
                <Radio.Group
                  value={userDetails.gender}
                  onChange={handleGenderChange}
                >
                  <Radio value="male">Male</Radio>
                  <Radio value="female">Female</Radio>
                  <Radio value="other">Other</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item label="Contact Information">
                <Input
                  id="phoneNumber"
                  placeholder="Enter your phone number"
                  value={userDetails.phoneNumber}
                  onChange={handleUserDetailsChange}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12}>
              <Form.Item label="Email">
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={userDetails.email}
                  onChange={handleUserDetailsChange}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item label="Address">
                <Input
                  id="address"
                  placeholder="Enter your address"
                  value={userDetails.address}
                  onChange={handleUserDetailsChange}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
      <div className="section medical-reports">
        <h2>Medical Reports</h2>
        <Row>
          <Col xs={24}>
            <Typography.Text>Upload any previous medical reports</Typography.Text>
            <Upload
              onChange={handleFileSelect}
              multiple
              className="upload-area"
            >
              <Button icon={<UploadOutlined />}>Select Files</Button>
            </Upload>
            {selectedFiles.length > 0 && (
              <div style={{ marginTop: '16px' }}>
                <Typography.Title level={4}>Selected Files:</Typography.Title>
                <List
                  dataSource={selectedFiles}
                  renderItem={(file, index) => (
                    <List.Item
                      key={index}
                      actions={[
                        <Button
                          type="text"
                          danger
                          icon={<DeleteOutlined />}
                          onClick={() => handleFileDelete(file.name)}
                        >
                          Delete
                        </Button>
                      ]}
                    >
                      <Typography.Text>{file.name}</Typography.Text>
                    </List.Item>
                  )}
                />
                <Button
                  type="primary"
                  icon={<CloudUploadOutlined />}
                  onClick={handleFileUpload}
                  style={{ marginTop: '16px' }}
                >
                  Upload Selected Files
                </Button>
              </div>
            )}
          </Col>
        </Row>
      </div>
      <div className="section">
        <h2>Test Selection</h2>
        <div className="test-popup">
          <button className="primary-button" onClick={() => setPopupOpen(true)}>
            Add Test
          </button>
          <Popup
            isOpen={isPopupOpen}
            onClose={() => setPopupOpen(false)}
            onTestsSelected={(newTests) =>
              setSelectedTests((prevTests) => [...prevTests, ...newTests])
            }
          />
        </div>
        <div className="test-cards" style={{ width: '100%' }}>
          {Array.isArray(selectedTests) && selectedTests.length > 0 && (
            <Table
              dataSource={selectedTests}
              columns={[
                {
                  title: 'Test Name',
                  dataIndex: 'name',
                  key: 'name',
                  responsive: ['xs', 'sm', 'md', 'lg', 'xl'],
                },
                {
                  title: 'Description',
                  dataIndex: 'description',
                  key: 'description',
                  responsive: ['xs', 'sm', 'md', 'lg', 'xl'],
                },
                {
                  title: 'Price',
                  dataIndex: 'price',
                  key: 'price',
                  responsive: ['xs', 'sm', 'md', 'lg', 'xl'],
                },
                {
                  title: 'Action',
                  key: 'action',
                  responsive: ['xs', 'sm', 'md', 'lg', 'xl'],
                  render: (_, record) => (
                    <Button
                      type="link"
                      danger
                      onClick={() => handleDeleteTest(record.id)}
                      icon={<CloseOutlined />}
                    />
                  ),
                },
              ]}
              pagination={false}
              scroll={{ x: true }}
              size="middle"
              bordered
              style={{ width: '100%' }}
            />
          )}
        </div>        {selectedTests.length > 0 && (
          <div className="section recommended-tests">
            <h2>Recommended Tests</h2>
            <div className="recommended-tests-container">
              <Carousel
                dots={true}
                slidesToShow={4}
                slidesToScroll={1}
                draggable={true}
                responsive={[
                  {
                    breakpoint: 1440,
                    settings: {
                      slidesToShow: 4,
                      slidesToScroll: 1,
                    },
                  },
                  {
                    breakpoint: 1024,
                    settings: {
                      slidesToShow: 3,
                      slidesToScroll: 1,
                    },
                  },
                  {
                    breakpoint: 768,
                    settings: {
                      slidesToShow: 2,
                      slidesToScroll: 1,
                    },
                  },
                  {
                    breakpoint: 480,
                    settings: {
                      slidesToShow: 1,
                      slidesToScroll: 1,
                    },
                  },
                ]}
                style={{ paddingBottom: '30px' }}
              >
                {Object.entries(recommendedTests)
                  .filter(([key, test]) => !selectedTests.some(selected => selected.id === test.testId))
                  .map(([key, test]) => (
                    <div key={test.testId} className="carousel-item">
                      <Card
                        hoverable
                        title={test.name}
                        className="test-card"
                        style={{ height: 'auto', width: '95%', margin: '10px' }}
                      >
                        <p style={{ minHeight: '80px', fontSize: '0.9rem' }}>{test.description}</p>
                        <p
                          className="price"
                          style={{
                            fontSize: "1.2em",
                            fontWeight: "bold",
                            color: "#1890ff",
                            margin: "16px 0",
                          }}
                        >
                          ₹{test.price}
                        </p>
                        <Button
                          type="primary"
                          onClick={() => handleSelectedTest(test)}
                          style={{
                            width: "100%",
                            borderRadius: "4px",
                          }}
                        >
                          View Test
                        </Button>
                      </Card>
                    </div>
                  ))}              </Carousel>          </div>
          </div>
        )}

        {selectedTests.length > 0 && (
          <Form layout="vertical">
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={24} md={24}>
                <Form.Item label="Availability">
                  <div className="date-container">
                    {selectedTests[0]?.availability.map((day) => (
                      <Tag
                        key={day}
                        className={`days ${day === selectedDay ? "active" : ""}`}
                        onClick={() => handleClickForDayChange(day)}
                        style={{ cursor: 'pointer', margin: '4px' }}
                        color={day === selectedDay ? "blue" : "default"}
                      >
                        {day}
                      </Tag>
                    ))}
                  </div>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={24} md={24}>
                <Form.Item label="Available Time slots">
                  <div className="time-slots-container">
                    {timeSlots.map((slot) => (
                      <Tag
                        key={slot}
                        className={`timeSlots ${slot === selectedTimeSlot ? "active" : ""}`}
                        onClick={() => handleClickForTimeChange(slot)}
                        style={{ cursor: 'pointer', margin: '4px' }}
                        color={slot === selectedTimeSlot ? "blue" : "default"}
                      >
                        {slot}
                      </Tag>
                    ))}
                  </div>
                </Form.Item>
              </Col>
            </Row>
            <div className="form-row">
              <div className="form-group">
                <label>Additional Features</label>
                <div className="checkbox-group">
                  {selectedTests[0]?.features.map((feature) => (
                    <div style={{ display: "flex", alignItems: "center" }} key={feature}>
                      <input
                        type="checkbox"
                        id={feature}
                        checked={additionalFeatures[feature]}
                        onChange={handleAdditionalFeaturesChange}
                      />
                      <label htmlFor={feature}>{feature}</label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Form>
        )}
      </div>
      {selectedTests.length > 0 && (
        <div className="section booking-summary">
          <h2>Bookings Summary</h2>
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12} md={8}>
              <Form.Item label="Total Tests">
                <Input
                  id="totalTests"
                  value={selectedTests.length}
                  readOnly
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Form.Item label="Total Price">
                <Input
                  id="totalPrice"
                  value={`${selectedTests
                    .reduce(
                      (total, test) => total + parseFloat(test.price.slice(0)),
                      0
                    )
                    .toFixed(2)}`}
                  readOnly
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={8}>
              <Button
                type="primary"
                block
                title={!selectedDay || !selectedTimeSlot ? "Please select a day and time slot first" : ""}
                disabled={!selectedDay || !selectedTimeSlot}
                onClick={handleProceedToPayment}
              >
                Proceed to Payment
              </Button>
            </Col>
          </Row>
        </div>
      )}
    </div>
  );
}
export default MakeBooking;
