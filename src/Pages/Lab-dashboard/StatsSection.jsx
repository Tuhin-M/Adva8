const StatsSection = () => {
  return (
    <div className="grid grid-cols-2 gap-4 mt-5">
      <div className="bg-white p-5 shadow-md rounded-md">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <span className="material-icons text-teal-500 mr-2">
              assignment
            </span>
            <div>
              <h3 className="text-lg font-bold">25</h3>
              <p>Bookings Today</p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white p-5 shadow-md rounded-md">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <span className="material-icons text-teal-500 mr-2">bed</span>
            <div>
              <h3 className="text-lg font-bold">300</h3>
              <p>In Patient Today</p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white p-5 shadow-md rounded-md">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <span className="material-icons text-teal-500 mr-2">healing</span>
            <div>
              <h3 className="text-lg font-bold">89</h3>
              <p>Relieved Today</p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white p-5 shadow-md rounded-md">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <span className="material-icons text-teal-500 mr-2">
              description
            </span>
            <div>
              <h3 className="text-lg font-bold">52</h3>
              <p>Reports to be delivered</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsSection;
