import React, { useState, useEffect } from "react";
import {
  Layout,
  Card,
  Avatar,
  Button,
  Tabs,
  Table,
  Tag,
  Typography,
  Row,
  Col,
  Space,
} from "antd";
import Sidebar from "./Sidebar";
import "./Bookings.css";

const { Content } = Layout;
const { Title, Text } = Typography;
const { TabPane } = Tabs;

const Bookings = () => {
  const [data, setData] = useState({
    bookingsLog: [
      {
        image: "https://example.com/patient1.jpg",
        patientName: "John Doe",
        TestName: "Blood Test",
        status: "Waiting",
        time: "10:30 AM",
      },
      {
        image: "https://example.com/patient2.jpg",
        patientName: "Jane Smith",
        TestName: "X-Ray",
        status: "Confirmed",
        time: "11:45 AM",
      },
      {
        image: "https://example.com/patient3.jpg",
        patientName: "Mike Johnson",
        TestName: "MRI Scan",
        status: "Declined",
        time: "2:15 PM",
      },
    ],
    inOutTrack: [
      {
        image: "https://example.com/patient4.jpg",
        patientName: "Emily Brown",
        TestName: "CT Scan",
        time: "9:00 AM",
      },
      {
        image: "https://example.com/patient5.jpg",
        patientName: "David Wilson",
        TestName: "Ultrasound",
        time: "1:30 PM",
      },
    ],
    missedOut: [
      {
        image: "https://example.com/patient6.jpg",
        patientName: "Sarah Davis",
        TestName: "ECG",
        time: "3:45 PM",
      },
    ],
    labDetails: {
      name: "HealthCare Diagnostics",
      image: "https://example.com/lab-logo.png",
      doj: "15 Jan 2022",
      owner: "Dr. Robert Anderson",
      contact: "+1 (555) 123-4567",
      emergencyContact: "+1 (555) 987-6543",
      email: "info@healthcarediagnostics.com",
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const response = await fetch('your_api_endpoint');
        // const apiData = await response.json();
        // setData(apiData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const bookingsColumns = [
    {
      title: "Patient",
      dataIndex: "patientName",
      key: "patientName",
      render: (text, record) => (
        <div style={{ display: "flex", alignItems: "center", gap: "0.625rem" }}>
          <Avatar src={record.image} />
          <Text strong>{text}</Text>
        </div>
      ),
      responsive: ["xs", "sm", "md", "lg", "xl"],
    },
    {
      title: "Test",
      dataIndex: "TestName",
      key: "TestName",
      responsive: ["sm", "md", "lg", "xl"],
    },
    {
      title: "Time",
      dataIndex: "time",
      key: "time",
      responsive: ["sm", "md", "lg", "xl"],
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        let color =
          status === "Confirmed"
            ? "green"
            : status === "Waiting"
              ? "gold"
              : "red";
        return <Tag color={color}>{status}</Tag>;
      },
      responsive: ["xs", "sm", "md", "lg", "xl"],
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space size="small" wrap>
          {record.status === "Waiting" && (
            <>
              <Button type="primary" size="small">
                Accept
              </Button>
              <Button danger size="small">
                Decline
              </Button>
            </>
          )}
          <Button type="link" size="small">
            View Details
          </Button>
        </Space>
      ),
      responsive: ["xs", "sm", "md", "lg", "xl"],
    },
  ];

  const trackColumns = [
    {
      title: "Patient",
      dataIndex: "patientName",
      key: "patientName",
      render: (text, record) => (
        <div style={{ display: "flex", alignItems: "center", gap: "0.625rem" }}>
          <Avatar src={record.image} />
          <Text strong>{text}</Text>
        </div>
      ),
      responsive: ["xs", "sm", "md", "lg", "xl"],
    },
    {
      title: "Test",
      dataIndex: "TestName",
      key: "TestName",
      responsive: ["sm", "md", "lg", "xl"],
    },
    {
      title: "Time",
      dataIndex: "time",
      key: "time",
      responsive: ["sm", "md", "lg", "xl"],
    },
    {
      title: "Actions",
      key: "actions",
      render: () => (
        <Button type="link" size="small">
          View Details
        </Button>
      ),
      responsive: ["xs", "sm", "md", "lg", "xl"],
    },
  ];

  return (
    <Layout>
      <Sidebar />
      <Content
        style={{
          padding: "0.75rem",
          marginLeft: "80px",
          backgroundColor: "#f0f2f5",
          marginTop: "4rem",
        }}
      >
        <Card bodyStyle={{ padding: { xs: "0.75rem", sm: "1.5rem" } }}>
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={8}>
              <div style={{ textAlign: "center" }}>
                <Avatar
                  src={data.labDetails.image}
                  size={{ xs: 108, sm: 150, md: 200, lg: 200, xl: 200 }}
                />
              </div>
            </Col>
            <Col xs={24} sm={16}>
              <Title level={3}>Lab Details</Title>
              <Row gutter={[0.75, 0.5]}>
                <Col xs={24} sm={12}>
                  <Text strong>Name: </Text>
                  <Text>{data.labDetails.name}</Text>
                </Col>
                <Col xs={24} sm={12}>
                  <Text strong>Date of Joining: </Text>
                  <Text>{data.labDetails.doj}</Text>
                </Col>
                <Col xs={24} sm={12}>
                  <Text strong>Lab Owner: </Text>
                  <Text>{data.labDetails.owner}</Text>
                </Col>
                <Col xs={24} sm={12}>
                  <Text strong>Contact: </Text>
                  <Text>{data.labDetails.contact}</Text>
                </Col>
                <Col xs={24} sm={12}>
                  <Text strong>Emergency Contact: </Text>
                  <Text>{data.labDetails.emergencyContact}</Text>
                </Col>
                <Col xs={24} sm={12}>
                  <Text strong>Email: </Text>
                  <Text>{data.labDetails.email}</Text>
                </Col>
              </Row>
            </Col>
          </Row>
        </Card>

        <Card
          style={{ marginTop: "1rem" }}
          styles={{ padding: { xs: "0.75rem", sm: "1.5rem" } }}
        >
          <Tabs
            defaultActiveKey="bookings"
            size={{ xs: "small", sm: "middle" }}
          >
            <TabPane tab="Bookings Log" key="bookings">
              <Table
                columns={bookingsColumns}
                dataSource={data.bookingsLog}
                rowKey={(record, index) => index}
                scroll={{ x: "max-content" }}
                size={{ xs: "small", sm: "middle" }}
                pagination={{
                  responsive: true,
                  position: ["bottom", "center"],
                }}
              />
            </TabPane>
            <TabPane tab="In / Out Track" key="inout">
              <Table
                columns={trackColumns}
                dataSource={data.inOutTrack}
                rowKey={(record, index) => index}
                scroll={{ x: "max-content" }}
                size={{ xs: "small", sm: "middle" }}
                pagination={{
                  responsive: true,
                  position: ["bottom", "center"],
                }}
              />
            </TabPane>
            <TabPane tab="Missed Out" key="missed">
              <Table
                columns={trackColumns}
                dataSource={data.missedOut}
                rowKey={(record, index) => index}
                scroll={{ x: "max-content" }}
                size={{ xs: "small", sm: "middle" }}
                pagination={{
                  responsive: true,
                  position: ["bottom", "center"],
                }}
              />
            </TabPane>
          </Tabs>
          <Button
            type="primary"
            style={{ marginTop: "1rem" }}
            size={{ xs: "small", sm: "middle" }}
          >
            Export Data
          </Button>
        </Card>
      </Content>
    </Layout>
  );
};

export default Bookings;
