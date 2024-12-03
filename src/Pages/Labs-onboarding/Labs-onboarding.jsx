import React, { useEffect, useState } from "react";
import "./Labs-onboarding.css";
import { storage } from "../../../firebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Form, Input, Select, Upload, Button, Row, Col, TimePicker, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

function LabsOnboarding() {
  const [form] = Form.useForm();
  const [imageUrl, setImageUrl] = useState([]);
  const [days, setDays] = useState({
    Monday: false,
    Tuesday: false,
    Wednesday: false,
    Thursday: false,
    Friday: false,
    Saturday: false,
    Sunday: false,
  });

  const handleFileUpload = async (file) => {
    if (file.size > 1024 * 1024) {
      message.error(`File size exceeds 1MB limit for file: ${file.name}`);
      return false;
    }

    try {
      const storageRef = ref(storage, `lab-images/${file.name}`);
      const snapshot = await uploadBytes(storageRef, file);
      const url = await getDownloadURL(snapshot.ref);
      setImageUrl(prev => [...prev, url]);
      return url;
    } catch (error) {
      console.error(`Error uploading file ${file.name}:`, error);
      return false;
    }
  };

  const handleSubmit = async (values) => {
    const payload = {
      ...values,
      labOperatingDays: Object.keys(days).filter((day) => days[day]),
      labImageUrls: imageUrl,
      labOpeningTime: values.labOpeningTime.format('hh:mm A'),
      labClosingTime: values.labClosingTime.format('hh:mm A'),
    };

    try {
      const response = await fetch(`/api/lab/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      const data = await response.json();
      message.success("Lab created successfully");
      window.location.href = "/lab-dashboard";
    } catch (error) {
      message.error("Error creating lab");
      console.error("Error:", error);
    }
  };

  return (
    <div className="LabsOnboarding">
      <section className="lab-information">
        <h2>Lab Information</h2>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
        >
          <Row gutter={16}>
            <Col xs={24} sm={12}>
              <Form.Item
                label="Lab Name"
                name="labName"
                rules={[{ required: true, message: 'Please enter lab name' }]}
              >
                <Input placeholder="Enter Lab Name" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item
                label="Website"
                name="labWebsite"
              >
                <Input placeholder="Enter Website URL" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col xs={24} sm={12}>
              <Form.Item
                label="Phone Number"
                name="labPhoneNumber"
                rules={[{ required: true, message: 'Please enter phone number' }]}
              >
                <Input type="number" placeholder="Enter Phone Number" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item
                label="Email"
                name="labEmail"
                rules={[
                  { required: true, message: 'Please enter email' },
                  { type: 'email', message: 'Please enter valid email' }
                ]}
              >
                <Input placeholder="Enter Email" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col xs={24} sm={12}>
              <Form.Item
                label="Lab Address"
                name="labAddress"
                rules={[{ required: true, message: 'Please enter lab address' }]}
              >
                <Input placeholder="Enter Lab Address" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item
                label="State"
                name="labState"
              >
                <Input placeholder="Enter State" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col xs={24} sm={8}>
              <Form.Item
                label="City"
                name="labCity"
              >
                <Input placeholder="Enter City" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={8}>
              <Form.Item
                label="Pin Code"
                name="labPin"
              >
                <Input type="number" placeholder="Enter Pin Code" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={8}>
              <Form.Item
                label="Lat/Long"
                name="labLatLong"
              >
                <Input placeholder="Enter Lab Lat/Long" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col xs={24} sm={12}>
              <Form.Item
                label="Opening Time"
                name="labOpeningTime"
              >
                <TimePicker use12Hours format="hh:mm A" style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item
                label="Closing Time"
                name="labClosingTime"
              >
                <TimePicker use12Hours format="hh:mm A" style={{ width: '100%' }} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col xs={24} sm={12}>
              <Form.Item
                label="Upload Lab Images"
                name="labImages"
              >
                <Upload
                  beforeUpload={handleFileUpload}
                  multiple
                  showUploadList={false}
                >
                  <Button icon={<UploadOutlined />}>Upload Images</Button>
                </Upload>
                <div style={{ marginTop: '10px' }}>
                  {imageUrl.map((url, index) => (
                    <img
                      key={index}
                      src={url}
                      alt={`Uploaded lab image ${index + 1}`}
                      style={{ width: "200px", marginRight: '10px', marginBottom: '10px' }}
                    />
                  ))}
                </div>
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item label="Operating Days">
                <div className="date-container">
                  {Object.keys(days).map((day) => (
                    <Button
                      key={day}
                      type={days[day] ? "primary" : "default"}
                      onClick={() => setDays(prev => ({ ...prev, [day]: !prev[day] }))}
                      style={{ margin: '0 5px 5px 0' }}
                    >
                      {day}
                    </Button>
                  ))}
                </div>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item style={{ textAlign: 'center' }}>
            <Button type="primary" htmlType="submit">
              Save Details
            </Button>
          </Form.Item>
        </Form>
      </section>
    </div>
  );
}

export default LabsOnboarding;