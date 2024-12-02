import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./Details.css";
import {
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaGlobe,
  FaClock,
} from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import "swiper/css/bundle";
import { Navigation } from "swiper/modules";
import TestOffered from "../Lab-dashboard/Test-offered/TestOffered";
import { Row, Col, Card, Button, Spin, Typography, List } from 'antd';

function Details() {
  SwiperCore.use([Navigation]);
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const params = useParams();
  const isLabOwner = localStorage.getItem("userRole");
  const { Title, Text } = Typography;

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/lab/get/${params?.listingId}`);
        const data = await res.json();
        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setListing(data);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchListing();
  }, [params?.listingId]);

  const currentLabId = params?.listingId;

  return (
    <div className="details">
      {loading && <div style={{ textAlign: 'center', padding: '2rem' }}><Spin size="large" /></div>}
      {error && (
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <Text type="danger">Something went wrong!</Text>
        </div>
      )}
      {listing && !loading && !error && (
        <Row gutter={[16, 16]}>
          <Col xs={24}>
            <Swiper navigation>
              {listing?.labImageUrls.map((url) => (
                <SwiperSlide key={url}>
                  <div
                    className="h-[550px]"
                    style={{
                      background: `url(${url}) center no-repeat`,
                      backgroundSize: "cover",
                    }}
                  ></div>
                </SwiperSlide>
              ))}
            </Swiper>
          </Col>
          <Col xs={24}>
            <Card className="labs-details">
              <Row justify="space-between" align="middle">
                <Col xs={24} sm={18}>
                  <Title level={2} style={{ color: '#0d9488' }}>{listing.labName}</Title>
                  <Text type="secondary" style={{ display: 'flex', alignItems: 'center' }}>
                    <FaMapMarkerAlt style={{ marginRight: '8px' }} />
                    {listing.labAddress}, {listing.labCity}, {listing.labState}, {listing.labPin}
                  </Text>
                </Col>
                <Col xs={24} sm={6} style={{ textAlign: 'right' }}>
                  {isLabOwner == 0 && (
                    <Button type="primary" style={{ backgroundColor: '#0d9488' }} href={"/make-booking/" + params?.listingId}>
                      Make Booking
                    </Button>
                  )}
                </Col>
              </Row>

              <div style={{ marginTop: '24px' }}>
                <Text>{listing.description}</Text>

                <List style={{ marginTop: '16px' }}>
                  <List.Item>
                    <Text style={{ display: 'flex', alignItems: 'center' }}>
                      <FaPhone style={{ marginRight: '8px' }} />
                      Phone: {listing.labPhoneNumber}
                    </Text>
                  </List.Item>
                  <List.Item>
                    <Text style={{ display: 'flex', alignItems: 'center' }}>
                      <FaEnvelope style={{ marginRight: '8px' }} />
                      Email: {listing.labEmail}
                    </Text>
                  </List.Item>
                  <List.Item>
                    <Text style={{ display: 'flex', alignItems: 'center' }}>
                      <FaGlobe style={{ marginRight: '8px' }} />
                      Website: {listing.labWebsite}
                    </Text>
                  </List.Item>
                  <List.Item>
                    <Text style={{ display: 'flex', alignItems: 'center' }}>
                      <FaClock style={{ marginRight: '8px' }} />
                      Operating Hours: {listing.labOpeningTime} - {listing.labClosingTime}
                    </Text>
                  </List.Item>
                </List>

                <div style={{ marginTop: '16px' }}>
                  <Title level={5}>Operating Days:</Title>
                  <List
                    grid={{ gutter: 16, xs: 2, sm: 3, md: 4 }}
                    dataSource={listing.labOperatingDays}
                    renderItem={(day, index) => (
                      <List.Item key={index}>{day}</List.Item>
                    )}
                  />
                </div>              </div>
            </Card>
          </Col>
          {isLabOwner == 1 && isLabOwner != undefined && (
            <Col xs={24}>
              <TestOffered labId={currentLabId} />
            </Col>
          )}
        </Row>
      )}
    </div>
  );
}

export default Details;