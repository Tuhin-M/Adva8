import React, { useState } from "react";
import { Slider, InputNumber, Button, Typography, Space, Row, Col } from "antd";

const { Title } = Typography;

const FilterForm = () => {
  const [distanceMin, setDistanceMin] = useState(0);
  const [distanceMax, setDistanceMax] = useState(100);

  const handleApply = () => {
    console.log("Applied Filters:", {
      distance: { min: distanceMin, max: distanceMax },
    });
  };

  return (
    <div style={{ backgroundColor: "#f0f2f5", padding: "24px", borderRadius: "8px" }}>
      <Title level={5}>Distance Range</Title>

      <Row gutter={16} align="middle">
        <Col span={12}>
          <Slider
            range
            min={0}
            max={100}
            value={[distanceMin, distanceMax]}
            onChange={(values) => {
              setDistanceMin(values[0]);
              setDistanceMax(values[1]);
            }}
          />
        </Col>

        <Col span={10}>
          <InputNumber
            min={0}
            max={100}
            value={distanceMin}
            onChange={(value) => setDistanceMin(value)}
            style={{ width: "100%" }}
          />
        </Col>
        <Col span={10}>
          <InputNumber
            min={0}
            max={100}
            value={distanceMax}
            onChange={(value) => setDistanceMax(value)}
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

export default FilterForm;
