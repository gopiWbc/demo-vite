const PhysiciansList = () => {
  const physicians = [
    {
      name: "Dr. Sarah Johnson",
      email: "sarah.johnson@example.com",
      address: "123 Medical Center Dr, Suite 100",
      contact: "+1 555-0101",
    },
    {
      name: "Dr. Michael Chen",
      email: "michael.chen@example.com",
      address: "456 Heart Health Blvd",
      contact: "+1 555-0102",
    },
    {
      name: "Dr. Emily Rodriguez",
      email: "emily.rodriguez@example.com",
      address: "789 Wellness Ave, Floor 3",
      contact: "+1 555-0103",
    },
  ];
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden py-6 border border-gray-200 dark:border-gray-700">
      <div className="custom-scrollbar max-h-[33vh] px-6 me-1 overflow-y-scroll">
      <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">Physicians List</h3>
      <div className="space-y-4">
        {physicians.map((physician, index) => (
          <div
            key={index}
            className={`p-4 rounded-xl bg-gray-50 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-950 transition-all cursor-pointer`}
          >
            <div className="flex items-start space-x-3">
              <div
                className={`w-12 h-12 rounded-full bg-gradient-to-br ${
                  index === 0
                    ? "from-blue-500 to-cyan-500"
                    : index === 1
                    ? "from-purple-500 to-pink-500"
                    : "from-green-500 to-emerald-500"
                } flex items-center justify-center text-white font-semibold text-sm`}
              >
                {physician.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
              <div className="flex-1 min-w-0">
                <h4
                  className="font-semibold text-gray-900 dark:text-white"
                >
                  {physician.name}
                </h4>
                <p
                  className={`text-sm text-app-primary truncate `}
                >
                  {physician.email}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      </div>
    </div>
  );
};

export default PhysiciansList;
