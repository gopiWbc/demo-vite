import { useState } from "react";
import AppTable from "../Components/AppTable";
import type { FilterValues, ResultRecord } from "./Results/types";
import { columns } from "./Results/column";
import FilterComponent from "./Results/FilterComponent";
import AppTabs from "../../PatientPortal-V3/Protected/components/AppTabs";

const resultData: ResultRecord[] = [
  {
    id: "ORD-1001",
    reportedDate: "12/18/2025",
    collectedDate: "12/10/2025",
    patientName: "Hogan, Robert",
    dob: "08/13/1956",
    patientId: "LLTFP109978",
    accession: "3455449932",
    orderingProvider: "Mandel, R (NPI 1659335333)",
    accountNumber: "04292915",
    orderedTests: "Estradiol, Free Serum, Comprehensive Panel",
    status: "Preliminary",
    category: "Routine",
  },
  {
    id: "ORD-1002",
    reportedDate: "12/18/2025",
    collectedDate: "12/15/2025",
    patientName: "Wolf Shackleford, Annette",
    dob: "01/13/1959",
    patientId: "10443397",
    accession: "3504940202",
    orderingProvider: "Huizenga, R (NPI 1245236541)",
    accountNumber: "04292915",
    orderedTests: "CBG with Free Cortisol, Serum",
    status: "Preliminary",
    category: "Routine",
  },
  {
    id: "ORD-1003",
    reportedDate: "12/18/2025",
    collectedDate: "12/12/2025",
    patientName: "Salah, Alexandra",
    dob: "12/17/1992",
    patientId: "XDP000629107",
    accession: "3475413940",
    orderingProvider: "Navizadeh, N (NPI 1588435239)",
    accountNumber: "04292915",
    orderedTests: "Bile Acids, Fractionated",
    status: "Final",
    category: "Critical",
  },
  {
    id: "ORD-1004",
    reportedDate: "12/18/2025",
    collectedDate: "12/11/2025",
    patientName: "Singer, Jacqueline",
    dob: "10/17/1980",
    patientId: "3465443990",
    accession: "3465443990",
    orderingProvider: "Sadeghi, H (NPI 1257745099)",
    accountNumber: "04292915",
    orderedTests: "G6PD, Qn Blcl and Red Cell Count",
    status: "Final",
    category: "Routine",
  },
  {
    id: "ORD-1005",
    reportedDate: "12/18/2025",
    collectedDate: "12/13/2025",
    patientName: "Pallister, Alana",
    dob: "08/09/1984",
    patientId: "10155339",
    accession: "3505439922",
    orderingProvider: "Ney, M (NPI 1710104674)",
    accountNumber: "04292915",
    orderedTests: "Zinc, RBC, Copper, Serum",
    status: "Preliminary",
    category: "Routine",
  },
  {
    id: "ORD-1006",
    reportedDate: "12/18/2025",
    collectedDate: "12/13/2025",
    patientName: "Klier, Jacob P",
    dob: "04/14/1989",
    patientId: "2525951",
    accession: "3475412199",
    orderingProvider: "Nguyen, T (NPI 1548012331)",
    accountNumber: "04292915",
    orderedTests: "Vitamin B1 (Thiamine), Plasma",
    status: "Final",
    category: "Routine",
  },
  {
    id: "ORD-1007",
    reportedDate: "12/18/2025",
    collectedDate: "12/12/2025",
    patientName: "Trinidad, Rafael G",
    dob: "05/29/1957",
    patientId: "7366697",
    accession: "3475411866",
    orderingProvider: "Kellogg, A (NPI 1104303344)",
    accountNumber: "04292915",
    orderedTests: "Vitamin B6, Plasma, Vitamin B12",
    status: "Preliminary",
    category: "Routine",
  },
  {
    id: "ORD-1008",
    reportedDate: "12/18/2025",
    collectedDate: "12/12/2025",
    patientName: "Cruz, Richard M",
    dob: "07/21/1993",
    patientId: "9365701",
    accession: "3475411701",
    orderingProvider: "Kellogg, A (NPI 1104303344)",
    accountNumber: "04292915",
    orderedTests: "Vitamin B6, Plasma, Vitamin B12",
    status: "Preliminary",
    category: "Routine",
  },
  {
    id: "ORD-1009",
    reportedDate: "12/18/2025",
    collectedDate: "12/10/2025",
    patientName: "Martiny, Clara",
    dob: "06/23/2000",
    patientId: "100024085",
    accession: "3455443021",
    orderingProvider: "Ngouamba, R (NPI 1184700222)",
    accountNumber: "04292915",
    orderedTests: "Estradiol, Free Serum, Comprehensive Panel",
    status: "Preliminary",
    category: "Routine",
  },
  {
    id: "ORD-1010",
    reportedDate: "12/18/2025",
    collectedDate: "12/15/2025",
    patientName: "Zashin, Hillary",
    dob: "09/14/1970",
    patientId: "3505499155",
    accession: "3505499155",
    orderingProvider: "Raskin, D (NPI 1528254566)",
    accountNumber: "04292915",
    orderedTests: "NMR LipoProfile+Lipids",
    status: "Final",
    category: "Critical",
    flagged: true,
  },
];

export default function ResultList() {
   const [filters, setFilters] = useState<FilterValues>({
    patientName: "",
    patientId: "",
    status: [],
    category: [],
    dateRange: [null, null],
    provider: "",
  });

  const activeFilterCount = [
    filters.patientName,
    filters.patientId,
    ...filters.status,
    ...filters.category,
    (filters.dateRange[0] && filters.dateRange[1]) ? "dateRange" : "",
    filters.provider,
  ].filter(Boolean).length;

  const handleSearch = () => {
    // Implement your search/filter logic here
    console.log("Searching with filters:", filters);
    // You can call your API or filter the data here
  };

  const handleClearAll = () => {
    setFilters({
      patientName: "",
      patientId: "",
      status: [],
      category: [],
      dateRange: [null, null],
      provider: "",
    });
  };

   const [activeTab, setActiveTab] = useState("reported");

  const tabs = [
    { key: "reported", label: "Reported" },
    { key: "pending", label: "Pending" },
  ];

  return (
    <div className="space-y-6">
      <header className="px-2">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Results</h1>
            <p className="text-sm text-gray-500">
              Review recent lab orders, manage result delivery, and access supporting files.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button className="btn-primary rounded-lg px-5 py-2 text-sm font-semibold shadow-md">
              New Order
            </button>
            <button  className="rounded-lg border border-gray-300 px-4 sm:px-5 py-2 text-xs sm:text-sm font-semibold text-gray-700 transition hover:border-indigo-600 hover:text-indigo-600 flex-1 sm:flex-initial">
              Export
            </button>
          </div>
        </div>
      </header>

      <AppTabs
        tabs={tabs}
        activeKey={activeTab}
        onChange={setActiveTab}
      />

      <FilterComponent
        filters={filters}
        onFilterChange={setFilters}
        onSearch={handleSearch}
        onClearAll={handleClearAll}
        activeFilterCount={activeFilterCount}
      />

      <AppTable<ResultRecord>
        columns={columns}
        data={resultData}
        rowKey="id"
        rowSelection={{ type: "checkbox" }}
        rowClassName={(record) => (record.flagged ? "danger-row" : "")}
        onChange={() => undefined}
      />
    </div>
  );
}
