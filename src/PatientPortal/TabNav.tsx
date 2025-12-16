const TabNav = ({ activeTab, setActiveTab }: any) => {

  const tabs = [
    { name: "Profile", value: "profile" },
    { name: "Results", value: "results" },
  ];

  return (
    <div className="bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700 sticky top-16 z-40">
      <div className="max-w-7xl mx-auto px-4 flex space-x-8">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            className={`py-4 px-1 border-b-2 text-sm font-medium transition ${
              activeTab === tab.value
                ? "border-app-primary text-app-primary dark:text-app-primary"
                : "border-transparent text-gray-500 dark:text-gray-400"
            }`}
          >
            {tab.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TabNav;
