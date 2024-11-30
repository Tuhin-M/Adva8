import React from "react";
import { Layout, Row, Col, Divider } from "antd";

const { Footer } = Layout;

const AVDAFooter = () => {
  return (
    <Footer style={{ backgroundColor: "#001529", color: "#fff", textAlign: "center", padding: "40px 20px",zIndex: 1000 }}>
      <Row justify="space-around" gutter={[32, 16]}>
        {/* About Us Section */}
        <Col xs={24} sm={12} md={8} lg={6} xl={4}>
          <h4 style={{ color: "#fff", marginBottom: "16px" }}>About Us</h4>
          <p style={{ color: "#aaa", fontSize: "14px" }}>
          ADVA8 simplifies health checkup bookings with expert support for a smooth, rewarding experience.
          </p>
        </Col>

        {/* Contact Section */}
        <Col xs={24} sm={12} md={8} lg={6} xl={4}>
          <h4 style={{ color: "#fff", marginBottom: "16px" }}>Contact</h4>
          <p style={{ color: "#aaa", fontSize: "14px" }}>
            Email: <a href="mailto:contact@adva8labs.com" style={{ color: "#1890ff" }}>contact@adva8labs.com</a>
          </p>
        </Col>

        {/* Follow Us Section */}
        <Col xs={24} sm={12} md={8} lg={6} xl={4}>
          <h4 style={{ color: "#fff", marginBottom: "16px" }}>Follow Us</h4>
          <p style={{ color: "#aaa", fontSize: "14px" }}>
            Connect with us on social media.
          </p>
        </Col>
      </Row>

      <Divider style={{ borderColor: "#fff", margin: "24px 0" }} />

      <p style={{ color: "#aaa", fontSize: "14px" }}>
        © {new Date().getFullYear()} ADVA8 Labs. All rights reserved.
      </p>
    </Footer>
  );
};

export default AVDAFooter;
