import React, { useState } from "react";
import { Collapse, Radio, Typography } from "antd";

const { Title } = Typography;
const { Panel } = Collapse;

const Selectable = () => {
  const [selectedOption, setSelectedOption] = useState(1);

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  return (
    <div style={{ backgroundColor: "#f0f2f5", padding: "24px", borderRadius: "8px" }}>
      <Title level={5}>Selectable</Title>

      <Collapse defaultActiveKey={['1']} expandIconPosition="right" style={{ border: "none" }}>
        <Panel header="Select an Option" key="1">
          <Radio.Group
            onChange={handleOptionChange}
            value={selectedOption}
            style={{ display: "flex", flexDirection: "column", gap: "8px" }}
          >
            <Radio value={1}>Selectable 1</Radio>
            <Radio value={2}>Selectable 2</Radio>
            <Radio value={3}>Selectable 3</Radio>
            <Radio value={4}>Selectable 4</Radio>
          </Radio.Group>
        </Panel>
      </Collapse>
    </div>
  );
};

export default Selectable;
