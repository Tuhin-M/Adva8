import Input from "../../components/Input";
import "./Speciality.css";

const Speciality = ({ handleChange }) => {
  return (
    <>
      <div>
        <h6 className="sidebar-title">Speciality</h6>
        <label className="sidebar-label-container">
          <input onChange={handleChange} type="radio" value="" name="test2" />
          <span className="checkmark"></span>All
        </label>

        <Input
          handleChange={handleChange}
          value="Speciality 1"
          title="Speciality 1"
          name="test2"
        />

        <Input
          handleChange={handleChange}
          value="Speciality 2"
          title="Speciality 2"
          name="test2"
        />

        <Input
          handleChange={handleChange}
          value="Speciality 3"
          title="Speciality 3"
          name="test2"
        />

        <Input
          handleChange={handleChange}
          value="Speciality 4"
          title="Speciality 4"
          name="test2"
        />
      </div>
    </>
  );
};

export default Speciality;
