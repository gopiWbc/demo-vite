import { useState } from 'react';
import { DatePicker, Select, Button } from 'antd';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import { ChevronDown, ChevronUp, Filter } from 'lucide-react';
import type { FilterData } from './SalesReport';

const { RangePicker } = DatePicker;
const dateFormat = "MM/DD/YYYY";

interface FilterPanelProps {
  onGenerate: (filters: FilterData) => void;
  onClear: () => void;
  filters: FilterData;
}

function FilterPanel({ onGenerate, onClear, filters }: FilterPanelProps) {
  const [expanded, setExpanded] = useState(true);
  const [localFilters, setLocalFilters] = useState<FilterData>(filters);

  const handleChange = <Key extends keyof FilterData>(key: Key, value: FilterData[Key]) => {
    setLocalFilters({ ...localFilters, [key]: value });
  };

  const toRangeValue = (range: [string, string]): [Dayjs | null, Dayjs | null] => [
    range[0] ? dayjs(range[0], dateFormat) : null,
    range[1] ? dayjs(range[1], dateFormat) : null,
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate(localFilters);
  };

  const handleClear = () => {
    setLocalFilters({
      dateFrom: '',
      dateTo: '',
      salesManager: '',
      salesRep: '',
      client: ''
    });
    onClear();
  };

  const hasActiveFilters = localFilters.dateFrom || localFilters.dateTo || localFilters.salesManager || localFilters.salesRep || localFilters.client;

  return (
    <div className="space-y-6">
          <h1 className="text-3xl font-bold text-slate-800">Sales Report</h1>

      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="px-4 sm:px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <button
            onClick={() => setExpanded((prev) => !prev)}
            className="flex items-center gap-2 text-sm font-semibold text-gray-700 hover:text-indigo-800 transition"
          >
            <Filter className="h-4 w-4" />
            <span>Sales Reports Filter</span>
            {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </button>
          {hasActiveFilters && (
            <span
              className="text-sm font-medium text-indigo-600 hover:text-indigo-700 cursor-pointer transition"
              onClick={handleClear}
            >
              Clear all
            </span>
          )}
        </div>

        <div className={`transition-all duration-300 ease-in-out overflow-hidden ${expanded ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"}`}>
          <form onSubmit={handleSubmit} className="px-4 sm:px-6 py-5 bg-gray-50 border-b border-gray-200">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
              <div className="">
                <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">Report Period</label>
                <RangePicker
                  size="large"
                  value={toRangeValue([localFilters.dateFrom, localFilters.dateTo])}
                  onChange={(_, dateStrings) => {
                    handleChange("dateFrom", dateStrings?.[0] || '');
                    handleChange("dateTo", dateStrings?.[1] || '');
                  }}
                  format={dateFormat}
                  className="w-full shadow-sm"
                  placeholder={['From', 'To']}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">Sales Manager</label>
                <Select
                  size="large"
                  value={localFilters.salesManager}
                  onChange={(value) => handleChange("salesManager", value)}
                  className="w-full shadow-sm"
                  placeholder="Select Manager"
                  allowClear
                >
                  <Select.Option value="manager1">John Smith</Select.Option>
                  <Select.Option value="manager2">Sarah Johnson</Select.Option>
                  <Select.Option value="manager3">Mike Davis</Select.Option>
                </Select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">Sales Representative</label>
                <Select
                  size="large"
                  value={localFilters.salesRep}
                  onChange={(value) => handleChange("salesRep", value)}
                  className="w-full shadow-sm"
                  placeholder="Select Representative"
                  allowClear
                >
                  <Select.Option value="rep1">JAWAHAR GANGA</Select.Option>
                  <Select.Option value="rep2">R KANI</Select.Option>
                  <Select.Option value="rep3">TAMIL SAM</Select.Option>
                </Select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">Client</label>
                <Select
                  size="large"
                  value={localFilters.client}
                  onChange={(value) => handleChange("client", value)}
                  className="w-full shadow-sm"
                  placeholder="Select Client"
                  allowClear
                >
                  <Select.Option value="client1">SCHORLWATA & HARTFORD MDS</Select.Option>
                  <Select.Option value="client2">MELODY</Select.Option>
                  <Select.Option value="client3">PRIVILEGE DX MEDICAL LAB</Select.Option>
                </Select>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 mt-6 pt-5 border-t border-gray-200">
              <Button
                onClick={handleClear}
                className="rounded-lg border border-gray-300 px-4 sm:px-5 py-2 text-xs sm:text-sm font-semibold text-gray-700 transition hover:border-indigo-600 hover:text-indigo-600"
              >
                Reset
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                className="btn-primary rounded-lg px-4 sm:px-5 py-2 text-xs sm:text-sm font-semibold shadow-md bg-indigo-600 hover:bg-indigo-700"
              >
                Generate Report
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default FilterPanel;
