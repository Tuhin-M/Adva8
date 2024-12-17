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
} from "antd";
import dayjs from "dayjs";

function Details() {
  SwiperCore.use([Navigation]);
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedListing, setEditedListing] = useState(null);
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
      message.success("Lab details updated successfully");
    } catch (error) {
      message.error("Something went wrong while updating");
    }
  };

  const handleInputChange = (field, value) => {
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
                  {isEditing ? (
                    <Input
                      value={editedListing.labName}
                      onChange={(e) =>
                        handleInputChange("labName", e.target.value)
                      }
                      style={{ marginBottom: "10px" }}
                    />
                  ) : (
                    <Title level={2} style={{ color: "#0d9488" }}>
                      {listing.labName}
                    </Title>
                  )}
                  {isEditing ? (
                    <Input
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
                    />
                  ) : (
                    <Text
                      type="secondary"
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <FaMapMarkerAlt style={{ marginRight: "8px" }} />
                      {listing.labAddress}, {listing.labCity},{" "}
                      {listing.labState}, {listing.labPin}
                    </Text>
                  )}
                </Col>
                <Col xs={24} sm={6} style={{ textAlign: "right" }}>
                  {isLabOwner == 0 && (
                    <Button
                      type="primary"
                      style={{ backgroundColor: "#0d9488" }}
                      href={"/make-booking/" + params?.listingId}
                    >
                      Make Booking
                    </Button>
                  )}
                  {isLabOwner == 1 && (
                    <>
                      {isEditing ? (
                        <Button
                          type="primary"
                          onClick={handleSave}
                          style={{
                            marginRight: "8px",
                            backgroundColor: "#0d9488",
                          }}
                        >
                          Save
                        </Button>
                      ) : (
                        <Button
                          type="primary"
                          onClick={() => setIsEditing(true)}
                          style={{ backgroundColor: "#0d9488" }}
                        >
                          Edit
                        </Button>
                      )}
                    </>
                  )}
                </Col>
              </Row>

              <div style={{ marginTop: "24px" }}>
                {isEditing ? (
                  <TextArea
                    value={editedListing.description}
                    onChange={(e) =>
                      handleInputChange("description", e.target.value)
                    }
                    rows={4}
                  />
                ) : (
                  <Text>{listing.description}</Text>
                )}

                <List style={{ marginTop: "16px" }}>
                  <List.Item>
                    <Text style={{ display: "flex", alignItems: "center" }}>
                      <FaPhone style={{ marginRight: "8px" }} />
                      Phone:{" "}
                      {isEditing ? (
                        <Input
                          value={editedListing.labPhoneNumber}
                          onChange={(e) =>
                            handleInputChange("labPhoneNumber", e.target.value)
                          }
                        />
                      ) : (
                        listing.labPhoneNumber
                      )}
                    </Text>
                  </List.Item>
                  <List.Item>
                    <Text style={{ display: "flex", alignItems: "center" }}>
                      <FaEnvelope style={{ marginRight: "8px" }} />
                      Email:{" "}
                      {isEditing ? (
                        <Input
                          value={editedListing.labEmail}
                          onChange={(e) =>
                            handleInputChange("labEmail", e.target.value)
                          }
                        />
                      ) : (
                        listing.labEmail
                      )}
                    </Text>
                  </List.Item>
                  <List.Item>
                    <Text style={{ display: "flex", alignItems: "center" }}>
                      <FaGlobe style={{ marginRight: "8px" }} />
                      Website:{" "}
                      {isEditing ? (
                        <Input
                          value={editedListing.labWebsite}
                          onChange={(e) =>
                            handleInputChange("labWebsite", e.target.value)
                          }
                        />
                      ) : (
                        listing.labWebsite
                      )}
                    </Text>
                  </List.Item>
                  <List.Item>
                    <Text style={{ display: "flex", alignItems: "center" }}>
                      <FaClock style={{ marginRight: "8px" }} />
                      Operating Hours:{" "}
                      {isEditing ? (
                        <>
                          <TimePicker
                            value={dayjs(editedListing.labOpeningTime, "HH:mm")}
                            onChange={(time) =>
                              handleInputChange(
                                "labOpeningTime",
                                time.format("HH:mm")
                              )
                            }
                            format="HH:mm"
                          />
                          {" - "}
                          <TimePicker
                            value={dayjs(editedListing.labClosingTime, "HH:mm")}
                            onChange={(time) =>
                              handleInputChange(
                                "labClosingTime",
                                time.format("HH:mm")
                              )
                            }
                            format="HH:mm"
                          />
                        </>
                      ) : (
                        `${listing.labOpeningTime} - ${listing.labClosingTime}`
                      )}
                    </Text>
                  </List.Item>
                </List>

                <div style={{ marginTop: "16px" }}>
                  <Title level={5}>Operating Days:</Title>

                  {isEditing ? (
                    <Select
                      mode="multiple"
                      style={{ width: "100%" }}
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
                    />
                  ) : (
                    <List
                      grid={{ gutter: 16, xs: 2, sm: 3, md: 4 }}
                      dataSource={listing.labOperatingDays}
                      renderItem={(day, index) => (
                        <List.Item key={index}>{day}</List.Item>
                      )}
                    />
                  )}
                </div>
              </div>
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
