import React from "react";
import { Layout, Row, Col, Divider } from "antd";
import { useEffect, useState } from "react";

const { Footer } = Layout;

const ADVAFooter = () => {


  return (
    <Footer 
      style={{ 
        backgroundColor: "#001529", 
        color: "#fff", 
        textAlign: "center", 
        padding: "10px 20px", 
        position: "relative",
        bottom: "0", 
        width: "100%",
        marginTop: "auto"
      }}
    >
      <Row justify="space-around" gutter={[32, 16]}>
        {/* About Us Section */}
        <Col xs={24} sm={12} md={8} lg={6} xl={4}>
          <h4 style={{ color: "#fff", marginBottom: "16px" }}>About Us</h4>
          <p style={{ color: "#aaa", fontSize: "14px" }}>
          ADVA8 simplifies health checkups with expert support.
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

export default ADVAFooter;