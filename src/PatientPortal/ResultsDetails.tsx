import { Download, FileText, User, Beaker, Building2, Calendar, Phone, Hash } from "lucide-react";
import { useState } from "react";

type ResultDetailsProps = {
  selectedResultCategory: any;
};

const ResultDetails = ({
  selectedResultCategory,
}: ResultDetailsProps) => {
  const [activeTab, setActiveTab] = useState("overview");

   if (!selectedResultCategory)
    return (
      <div className={`flex flex-col items-center justify-center h-[70vh]`}>
        <div className={`relative mb-6`}>
          {/* Animated Pulse Circles */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-32 rounded-full bg-blue-200/30 dark:bg-blue-500/10 animate-ping"></div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-24 h-24 rounded-full bg-blue-200/40 dark:bg-blue-500/20 animate-pulse"></div>
          </div>
          
          {/* Main Icon */}
          <div className="relative w-20 h-20 rounded-2xl bg-app-primary flex items-center justify-center shadow-lg">
            <FileText className="w-10 h-10 text-gray-200" />
          </div>
        </div>
        
        <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
          No Result Selected
        </h3>
        <p className="text-base mb-6 text-center max-w-md text-gray-600 dark:text-gray-400">
          Choose a result from the list to view detailed laboratory reports and test information
        </p>
  
      </div>
    );

  const selectedResult: any = {
    laboratoryName: "PRIMEX Clinical Laboratories, Inc.",
    laboratoryAddress: "16742 STAGG ST. #120, VAN NUYS, CA 91406",
    laboratoryPhone: "TEL: (818) 779-0495",
    laboratoryFax: "FAX: (818) 779-1257",
    facilityName: "GLENDALE H/Q",
    facilityAddress: "GLENDALE H/Q, Alabama 63332",
    facilityPhone: "999999999",
    medicalDirector: "RAMKUMAR RAJA SEKAR, M.D. MEDICAL DIRECTOR",
    patientName: "LEONAT, KUMARI",
    patientAge: "30",
    patientSex: "F",
    patientId: "PL00000042",
    patientDOB: "01/01/1995",
    accountNo: "0084892",
    accession: "0084892",
    timeCollected: "09:00",
    dateCollected: "09/02/2021",
    tel: "+919344766756",
    dateReceived: "09/02/2021",
    physician: "RAJ, ARUN",
    dateReported: "09/02/2021",
    reportStatus: "FINAL",
    tests: [
      {
        name: "2019 NOVEL CORONA VIRUS",
        testName: "CORONAVIRUS PCR",
        result: "DETECTED A",
        outOfRange: true,
        description:
          "Primex Clinical Laboratories employs methods that utilize nucleic acid amplification such as RT-PCR and/or TMA(Transcription Mediated Amplification)for detection of SARS-CoV-2(Covid-19).",
      },
    ],
  };

  const tabs = [
    { id: "overview", label: "Overview", icon: FileText },
    { id: "patient", label: "Patient Info", icon: User },
    { id: "results", label: "Test Results", icon: Beaker },
    { id: "facility", label: "Facility Details", icon: Building2 },
  ];

  return (
    <div className="bg-app-secondary dark:bg-gray-900 rounded-2xl overflow-hidden">
      {/* Header Section */}
      <div className="bg-app-primary dark:bg-gradient-to-r dark:from-gray-800 dark:to-gray-900 p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <div className="px-4 py-1.5 rounded-full text-xs font-bold bg-white text-app-primary bg-app-secondary shadow-lg">
                {selectedResultCategory.name}
              </div>
              <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-700">
                ✓ {selectedResult.reportStatus}
              </span>
            </div>
            <h4 className="text-3xl font-bold text-white mb-1">Laboratory Report</h4>
            <p className="text-sm font-bold text-cyan-50 dark:text-gray-300">Report Date: {selectedResult.dateReported}</p>
          </div>
          <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold bg-white dark:bg-gray-800 text-app-primary transition-all shadow-lg hover:shadow-xl transform hover:scale-105">
            <Download className="w-4 h-4" />
            <span>Download</span>
          </button>
        </div>
      </div>

      {/* Modern Tab Navigation */}
      <div className="bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700 px-6">
        <div className="flex gap-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative flex items-center gap-2 px-5 py-4 font-semibold text-sm transition-all ${isActive ? 'text-app-primary' : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300'}`}>
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
                {isActive && <div className="absolute bottom-0 left-0 right-0 h-1 rounded-t-full bg-app-primary" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Content Area */}
      <div className="p-6">
        {activeTab === "overview" && (
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-teal-100 dark:bg-teal-500/20 flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-teal-600 dark:text-teal-400" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Collected</p>
                    <p className="text-lg font-bold text-gray-900 dark:text-white">{selectedResult.dateCollected}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-cyan-100 dark:bg-cyan-500/20 flex items-center justify-center">
                    <Beaker className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Tests</p>
                    <p className="text-lg font-bold text-gray-900 dark:text-white">{selectedResult.tests.length} Test(s)</p>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-emerald-100 dark:bg-emerald-500/20 flex items-center justify-center">
                    <FileText className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Status</p>
                    <p className="text-lg font-bold text-gray-900 dark:text-white">{selectedResult.reportStatus}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Patient Summary Card */}
            <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <h5 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">Patient Summary</h5>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-xs font-medium mb-1 text-gray-500 dark:text-gray-400">Name</p>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">{selectedResult.patientName}</p>
                </div>
                <div>
                  <p className="text-xs font-medium mb-1 text-gray-500 dark:text-gray-400">Age / Sex</p>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">{selectedResult.patientAge} / {selectedResult.patientSex}</p>
                </div>
                <div>
                  <p className="text-xs font-medium mb-1 text-gray-500 dark:text-gray-400">Patient ID</p>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">{selectedResult.patientId}</p>
                </div>
                <div>
                  <p className="text-xs font-medium mb-1 text-gray-500 dark:text-gray-400">Physician</p>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">{selectedResult.physician}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "patient" && (
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
            <h5 className="text-lg font-bold mb-6 text-gray-900 dark:text-white">Patient Information</h5>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-teal-100 dark:bg-teal-500/20 flex items-center justify-center flex-shrink-0">
                    <User className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                  </div>
                  <div>
                    <p className="text-xs font-medium mb-1 text-gray-500 dark:text-gray-400">Full Name</p>
                    <p className="text-base font-semibold text-gray-900 dark:text-white">{selectedResult.patientName}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-cyan-100 dark:bg-cyan-500/20 flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
                  </div>
                  <div>
                    <p className="text-xs font-medium mb-1 text-gray-500 dark:text-gray-400">Date of Birth</p>
                    <p className="text-base font-semibold text-gray-900 dark:text-white">{selectedResult.patientDOB}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-emerald-100 dark:bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-xs font-medium mb-1 text-gray-500 dark:text-gray-400">Telephone</p>
                    <p className="text-base font-semibold text-gray-900 dark:text-white">{selectedResult.tel}</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-teal-100 dark:bg-teal-500/20 flex items-center justify-center flex-shrink-0">
                    <Hash className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                  </div>
                  <div>
                    <p className="text-xs font-medium mb-1 text-gray-500 dark:text-gray-400">Patient ID</p>
                    <p className="text-base font-semibold text-gray-900 dark:text-white">{selectedResult.patientId}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-cyan-100 dark:bg-cyan-500/20 flex items-center justify-center flex-shrink-0">
                    <Hash className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
                  </div>
                  <div>
                    <p className="text-xs font-medium mb-1 text-gray-500 dark:text-gray-400">Account Number</p>
                    <p className="text-base font-semibold text-gray-900 dark:text-white">{selectedResult.accountNo}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-emerald-100 dark:bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                    <Hash className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-xs font-medium mb-1 text-gray-500 dark:text-gray-400">Accession Number</p>
                    <p className="text-base font-semibold text-gray-900 dark:text-white">{selectedResult.accession}</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Timeline */}
            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
              <h6 className="text-sm font-bold mb-4 text-gray-700 dark:text-gray-300">Collection Timeline</h6>
              <div className="relative">
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700"></div>
                <div className="space-y-4">
                  <div className="relative flex items-start gap-4 pl-10">
                    <div className="absolute left-0 w-8 h-8 rounded-full bg-teal-600 dark:bg-teal-500 flex items-center justify-center text-white text-xs font-bold">1</div>
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Collected</p>
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">{selectedResult.dateCollected} at {selectedResult.timeCollected}</p>
                    </div>
                  </div>
                  <div className="relative flex items-start gap-4 pl-10">
                    <div className="absolute left-0 w-8 h-8 rounded-full bg-cyan-600 dark:bg-cyan-500 flex items-center justify-center text-white text-xs font-bold">2</div>
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Received</p>
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">{selectedResult.dateReceived}</p>
                    </div>
                  </div>
                  <div className="relative flex items-start gap-4 pl-10">
                    <div className="absolute left-0 w-8 h-8 rounded-full bg-emerald-600 dark:bg-emerald-500 flex items-center justify-center text-white text-xs font-bold">3</div>
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Reported</p>
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">{selectedResult.dateReported}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "results" && (
          <div className="space-y-4">
            {selectedResult.tests.map((test: any, index: number) => (
              <div
                key={index}
                className={`bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border-l-4 ${
                  test.outOfRange ? 'border-red-500' : 'border-green-500'
                }`}>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h6 className="text-xl font-bold mb-1 text-gray-900 dark:text-white">{test.name}</h6>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{test.testName}</p>
                  </div>
                  <div className={`px-6 py-3 rounded-xl font-bold text-lg ${test.outOfRange ? 'bg-red-100 text-red-600 dark:bg-red-500/20 dark:text-red-400' : 'bg-green-100 text-green-600 dark:bg-green-500/20 dark:text-green-400'}`}>
                    {test.result}
                  </div>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-4">
                  <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">{test.description}</p>
                </div>
                
                {test.outOfRange && (
                  <div className="mt-4 flex items-start gap-2 p-3 rounded-lg bg-red-50 dark:bg-red-500/10">
                    <span className="text-red-500 font-bold text-sm">⚠</span>
                    <p className="text-xs text-red-700 dark:text-red-300">This result is outside the normal range. Please consult with your physician.</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {activeTab === "facility" && (
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
              <h5 className="text-lg font-bold mb-4 text-app-primary">{selectedResult.laboratoryName}</h5>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div>
                    <p className="text-xs font-medium mb-1 text-gray-500 dark:text-gray-400">Address</p>
                    <p className="text-sm text-gray-700 dark:text-gray-300">{selectedResult.laboratoryAddress}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium mb-1 text-gray-500 dark:text-gray-400">Phone</p>
                    <p className="text-sm text-gray-700 dark:text-gray-300">{selectedResult.laboratoryPhone}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium mb-1 text-gray-500 dark:text-gray-400">Fax</p>
                    <p className="text-sm text-gray-700 dark:text-gray-300">{selectedResult.laboratoryFax}</p>
                  </div>
                </div>
                <div>
                  <p className="text-xs font-medium mb-1 text-gray-500 dark:text-gray-400">Medical Director</p>
                  <p className="text-sm font-semibold text-gray-900 dark:text-gray-300">{selectedResult.medicalDirector}</p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
              <h5 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">Testing Facility</h5>
              <div className="space-y-3">
                <div>
                  <p className="text-xs font-medium mb-1 text-gray-500 dark:text-gray-400">Facility Name</p>
                  <p className="text-sm font-semibold text-gray-900 dark:text-gray-300">{selectedResult.facilityName}</p>
                </div>
                <div>
                  <p className="text-xs font-medium mb-1 text-gray-500 dark:text-gray-400">Address</p>
                  <p className="text-sm text-gray-700 dark:text-gray-300">{selectedResult.facilityAddress}</p>
                </div>
                <div>
                  <p className="text-xs font-medium mb-1 text-gray-500 dark:text-gray-400">Phone</p>
                  <p className="text-sm text-gray-700 dark:text-gray-300">{selectedResult.facilityPhone}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResultDetails;