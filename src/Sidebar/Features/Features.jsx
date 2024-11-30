import React from "react";
import { Radio, Collapse, Typography } from "antd";

const { Panel } = Collapse;
const { Title } = Typography;

const Features = ({ handleChange }) => {
  return (
    <Collapse defaultActiveKey={["1"]} style={{ backgroundColor: "#f0f2f5", borderRadius: "8px" }}>
      <Panel header={<Title level={5}>Features</Title>} key="1">
        <Radio.Group onChange={handleChange} name="test1" style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <Radio value="">All</Radio>
          <Radio value="Feature 1">Feature 1</Radio>
          <Radio value="Feature 2">Feature 2</Radio>
          <Radio value="Feature 3">Feature 3</Radio>
          <Radio value="Feature 4">Feature 4</Radio>
        </Radio.Group>
      </Panel>
    </Collapse>
  );
};

export default Features;
