import React, { useState } from "react";
import { Slider, InputNumber, Button, Typography, Row, Col, Space } from "antd";

const { Title } = Typography;

const PriceRange = () => {
  const [priceMin, setPriceMin] = useState(0);
  const [priceMax, setPriceMax] = useState(999999);

  const handleApply = () => {
    console.log("Applied Filters:", {
      price: { min: priceMin, max: priceMax },
    });
  };

  return (
    <div style={{ backgroundColor: "#f0f2f5", padding: "24px", borderRadius: "8px" }}>
      <Title level={5}>Price Range</Title>

      <Row gutter={16} align="middle">
        <Col span={12}>
          <Slider
            range
            min={0}
            max={999999}
            value={[priceMin, priceMax]}
            onChange={(values) => {
              setPriceMin(values[0]);
              setPriceMax(values[1]);
            }}
          />
        </Col>

        <Col span={16}>
          <InputNumber
            min={0}
            max={999999}
            value={priceMin}
            onChange={(value) => setPriceMin(value)}
            style={{ width: "100%" }}
          />
        </Col>
        <Col span={16}>
          <InputNumber
            min={0}
            max={999999}
            value={priceMax}
            onChange={(value) => setPriceMax(value)}
            style={{ width: "100%" }}
          />
        </Col>
      </Row>

      <Space style={{ marginTop: "16px" }}>
        <Button type="primary" onClick={handleApply}>
          Apply
        </Button>
      </Space>
    </div>
  );
};

export default PriceRange;
