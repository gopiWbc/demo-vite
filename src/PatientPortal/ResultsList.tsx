import { Calendar, Check, FileText } from "lucide-react";

type ResultsListProps = {
  setSelectedResultCategory: (category: any) => void;
  selectedResultCategory: any;
};

const ResultsList = ({
  setSelectedResultCategory,
  selectedResultCategory,
}: ResultsListProps) => {
  const resultCategories = [
    {
      id: 1,
      name: "Result 1",
      date: "09/02/2021",
      reportStatus: "FINAL",
      color: "from-teal-500 to-cyan-500",
      testCount: 3,
    },
    {
      id: 2,
      name: "Result 2",
      date: "08/15/2021",
      reportStatus: "FINAL",
      color: "from-cyan-500 to-blue-500",
      testCount: 2,
    },
    {
      id: 3,
      name: "Result 3",
      date: "07/22/2021",
      reportStatus: "FINAL",
      color: "from-emerald-500 to-teal-500",
      testCount: 4,
    },
    {
      id: 4,
      name: "Result 4",
      date: "06/10/2021",
      reportStatus: "FINAL",
      color: "from-teal-600 to-cyan-600",
      testCount: 1,
    },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 mt-4 rounded-2xl shadow-lg py-6 border border-gray-200 dark:border-gray-700">
      <div className="custom-scrollbar max-h-[33vh] px-6 me-1 overflow-y-scroll">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
          All Results
        </h3>
        <span className="text-sm font-medium px-3 py-1 rounded-full bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300">
          {resultCategories.length} Total
        </span>
      </div>
      
      <div className="space-y-3">
        {resultCategories.map((result) => {
          const isSelected = selectedResultCategory?.id === result.id;
          
          return (
            <div
              key={result.id}
              onClick={() => setSelectedResultCategory(result)}
              className={`group relative flex items-center gap-4 p-4 rounded-xl border-2 transition-all cursor-pointer
              ${
                isSelected
                  ? "bg-app-secondary  shadow-lg shadow-teal-500/20  border-app-primary"
                  : "bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-700"
              }`}
            >
              {/* Icon */}
              <div className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br ${result.color} shadow-md`}>
                <FileText className="w-6 h-6 text-white" />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-1">
                  <p className="text-base font-bold truncate text-gray-900 dark:text-white">
                    {result.name}
                  </p>
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold flex-shrink-0 ${
                      result.reportStatus === "FINAL"
                        ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300"
                        : "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-300"
                    }`}>
                    {result.reportStatus}
                  </span>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5 text-xs text-gray-600 dark:text-gray-400">
                    <Calendar className="w-3.5 h-3.5" />
                    <span className="font-medium">{result.date}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-gray-600 dark:text-gray-400">
                    <span className="font-medium">{result.testCount} {result.testCount === 1 ? 'Test' : 'Tests'}</span>
                  </div>
                </div>
              </div>

              {/* Check/Arrow Icon */}
              <div className="flex-shrink-0">
                {isSelected ? (
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center bg-app-primary shadow-lg`}>
                    <Check className="w-5 h-5 text-white font-bold" strokeWidth={3} />
                  </div>
                ) : (
                  <div className="w-8 h-8 rounded-full flex items-center justify-center transition-all bg-gray-100 group-hover:bg-blue-100 dark:bg-gray-800 dark:group-hover:bg-gray-700">
                    <div className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-600"></div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
    </div>
  );
};

export default ResultsList;