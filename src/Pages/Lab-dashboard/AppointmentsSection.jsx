const AppointmentsSection = () => {
  return (
    <div className="mt-5">
      <h2 className="text-lg font-bold mb-3">Upcoming Appointments</h2>
      <div className="bg-white p-5 shadow-md rounded-md">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <img
              src="path/to/patient-image"
              alt="Patient"
              className="rounded-full w-10 h-10 mr-3"
            />
            <div>
              <h3 className="font-bold">Patient Name</h3>
              <p>Test name</p>
            </div>
          </div>
          <span className="text-teal-500">Ongoing</span>
        </div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <img
              src="path/to/patient-image"
              alt="Patient"
              className="rounded-full w-10 h-10 mr-3"
            />
            <div>
              <h3 className="font-bold">Patient Name</h3>
              <p>Test name</p>
            </div>
          </div>
          <span className="text-gray-500">10:30 AM</span>
        </div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <img
              src="path/to/patient-image"
              alt="Patient"
              className="rounded-full w-10 h-10 mr-3"
            />
            <div>
              <h3 className="font-bold">Patient Name</h3>
              <p>Test name</p>
            </div>
          </div>
          <span className="text-gray-500">11:10 AM</span>
        </div>
      </div>
    </div>
  );
};

export default AppointmentsSection;
