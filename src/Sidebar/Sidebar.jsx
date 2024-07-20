import Category from "./Category/Category";

import Speciality from "./Speaciality/Speciality";
import Features from "./Features/Features";
import Distance from "./distancerange/distance";
import PriceRange from "./pricerange/priceRange";
import Selectable from "./Selectable/selectable";
import StarRating from "./StarRating/StarRating";
import "./Sidebar.css";

const Sidebar = ({ handleChange }) => {
  return (
    <>
      <section className="sidebar">
        <div className="content">
          <Category handleChange={handleChange} />
          <Speciality handleChange={handleChange} />
          <Features handleChange={handleChange} />
          <Distance handleChange={handleChange} />
          <PriceRange />
          <Selectable />
          <StarRating />
        </div>
      </section>
    </>
  );
};

export default Sidebar;
