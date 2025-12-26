import { useState } from 'react';
import { generateMockData } from './mockdata';
import FilterPanel from './FilterPanel';
import ReportView from './ReportView';

export interface FilterData {
  dateFrom: string;
  dateTo: string;
  salesManager: string;
  salesRep: string;
  client: string;
}

function SalesReport() {
  const [showReport, setShowReport] = useState(false);
  const [filters, setFilters] = useState<FilterData>({
    dateFrom: '',
    dateTo: '',
    salesManager: '',
    salesRep: '',
    client: ''
  });

  const handleGenerateReport = (filterData: FilterData) => {
    setFilters(filterData);
    setShowReport(true);
  };

  const handleClear = () => {
    setFilters({
      dateFrom: '',
      dateTo: '',
      salesManager: '',
      salesRep: '',
      client: ''
    });
    setShowReport(false);
  };

  const reportData = generateMockData();

  return (
    <div className="space-y-4 pb-10">
      <FilterPanel
        onGenerate={handleGenerateReport}
        onClear={handleClear}
        filters={filters}
      />

      {showReport && (
        <ReportView
          data={reportData}
          filters={filters}
        />
      )}
    </div>
  );
}

export default SalesReport;
