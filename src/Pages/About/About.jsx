import React from "react";
import { Row, Col, Typography } from "antd";
import "./About.css";

const { Title, Paragraph } = Typography;

function About() {
  return (
    <div className="about-us">
      <Row gutter={[16, 16]} align="middle">
        <Col xs={24} md={12}>
          <div className="about-us-photo" />
        </Col>
        <Col xs={24} md={12}>
          <Typography>
            <Title level={1} className="about-us-heading">
              About Adva8
            </Title>
            <Paragraph>
              Adva8 is a leading healthcare startup that specializes in helping clients find, book, and track their health checkups in the most desirable neighborhoods. Our team of experienced agents is dedicated to providing exceptional service and making the healthcare process as smooth as possible.
            </Paragraph>
            <Paragraph>
              We are here to help you every step of the way.
            </Paragraph>
            <Paragraph>
              Our team has a wealth of experience and knowledge in the healthcare industry, and we are committed to providing the highest level of service to our clients. We believe that healthcare services should not be a painful but exciting and rewarding experience, and we are dedicated to making it a reality for each and every person.
            </Paragraph>
          </Typography>
        </Col>
      </Row>
    </div>
  );
}

export default About;
