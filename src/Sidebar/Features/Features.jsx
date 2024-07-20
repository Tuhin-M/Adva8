import "./Features.css";
import Input from "../../components/Input";

const Features = ({ handleChange }) => {
  return (
    <>
      <div>
        <h6 className="sidebar-title">Features</h6>
        <label className="sidebar-label-container">
          <input onChange={handleChange} type="radio" value="" name="test1" />
          <span className="checkmark"></span>
          All
        </label>

        <Input
          handleChange={handleChange}
          value="Feature 1"
          title="Feature 1"
          name="test1"
        />

        <Input
          handleChange={handleChange}
          value="Feature 2"
          title="Feature 2"
          name="test1"
        />

        <Input
          handleChange={handleChange}
          value="Feature 3"
          title="Feature 3"
          name="test1"
        />

        <Input
          handleChange={handleChange}
          value="Feature 4"
          title="Feature 4"
          name="test1"
        />
      </div>
    </>
  );
};

export default Features;
