import React from "react";
import { Radio, Collapse, Typography } from "antd";

const { Panel } = Collapse;
const { Title } = Typography;

function Category({ handleChange }) {
  return (
    <Collapse defaultActiveKey={["1"]} style={{ backgroundColor: "#f0f2f5", borderRadius: "8px" }}>
      <Panel header={<Title level={5}>By Test Samples</Title>} key="1">
        <Radio.Group onChange={handleChange} name="test" style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <Radio value="">All</Radio>
          <Radio value="Category 1">Category 1</Radio>
          <Radio value="Category 2">Category 2</Radio>
          <Radio value="Category 3">Category 3</Radio>
          <Radio value="Category 4">Category 4</Radio>
        </Radio.Group>
      </Panel>
    </Collapse>
  );
}

export default Category;
