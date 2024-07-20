const MainSection = () => {
  return (
    <div className="w-4/5 p-5">
      <div className="bg-white p-5 shadow-md rounded-md">
        <div className="flex justify-between items-center mb-5">
          <div>
            <h1 className="text-2xl font-bold">LABS 1</h1>
            <p className="text-teal-500 flex items-center">
              <span className="material-icons mr-1">location_on</span>
              Lorem ipsum dolor sit amet consectetur Address, Area, City
            </p>
          </div>
          <button className="bg-teal-500 text-white px-4 py-2 rounded-md">
            Make Booking
          </button>
        </div>
        <p>
          Lorem ipsum dolor sit amet consectetur. Nunc quis vel nunc facilisis
          interdum egestas...
        </p>
      </div>
    </div>
  );
};

export default MainSection;
