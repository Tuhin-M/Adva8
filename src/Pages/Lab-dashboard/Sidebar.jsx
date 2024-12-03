import React, { useState } from "react";
import { Layout, Menu } from "antd";
import { DashboardOutlined, CalendarOutlined, ExperimentOutlined, MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const { Sider } = Layout;

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(true);

  return (
    <Sider
      breakpoint="md"
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
      trigger={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      style={{
        height: "100vh",
        position: "fixed",
        left: 0,
        zIndex: 1000,
      }}
    >
      <div className="logo" style={{ padding: "16px", textAlign: "center" }}>
        <img src="path_to_logo_image" alt="Lab Logo" style={{ maxWidth: "80%" }} />
        <div style={{ color: "white", marginTop: "8px" }}>LAB 1 2 3</div>
      </div>
      <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
        <Menu.Item key="1" icon={<DashboardOutlined />}>
          <Link to="/lab-dashboard">Dashboard</Link>
        </Menu.Item>
        <Menu.Item key="2" icon={<CalendarOutlined />}>
          <Link to="/bookings">Bookings</Link>
        </Menu.Item>
        <Menu.Item key="3" icon={<ExperimentOutlined />}>
          <Link to="/labs">My Labs</Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default Sidebar;