import { Layout, Menu } from 'antd';
import Category from "./Category/Category";
import Speciality from "./Speaciality/Speciality";
import Features from "./Features/Features";
import Distance from "./distancerange/distance";
import PriceRange from "./pricerange/priceRange";
import Selectable from "./Selectable/selectable";
import StarRating from "./StarRating/StarRating";
import "./Sidebar.css";

const { Sider } = Layout;

const Sidebar = ({ handleChange }) => {
  return (
    <Sider width={250} theme="light" className="sidebar" style={{ overflow: 'auto', height: '100vh' }}>
      <Menu mode="inline" style={{ height: '100%', borderRight: 0 }}>
        <Menu.ItemGroup key="filters" title="Filters">
          <Category handleChange={handleChange} />
          <Speciality handleChange={handleChange} />
          <Features handleChange={handleChange} />
          <Distance handleChange={handleChange} />
          <PriceRange />
          <Selectable />
          <StarRating />
        </Menu.ItemGroup>
      </Menu>
    </Sider>
  );
};

export default Sidebar;