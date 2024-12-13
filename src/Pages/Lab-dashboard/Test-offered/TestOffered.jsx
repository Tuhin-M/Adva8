import React, { useState, useEffect } from "react";
import "./TestOffered.css";
import { Button, Card, Col, Descriptions, Form, Input, InputNumber, Row, Select, Space, Typography } from "antd";
import { CloseOutlined } from '@ant-design/icons';


function TestOffered(props) {
  const [productList, setProductList] = useState([]);
  const [form] = Form.useForm();
  const [isNewLab, setIsNewLab] = useState(true);

  useEffect(() => {
    fetchSavedTests();
  }, []);

  const fetchSavedTests = () => {
    fetch(`/api/product/get/${props.labId}`)
      .then((response) => response.json())
      .then((data) => {
        if (
          data &&
          Array.isArray(data) &&
          data.length > 0 &&
          data.some(
            (item) => item.productList && Array.isArray(item.productList)
          )
        ) {
          const allProducts = data.flatMap((item) => item.productList || []);
          setProductList(allProducts);
          setIsNewLab(false);
        } else {
          console.error("Invalid data format received:", data);
          setProductList([]);
          setIsNewLab(true);
        }
      })
      .catch((error) => {
        console.error("Error fetching saved tests:", error);
        setProductList([]);
        setIsNewLab(true);
      });
  };

  const [newTest, setNewTest] = useState({
    testId: "",
    name: "",
    description: "",
    sampleName: "",
    sampleType: "",
    vialName: "",
    preparationTime: "",
    price: "",
    category: "",
    sampleCollection: [],
    availability: [],
    features: [],
    availableTimeSlots: [],
  });

  const [days, setDays] = useState({
    Monday: false,
    Tuesday: false,
    Wednesday: false,
    Thursday: false,
    Friday: false,
    Saturday: false,
    Sunday: false,
  });

  const [timeSlots, setTimeSlots] = useState({
    "9AM - 10AM": false,
    "10AM - 11AM": false,
    "11AM - 12PM": false,
    "12PM - 1PM": false,
    "1PM - 2PM": false,
    "2PM - 3PM": false,
    "3PM - 4PM": false,
    "4PM - 5PM": false,
    "5PM - 6PM": false,
    "6PM - 7PM": false,
  });

  const testCategories = [
    { id: "1", name: "Blood Test" },
    { id: "2", name: "Urine Test" },
    { id: "3", name: "Imaging" },
    { id: "4", name: "Cardiac" },
    { id: "5", name: "Diabetes" },
    { id: "6", name: "Thyroid" },
    { id: "7", name: "Other" },
    { id: "8", name: "Biochemistry" },
    { id: "9", name: "Microbiology" },
    { id: "10", name: "Immunology" },
    { id: "11", name: "Endocrinology" },
    { id: "12", name: "Toxicology" },
    { id: "13", name: "Genetics" },
    { id: "14", name: "Serology" },
    { id: "15", name: "Virology" },
    { id: "16", name: "Parasitology" },
    { id: "17", name: "Cytology" },
    { id: "18", name: "Histology" },
    { id: "19", name: "Oncology" },
    { id: "20", name: "Coagulation" },
    { id: "21", name: "Molecular Diagnostics" },
    { id: "22", name: "Nutritional Analysis" },
    { id: "23", name: "Drug Monitoring" },
    { id: "24", name: "Prenatal Screening" },
    { id: "25", name: "Allergy Testing" },
    { id: "26", name: "Pathology" },
    { id: "27", name: "Metabolic Studies" }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTest({
      ...newTest,
      [name]: value,
    });
  };

  const handleCheckboxChange = (e) => {
    const { name, value, checked } = e.target;
    setNewTest((prevDetails) => {
      const newValues = checked
        ? [...prevDetails[name], value]
        : prevDetails[name].filter((val) => val !== value);
      return { ...prevDetails, [name]: newValues };
    });
  };

  const generateTestId = () => {
    return "test_" + Math.random().toString(36).substr(2, 9);
  };

  const addTest = () => {
    const testWithId = { ...newTest, testId: generateTestId() };
    setProductList([...productList, testWithId]);
  };

  const deleteTest = (index) => {
    setProductList(productList.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      labRef: props.labId,
      category: newTest.category,
      productList,
    };

    console.log("Payload:", payload);

    const apiEndpoint = isNewLab
      ? `/api/product/create`
      : `/api/product/update/${props.labId}`;

    fetch(apiEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        alert("Test added successfully");
        form.resetFields();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  const { Title, Paragraph } = Typography;
  return (
    <>
      <div className="TestOffered">
        <section className="tests-offered">
          <Typography.Title level={2}>Tests Offered</Typography.Title>
          <Form layout="vertical" form={form}>
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={12}>
                <Form.Item label="Test Name">
                  <Input
                    name="name"
                    value={newTest.name}
                    onChange={handleInputChange}
                    placeholder="Enter Test Name"
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item label="Test Category">
                  <Select
                    name="category"
                    value={newTest.category}
                    onChange={(value) => handleInputChange({ target: { name: 'category', value }})}
                    placeholder="Select Category"
                  >
                    {testCategories.map((category) => (
                      <Select.Option key={category.id} value={category.name}>
                        {category.name}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item label="Test Description">
                  <Input
                    name="description"
                    value={newTest.description}
                    onChange={handleInputChange}
                    placeholder="Enter Test Description"
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item label="Sample Name">
                  <Input
                    name="sampleName"
                    value={newTest.sampleName}
                    onChange={handleInputChange}
                    placeholder="Enter Sample Name"
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item label="Sample Type">
                  <Input
                    name="sampleType"
                    value={newTest.sampleType}
                    onChange={handleInputChange}
                    placeholder="Choose Sample Type"
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item label="Vial Name">
                  <Input
                    name="vialName"
                    value={newTest.vialName}
                    onChange={handleInputChange}
                    placeholder="Enter Vial Name"
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item label="Preparation Time">
                  <Input
                    name="preparationTime"
                    value={newTest.preparationTime}
                    onChange={handleInputChange}
                    placeholder="Enter Preparation Time"
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item label="Pricing">
                  <InputNumber
                    style={{ width: '100%' }}
                    name="price"
                    value={newTest.price}
                    onChange={(value) => handleInputChange({ target: { name: 'price', value }})}
                    placeholder="Enter Test Price"
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item label="Sample Collection">
                  <Space>
                    {["Home", "At Lab"].map((sample) => (
                      <Button
                        key={sample}
                        type={newTest.sampleCollection.includes(sample) ? "primary" : "default"}
                        onClick={() =>
                          handleCheckboxChange({
                            target: {
                              name: "sampleCollection",
                              value: sample,
                              checked: !newTest.sampleCollection.includes(sample),
                            },
                          })
                        }
                      >
                        {sample}
                      </Button>
                    ))}
                  </Space>
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item label="Additional features">
                  <Space>
                    {["Express Service", "Online Reports"].map((feature) => (
                      <Button
                        key={feature}
                        type={newTest.features.includes(feature) ? "primary" : "default"}
                        onClick={() =>
                          handleCheckboxChange({
                            target: {
                              name: "features",
                              value: feature,
                              checked: !newTest.features.includes(feature),
                            },
                          })
                        }
                      >
                        {feature}
                      </Button>
                    ))}
                  </Space>
                </Form.Item>
              </Col>
              <Col xs={24}>
                <Form.Item label="Availability">
                  <Space wrap>
                    {Object.keys(days).map((day) => (
                      <Button
                        key={day}
                        type={newTest.availability.includes(day) ? "primary" : "default"}
                        onClick={() =>
                          handleCheckboxChange({
                            target: {
                              name: "availability",
                              value: day,
                              checked: !newTest.availability.includes(day),
                            },
                          })
                        }
                      >
                        {day}
                      </Button>
                    ))}
                  </Space>
                </Form.Item>
              </Col>
              <Col xs={24}>
                <Form.Item label="Available Time Slots">
                  <Space wrap>
                    {Object.keys(timeSlots).map((slot) => (
                      <Button
                        key={slot}
                        type={newTest.availableTimeSlots.includes(slot) ? "primary" : "default"}
                        onClick={() =>
                          handleCheckboxChange({
                            target: {
                              name: "availableTimeSlots",
                              value: slot,
                              checked: !newTest.availableTimeSlots.includes(slot),
                            },
                          })
                        }
                      >
                        {slot}
                      </Button>
                    ))}
                  </Space>
                </Form.Item>
              </Col>
            </Row>
            <Form.Item style={{ textAlign: 'center' }}>
              <Button type="primary" onClick={addTest}>
                Add Test
              </Button>
            </Form.Item>
          </Form>
        </section>

        <section className="saved-tests">
          <Typography.Title level={2}>Saved Tests</Typography.Title>
          <Row gutter={[16, 16]}>
            {productList.map((test, index) => (
              <Col xs={24} sm={12} md={8} lg={6} key={index}>
                <Card
                  title={test.name || "N/A"}
                  extra={
                    <Button type="text" danger onClick={() => deleteTest(index)}>
                      <CloseOutlined />
                    </Button>
                  }
                >
                  <Descriptions column={1}>
                    <Descriptions.Item label="Category">{test.category || "N/A"}</Descriptions.Item>
                    <Descriptions.Item label="Description">{test.description || "N/A"}</Descriptions.Item>
                    <Descriptions.Item label="Pricing">{test.price || "N/A"}</Descriptions.Item>
                  </Descriptions>
                </Card>
              </Col>
            ))}
          </Row>
        </section>
        <div style={{ textAlign: 'center', margin: '24px 0' }}>
          <Button type="primary" onClick={handleSubmit}>
            Save Details
          </Button>
        </div>
      </div>
    </>
  );
}

export default TestOffered;