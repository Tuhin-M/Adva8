import "./Category.css";
import Input from "../../components/Input";

function Category({ handleChange }) {
  return (
    <div>
       <div className={open ? "sidebar-item open" : "sidebar-item"}>
      <h6 className="sidebar-title">By Test Samples</h6>
      <div>
        <label className="sidebar-label-container">
          <input onChange={handleChange} type="radio" value="" name="test" />
          <span className="checkmark"></span>All
        </label>
        <Input
          handleChange={handleChange}
          value="Category 1"
          title="Category 1"
          name="test"
        />
        <Input
          handleChange={handleChange}
          value="Category 2"
          title="Category 2"
          name="test"
        />
        <Input
          handleChange={handleChange}
          value="Category 3"
          title="Category 3"
          name="test"
        />
        <Input
          handleChange={handleChange}
          value="Category 4"
          title="Category 4"
          name="test"
        />
      </div>
      </div>
    </div>
  );
}

export default Category;
