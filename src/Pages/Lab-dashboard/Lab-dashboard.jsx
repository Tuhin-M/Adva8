import React, { useState, useEffect } from "react";
import "./Lab-dashboard.css";
import Sidebar from "./Sidebar.jsx";
import { Row, Col, Card, Layout, Typography, Avatar, List } from "antd";

const { Content } = Layout;
const { Title } = Typography;

const LabDashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    bookingToday: 10,
    patientIn: 10,
    patientRel: 10,
    relievedToday: 10,
    reportsToDeliver: 10,
    reportsDelivered: 10,
    appointments: [],
    labDetails: {},
  });

  useEffect(() => {
    // Simulating API call
    const fetchData = async () => {
      try {
        // Replace this with your actual API call
        const response = await fetch("your_api_endpoint");
        const data = await response.json();
        setDashboardData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const statCards = [
    { icon: "🏨", title: "Bookings Today", value: dashboardData.bookingToday },
    { icon: "🏥", title: "In Patient Today", value: dashboardData.patientIn },
    { icon: "🏥", title: "Patient Relatives", value: dashboardData.patientRel },
    { icon: "🛌", title: "Relieved Today", value: dashboardData.relievedToday },
    { icon: "🧪", title: "Reports to be delivered", value: dashboardData.reportsToDeliver },
    { icon: "🧪", title: "Reports Delivered", value: dashboardData.reportsDelivered },
  ];

  return (
    <Layout className="dashboard">
      <Sidebar />
      <Content className="main-content" style={{ padding: '24px' }}>
        <Row gutter={[16, 16]}>
          {statCards.map((stat, index) => (
            <Col xs={24} sm={12} md={8} lg={8} xl={8} key={index}>
              <Card>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <div style={{ fontSize: '24px', marginRight: '16px' }}>{stat.icon}</div>
                  <div>
                    <div style={{ fontSize: '24px', fontWeight: 'bold' }}>{stat.value}</div>
                    <div>{stat.title}</div>
                  </div>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
        
        <Card style={{ marginTop: '24px' }}>
          <Title level={4}>Upcoming Appointments</Title>
          <List
            itemLayout="horizontal"
            dataSource={dashboardData.appointments}
            renderItem={(appointment, index) => (
              <List.Item
                extra={
                  index === 0 ? (
                    <span style={{ color: '#1890ff' }}>Ongoing</span>
                  ) : (
                    <span>{appointment.time}</span>
                  )
                }
              >
                <List.Item.Meta
                  avatar={<Avatar src={appointment.image} />}
                  title={appointment.patientName}
                  description={appointment.testName}
                />
              </List.Item>
            )}
          />
        </Card>
      </Content>
    </Layout>
  );
};

export default LabDashboard;