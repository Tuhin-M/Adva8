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
import {
  Row,
  Col,
  Card,
  Button,
  Spin,
  Typography,
  List,
  Input,
  TimePicker,
  Select,
  message,
  Space,
  Divider,
} from "antd";
import dayjs from "dayjs";

function Details() {
  SwiperCore.use([Navigation]);
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedListing, setEditedListing] = useState(null);
  const [isFieldChanged, setIsFieldChanged] = useState(false);
  const params = useParams();
  const isLabOwner = localStorage.getItem("userRole");
  const { Title, Text } = Typography;
  const { TextArea } = Input;

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
        setEditedListing(data);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchListing();
  }, [params?.listingId]);

  const handleSave = async () => {
    try {
      const res = await fetch(`/api/lab/update/${params.listingId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedListing),
      });
      const data = await res.json();
      if (data.success === false) {
        message.error("Error updating lab details");
        return;
      }
      setListing(editedListing);
      setIsEditing(false);
      setIsFieldChanged(false);
      message.success("Lab details updated successfully");
    } catch (error) {
      message.error("Something went wrong while updating");
    }
  };

  const handleCancel = () => {
    setEditedListing(listing);
    setIsEditing(false);
    setIsFieldChanged(false);
  };

  const handleInputChange = (field, value) => {
    setIsFieldChanged(true);
    setEditedListing((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const currentLabId = params?.listingId;

  return (
    <div className="details">
      {loading && (
        <div style={{ textAlign: "center", padding: "2rem" }}>
          <Spin size="large" />
        </div>
      )}
      {error && (
        <div style={{ textAlign: "center", padding: "2rem" }}>
          <Text type="danger">Something went wrong!</Text>
        </div>
      )}
      {listing && !loading && !error && (
        <Row gutter={[24, 24]}>
          <Col xs={24}>
            <Card className="image-card" bordered={false}>
              <Swiper navigation className="details-swiper">
                {listing?.labImageUrls.map((url) => (
                  <SwiperSlide key={url}>
                    <div
                      className="h-[550px]"
                      style={{
                        background: `url(${url}) center no-repeat`,
                        backgroundSize: "cover",
                        borderRadius: "12px",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
                      }}
                    ></div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </Card>
          </Col>
          <Col xs={24}>
            <Card 
              className="labs-details" 
              bordered={false}
              style={{
                borderRadius: "12px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.05)"
              }}
            >
              <Row gutter={[16, 16]} justify="space-between" align="middle">
                <Col xs={24} md={18}>
                  <Space direction="vertical" size="large" style={{ width: '100%' }}>
                    {isEditing ? (
                      <Input
                        size="large"
                        value={editedListing.labName}
                        onChange={(e) =>
                          handleInputChange("labName", e.target.value)
                        }
                        style={{ borderRadius: "8px" }}
                      />
                    ) : (
                      <Title level={2} style={{ color: "#56BBB3", margin: 0, fontSize: "32px" }}>
                        {listing.labName}
                      </Title>
                    )}
                    {isEditing ? (
                      <Input
                        size="large"
                        value={`${editedListing.labAddress}, ${editedListing.labCity}, ${editedListing.labState}, ${editedListing.labPin}`}
                        onChange={(e) => {
                          const [address, city, state, pin] = e.target.value
                            .split(",")
                            .map((item) => item.trim());
                          handleInputChange("labAddress", address);
                          handleInputChange("labCity", city);
                          handleInputChange("labState", state);
                          handleInputChange("labPin", pin);
                        }}
                        style={{ borderRadius: "8px" }}
                      />
                    ) : (
                      <Text
                        type="secondary"
                        style={{ 
                          display: "flex", 
                          alignItems: "center",
                          fontSize: "16px",
                          color: "#666"
                        }}
                      >
                        <FaMapMarkerAlt className="mr-8" style={{ color: "#56BBB3" }}/>
                        {listing.labAddress}, {listing.labCity},{" "}
                        {listing.labState}, {listing.labPin}
                      </Text>
                    )}
                  </Space>
                </Col>
                <Col xs={24} md={6} style={{ textAlign: "right" }}>
                  {isLabOwner == 0 && (
                    <Button
                      type="primary"
                      size="large"
                      style={{ 
                        backgroundColor: "#56BBB3",
                        borderRadius: "8px",
                        height: "48px",
                        fontSize: "16px",
                        boxShadow: "0 2px 8px rgba(86,187,179,0.2)"
                      }}
                      href={"/make-booking/" + params?.listingId}
                      className="details-button"
                    >
                      Make Booking
                    </Button>
                  )}
                  {isLabOwner == 1 && (
                    <Space direction="vertical" style={{ width: '100%' }}>
                      <Button
                        type="primary"
                        size="large"
                        onClick={isEditing ? handleSave : () => setIsEditing(true)}
                        style={{ 
                          backgroundColor: "#56BBB3",
                          borderRadius: "8px",
                          height: "48px",
                          fontSize: "16px",
                          boxShadow: "0 2px 8px rgba(86,187,179,0.2)"
                        }}
                        className="details-button"
                      >
                        {isEditing ? "Save" : "Edit"}
                      </Button>
                      {isEditing && !isFieldChanged && (
                        <Button
                          size="large"
                          onClick={handleCancel}
                          className="details-button"
                          style={{ 
                            borderRadius: "8px",
                            height: "48px",
                            fontSize: "16px"
                          }}
                        >
                          Cancel
                        </Button>
                      )}
                    </Space>
                  )}
                </Col>
              </Row>

              <Divider style={{ margin: "24px 0" }}/>

              <Space direction="vertical" size="large" style={{ width: '100%' }}>
                <List size="large" split={false}>
                  <List.Item>
                    <Space>
                      <FaPhone className="mr-3" style={{ color: "#56BBB3" }}/>
                      <Text strong>Phone:</Text>
                      {isEditing ? (
                        <Input
                          value={editedListing.labPhoneNumber}
                          onChange={(e) =>
                            handleInputChange("labPhoneNumber", e.target.value)
                          }
                          style={{ borderRadius: "8px" }}
                        />
                      ) : (
                        <Text style={{ color: "#666" }}>{listing.labPhoneNumber}</Text>
                      )}
                    </Space>
                  </List.Item>
                  <List.Item>
                    <Space>
                      <FaEnvelope className="mr-3" style={{ color: "#56BBB3" }}/>
                      <Text strong>Email:</Text>
                      {isEditing ? (
                        <Input
                          value={editedListing.labEmail}
                          onChange={(e) =>
                            handleInputChange("labEmail", e.target.value)
                          }
                          style={{ borderRadius: "8px" }}
                        />
                      ) : (
                        <Text style={{ color: "#666" }}>{listing.labEmail}</Text>
                      )}
                    </Space>
                  </List.Item>
                  <List.Item>
                    <Space>
                      <FaGlobe className="mr-3" style={{ color: "#56BBB3" }}/>
                      <Text strong>Website:</Text>
                      {isEditing ? (
                        <Input
                          value={editedListing.labWebsite}
                          onChange={(e) =>
                            handleInputChange("labWebsite", e.target.value)
                          }
                          style={{ borderRadius: "8px" }}
                        />
                      ) : (
                        <Text style={{ color: "#666" }}>{listing.labWebsite}</Text>
                      )}
                    </Space>
                  </List.Item>
                  <List.Item>
                    <Space>
                      <FaClock className="mr-3" style={{ color: "#56BBB3" }}/>
                      <Text strong>Operating Hours:</Text>
                      {isEditing ? (
                        <Space>
                          <TimePicker
                            value={dayjs(editedListing.labOpeningTime, "HH:mm")}
                            onChange={(time) =>
                              handleInputChange(
                                "labOpeningTime",
                                time.format("HH:mm")
                              )
                            }
                            format="HH:mm"
                            size="large"
                            style={{ borderRadius: "8px" }}
                          />
                          <Text>to</Text>
                          <TimePicker
                            value={dayjs(editedListing.labClosingTime, "HH:mm")}
                            onChange={(time) =>
                              handleInputChange(
                                "labClosingTime",
                                time.format("HH:mm")
                              )
                            }
                            format="HH:mm"
                            size="large"
                            style={{ borderRadius: "8px" }}
                          />
                        </Space>
                      ) : (
                        <Text style={{ color: "#666" }}>{`${listing.labOpeningTime} - ${listing.labClosingTime}`}</Text>
                      )}
                    </Space>
                  </List.Item>
                </List>

                <div>
                  <Title level={5} style={{ marginBottom: "16px" }}>Operating Days:</Title>
                  {isEditing ? (
                    <Select
                      mode="multiple"
                      style={{ width: "100%", borderRadius: "8px" }}
                      value={editedListing.labOperatingDays}
                      onChange={(value) =>
                        handleInputChange("labOperatingDays", value)
                      }
                      options={[
                        { value: "Monday", label: "Monday" },
                        { value: "Tuesday", label: "Tuesday" },
                        { value: "Wednesday", label: "Wednesday" },
                        { value: "Thursday", label: "Thursday" },
                        { value: "Friday", label: "Friday" },
                        { value: "Saturday", label: "Saturday" },
                        { value: "Sunday", label: "Sunday" },
                      ]}
                      size="large"
                    />
                  ) : (
                    <List
                      grid={{
                        gutter: 16,
                        xs: 1,
                        sm: 2,
                        md: 3,
                        lg: 4,
                        xl: 4,
                        xxl: 4,
                      }}
                      dataSource={listing.labOperatingDays}
                      renderItem={(day) => (
                        <List.Item>
                          <Card 
                            size="small"
                            style={{
                              borderRadius: "8px",
                              backgroundColor: "#f5f5f5",
                              textAlign: "center"
                            }}
                          >
                            {day}
                          </Card>
                        </List.Item>
                      )}
                    />
                  )}
                </div>
              </Space>
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