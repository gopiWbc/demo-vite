import { useState } from "react";
import { DatePicker, Input, Select } from "antd";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import { ChevronDown, ChevronUp, Filter, Search as SearchIcon } from "lucide-react";

import type { TransactionFilterValues } from "./types";

const dateFormat = "MM/DD/YYYY";
const { RangePicker } = DatePicker;

const typeOptions = [
  { label: "--Select--", value: "" },
  { label: "Inbound", value: "INBOUND" },
  { label: "Outbound", value: "OUTBOUND" },
];

const TransactionFilterComponent = ({
  filters,
  onFilterChange,
  onSearch,
  onClearAll,
}: {
  filters: TransactionFilterValues;
  onFilterChange: (filters: TransactionFilterValues) => void;
  onSearch: () => void;
  onClearAll: () => void;
}) => {
  const [expanded, setExpanded] = useState(true);

  const handleChange = <Key extends keyof TransactionFilterValues>(key: Key, value: TransactionFilterValues[Key]) => {
    onFilterChange({ ...filters, [key]: value });
  };

  const toRangeValue = (range: [string | null, string | null]): [Dayjs | null, Dayjs | null] => [
    range[0] ? dayjs(range[0], dateFormat) : null,
    range[1] ? dayjs(range[1], dateFormat) : null,
  ];

  const handleRangeChange = (
    key: "receivedRange" | "processedRange",
    dateStrings: [string, string],
  ) => {
    onFilterChange({
      ...filters,
      [key]: [dateStrings[0] || null, dateStrings[1] || null],
    });
  };

  const hasActiveFilters = [
    filters.clientId,
    filters.name,
    filters.accessionId,
    filters.server,
    filters.patientId,
    filters.type,
    filters.receivedRange[0],
    filters.receivedRange[1],
    filters.processedRange[0],
    filters.processedRange[1],
  ].some(Boolean);

  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
      <div className="px-4 sm:px-6 py-4 border-b border-gray-200 flex items-center justify-between">
        <button
          onClick={() => setExpanded((prev) => !prev)}
          className="flex items-center gap-2 text-sm font-semibold text-gray-700 hover:text-indigo-800 transition"
        >
          <Filter className="h-4 w-4" />
          <span>Filters</span>
          {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </button>
        {hasActiveFilters && (
          <span
            className="text-sm font-medium text-indigo-600 hover:text-indigo-700 cursor-pointer transition"
            onClick={onClearAll}
          >
            Clear all
          </span>
        )}
      </div>

      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          expanded ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 sm:px-6 py-5 bg-gray-50 border-b border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">Client ID</label>
              <Input
                size="large"
                placeholder="Search by client ID"
                prefix={<SearchIcon className="h-4 w-4 text-gray-400" />}
                value={filters.clientId}
                onChange={(event) => handleChange("clientId", event.target.value)}
                allowClear
                className="shadow-sm"
                onPressEnter={onSearch}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">Name</label>
              <Input
                size="large"
                placeholder="Search by name"
                prefix={<SearchIcon className="h-4 w-4 text-gray-400" />}
                value={filters.name}
                onChange={(event) => handleChange("name", event.target.value)}
                allowClear
                className="shadow-sm"
                onPressEnter={onSearch}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">Accession ID</label>
              <Input
                size="large"
                placeholder="Search by accession ID"
                prefix={<SearchIcon className="h-4 w-4 text-gray-400" />}
                value={filters.accessionId}
                onChange={(event) => handleChange("accessionId", event.target.value)}
                allowClear
                className="shadow-sm"
                onPressEnter={onSearch}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">Server</label>
              <Input
                size="large"
                placeholder="Search by server"
                prefix={<SearchIcon className="h-4 w-4 text-gray-400" />}
                value={filters.server}
                onChange={(event) => handleChange("server", event.target.value)}
                allowClear
                className="shadow-sm"
                onPressEnter={onSearch}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">Patient ID</label>
              <Input
                size="large"
                placeholder="Search by patient ID"
                prefix={<SearchIcon className="h-4 w-4 text-gray-400" />}
                value={filters.patientId}
                onChange={(event) => handleChange("patientId", event.target.value)}
                allowClear
                className="shadow-sm"
                onPressEnter={onSearch}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">Type</label>
              <Select
                size="large"
                value={filters.type || undefined}
                onChange={(value) => handleChange("type", value)}
                options={typeOptions}
                className="w-full shadow-sm"
                allowClear
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">Received date</label>
              <RangePicker
                size="large"
                value={toRangeValue(filters.receivedRange)}
                onChange={(_, dateStrings) => handleRangeChange("receivedRange", dateStrings as [string, string])}
                format={dateFormat}
                className="shadow-sm w-full"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">Processed date</label>
              <RangePicker
                size="large"
                value={toRangeValue(filters.processedRange)}
                onChange={(_, dateStrings) => handleRangeChange("processedRange", dateStrings as [string, string])}
                format={dateFormat}
                className="shadow-sm w-full"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 mt-6 pt-5 border-t border-gray-200">
            <button
              onClick={onClearAll}
              className="rounded-lg border border-gray-300 px-4 sm:px-5 py-2 text-xs sm:text-sm font-semibold text-gray-700 transition hover:border-indigo-600 hover:text-indigo-600"
            >
              Reset
            </button>
            <button
              onClick={onSearch}
              className="btn-primary rounded-lg px-4 sm:px-5 py-2 text-xs sm:text-sm font-semibold shadow-md bg-indigo-600 text-white hover:bg-indigo-700"
            >
              Apply Filters
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionFilterComponent;
