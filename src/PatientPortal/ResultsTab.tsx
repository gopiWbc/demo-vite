import { useState } from "react";
import PhysiciansList from "./PhysicianList";
import ResultDetails from "./ResultsDetails";
import ResultsList from "./ResultsList";

const ResultsTab = () => {
  const [selectedResultCategory, setSelectedResultCategory] =
    useState<any>(null);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="space-y-2">
        <PhysiciansList />
        <ResultsList
          setSelectedResultCategory={setSelectedResultCategory}
          selectedResultCategory={selectedResultCategory}
        />
      </div>

      <div className="lg:col-span-2">
        <ResultDetails
          selectedResultCategory={selectedResultCategory}
          
        />
      </div>
    </div>
  );
};

export default ResultsTab;
