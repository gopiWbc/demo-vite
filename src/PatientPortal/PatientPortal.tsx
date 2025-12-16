
import { useState } from "react";
import ProfileTab from "./ProfileTab";
import ResultsTab from "./ResultsTab";
import TabNav from "./TabNav";
import TopNav from "./TopNav";

const PatientPortal = () => {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className={`min-h-screen  dark:bg-gray-900 bg-gray-50`}>
      <TopNav />
      <TabNav
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === "profile" && <ProfileTab />}
        {activeTab === "results" && <ResultsTab />}
      </div>
    </div>
  );
};

export default PatientPortal;
