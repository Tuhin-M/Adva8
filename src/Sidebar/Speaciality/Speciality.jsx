import React from "react";
import { Radio, Collapse, Typography } from "antd";

const { Panel } = Collapse;
const { Title } = Typography;

const Speciality = ({ handleChange }) => {
  return (
    <Collapse defaultActiveKey={["1"]} style={{ backgroundColor: "#f0f2f5", borderRadius: "8px" }}>
      <Panel header={<Title level={5}>Speciality</Title>} key="1">
        <Radio.Group onChange={handleChange} name="test2" style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <Radio value="">All</Radio>
          <Radio value="Speciality 1">Speciality 1</Radio>
          <Radio value="Speciality 2">Speciality 2</Radio>
          <Radio value="Speciality 3">Speciality 3</Radio>
          <Radio value="Speciality 4">Speciality 4</Radio>
        </Radio.Group>
      </Panel>
    </Collapse>
  );
};

export default Speciality;
