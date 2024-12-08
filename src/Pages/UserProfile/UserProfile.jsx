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
import { Layout, Card, Avatar, Button, Tabs, Form, Input, Spin, Statistic, List, Tag, Row, Col } from 'antd';
import { UserOutlined, ArrowLeftOutlined, LogoutOutlined, EditOutlined, SaveOutlined, CloseOutlined, DownloadOutlined } from '@ant-design/icons';

const { Header, Content } = Layout;
const { TabPane } = Tabs;

const UserProfile = () => {
  const [editMode, setEditMode] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({});
  const [activeTab, setActiveTab] = useState("general");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

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
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const fetchUserData = async () => {
    try {
      const response = await axios.get(`/api/user/${currentUser._id}`);
      setFormData({
        username: response.data.username,
        email: response.data.email,
        avatar: response.data.avatar,
      });
      setUserData(response.data);
      setHealthStats(response.data.healthStats);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching user data:", error);
      setLoading(false);
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `/api/user/update/${currentUser._id}`,
        formData
      );
      setUserData(response.data);
      setEditMode(false);
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
  };

  const renderGeneral = () => (
    <div className="general">
      <Card title="Personal Information">
        <p><strong>Diagnosed Course:</strong> {data.diagnosedCourse}</p>
        <p><strong>Full name:</strong> {data.fullName}</p>
        <p><strong>Course Start Date:</strong> {data.courseStartDate}</p>
        <p><strong>Assumed Course End Date:</strong> {data.courseEndDate}</p>
        <p><strong>Patient Code:</strong> {data.patientCode}</p>
      </Card>

      <Card title="Health Center Details" style={{ marginTop: '20px' }}>
        <Row gutter={24}>
          <Col span={12}>
            <p><strong>Pincode:</strong> {data.healthCenter?.pincode}</p>
            <p><strong>District:</strong> {data.healthCenter?.district}</p>
            <p><strong>State:</strong> {data.healthCenter?.state}</p>
            <p><strong>Address:</strong> {data.healthCenter?.address}</p>
          </Col>
          <Col span={12}>
            <p><strong>Phone:</strong> {data.healthCenter?.phone}</p>
            <p><strong>Email:</strong> {data.healthCenter?.email}</p>
          </Col>
        </Row>
      </Card>

      <Row gutter={24} style={{ marginTop: '20px' }}>
        <Col span={6}>
          <Card title="Latest Health Report">
            <Statistic title="Total Tests" value={healthStats?.latestHealthReport?.totalTests} />
            <Statistic title="Attended" value={healthStats?.latestHealthReport?.attended} />
            <Statistic title="Missed" value={healthStats?.latestHealthReport?.missed} />
            <Button icon={<DownloadOutlined />}>Download Report</Button>
          </Card>
        </Col>
        <Col span={6}>
          <Card title="Monthly Statistics">
            <Statistic title="Total Points" value={healthStats?.monthlyStats?.totalPoint} />
            <Statistic title="Average" value={healthStats?.monthlyStats?.average} />
            <Statistic title="Positive" value={healthStats?.monthlyStats?.positive} />
            <Statistic title="Negative" value={healthStats?.monthlyStats?.negative} />
            <Button>View Details</Button>
          </Card>
        </Col>
        <Col span={6}>
          <Card title="Latest Test Report">
            <Statistic title="Total Exams" value={healthStats?.latestTestReport?.totalExams} />
            <Statistic title="Attempted" value={healthStats?.latestTestReport?.attempted} />
            <Statistic title="Passed" value={healthStats?.latestTestReport?.passed} />
            <Statistic title="Failed" value={healthStats?.latestTestReport?.failed} />
            <Button icon={<DownloadOutlined />}>Download Report</Button>
          </Card>
        </Col>
        <Col span={6}>
          <Card title="Assignment">
            <Statistic title="Total" value={healthStats?.assignment?.total} />
            <Statistic title="Attempted" value={healthStats?.assignment?.attempted} />
            <Statistic title="Passed" value={healthStats?.assignment?.passed} />
            <Statistic title="Failed" value={healthStats?.assignment?.failed} />
            <Button>View Details</Button>
          </Card>
        </Col>
      </Row>
    </div>
  );

  const renderBookings = () => (
    <List
      itemLayout="horizontal"
      dataSource={healthStats?.bookingsLog}
      renderItem={(booking, index) => (
        <List.Item
          actions={[
            booking.status === "Waiting" ? (
              <>
                <Button type="primary">Accept</Button>
                <Button danger>Decline</Button>
              </>
            ) : (
              <Tag color={booking.status === "Completed" ? "green" : "blue"}>{booking.status}</Tag>
            ),
            <Button type="link">View Details</Button>
          ]}
        >
          <List.Item.Meta
            avatar={<Avatar src={booking.image} />}
            title={booking.patientName}
            description={
              <>
                <p>{booking.TestName}</p>
                <p>{booking.time}</p>
              </>
            }
          />
        </List.Item>
      )}
    />
  );

  const renderRecords = () => (
    <List
      itemLayout="horizontal"
      dataSource={healthStats?.records}
      renderItem={(record, index) => (
        <List.Item
          actions={[
            <Button type="link">View Details</Button>
          ]}
        >
          <List.Item.Meta
            title={record.TestName}
            description={
              <>
                <p>{`${record.date} ${record.time}`}</p>
                <p>Type: {record.TestType}</p>
                <p>Report: {record.TestReport}</p>
                <p>Contact: {record.contact}</p>
              </>
            }
          />
        </List.Item>
      )}
    />
  );

  if (loading) {
    return <Spin size="large" />;
  }

  return (
    <Layout className="user-profile">
      <Header style={{ background: '#fff', padding: '0 20px', marginTop: '50px', display: 'flow' }}>
        <Row style={{justifyContent: 'space-between'}} align="middle">
          <Col>
            <Button icon={<ArrowLeftOutlined />} onClick={() => navigate(-1)} style={{ marginRight: '1.5vw' }} />
          </Col>
          <Col>
            <h1>User Profile</h1>
          </Col>
          <Col style={{ marginLeft: 'auto' }}>
            <Button icon={<LogoutOutlined />} onClick={handleLogout}>Logout</Button>
          </Col>
        </Row>
      </Header>

      <Content style={{ padding: '20px' }}>
        <Card>
          <Row align="middle" gutter={16}>
            <Col>
              <Avatar size={64} src={data.avatar} icon={<UserOutlined />} />
            </Col>
            <Col>
              <h2>{data.username}</h2>
              <p>{data.email}</p>
            </Col>
            <Col>
              {editMode ? (
                <Form onFinish={handleUpdateProfile}>
                  <Form.Item label="Username">
                    <Input id="username" value={formData.username} onChange={handleChange} />
                  </Form.Item>
                  <Form.Item label="Email">
                    <Input id="email" value={formData.email} onChange={handleChange} />
                  </Form.Item>
                  <Form.Item label="Avatar URL">
                    <Input id="avatar" value={formData.avatar} onChange={handleChange} />
                  </Form.Item>
                  <Button type="primary" icon={<SaveOutlined />} htmlType="submit">Save</Button>
                  <Button icon={<CloseOutlined />} onClick={() => setEditMode(false)}>Cancel</Button>
                </Form>
              ) : (
                <Button icon={<EditOutlined />} onClick={() => setEditMode(true)}>Edit Profile</Button>
              )}
            </Col>
          </Row>
        </Card>

        <Tabs defaultActiveKey="general" onChange={setActiveTab} style={{ marginTop: '20px' }}>
          <TabPane tab="General" key="general">
            {renderGeneral()}
          </TabPane>
          <TabPane tab="Bookings Log" key="bookings">
            {renderBookings()}
          </TabPane>
          <TabPane tab="Records" key="records">
            {renderRecords()}
          </TabPane>
        </Tabs>
      </Content>
    </Layout>
  );
};

export default UserProfile;