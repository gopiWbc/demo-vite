import { useState } from "react";
import { Input, Select } from "antd";
import { Filter, ChevronUp, ChevronDown, Search as SearchIcon } from "lucide-react";

export type IcdCodeFilterValues = {
  icdNumber: string;
  icdName: string;
  codeType: string;
  filterBy: string;
};

type IcdCodeFilterProps = {
  filters: IcdCodeFilterValues;
  onFilterChange: (filters: IcdCodeFilterValues) => void;
  onSearch: () => void;
  onClearAll: () => void;
  codeTypeOptions?: { label: string; value: string }[];
  filterByOptions?: { label: string; value: string }[];
};

const defaultCodeTypeOptions = [
  { label: "--Select--", value: "" },
  { label: "ICD9", value: "ICD9" },
  { label: "ICD10", value: "ICD10" },
];

const defaultFilterByOptions = [
  { label: "--Select filter--", value: "" },
  { label: "All", value: "all" },
  { label: "Active", value: "active" },
  { label: "Inactive", value: "inactive" },
];

const IcdCodeFilterComponent = ({
  filters,
  onFilterChange,
  onSearch,
  onClearAll,
  codeTypeOptions = defaultCodeTypeOptions,
  filterByOptions = defaultFilterByOptions,
}: IcdCodeFilterProps) => {
  const [expanded, setExpanded] = useState(true);

  const handleChange = <Key extends keyof IcdCodeFilterValues>(key: Key, value: IcdCodeFilterValues[Key]) => {
    onFilterChange({ ...filters, [key]: value });
  };

  const removeFilter = (key: keyof IcdCodeFilterValues) => onFilterChange({ ...filters, [key]: "" });

  const hasActiveFilters = Object.values(filters).some(Boolean);

  return (
    <>
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
            <span className="text-sm font-medium text-indigo-600 hover:text-indigo-700 cursor-pointer transition" onClick={onClearAll}>
              Clear all
            </span>
          )}
        </div>

        <div className={`transition-all duration-300 ease-in-out overflow-hidden ${expanded ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"}`}>
          <div className="px-4 sm:px-6 py-5 bg-gray-50 border-b border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">ICD number</label>
                <Input
                  size="large"
                  placeholder="Search by ICD number"
                  prefix={<SearchIcon className="h-4 w-4 text-gray-400" />}
                  value={filters.icdNumber}
                  allowClear
                  onChange={(event) => handleChange("icdNumber", event.target.value)}
                  onPressEnter={onSearch}
                  className="shadow-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">ICD name</label>
                <Input
                  size="large"
                  placeholder="Search by ICD name"
                  prefix={<SearchIcon className="h-4 w-4 text-gray-400" />}
                  value={filters.icdName}
                  allowClear
                  onChange={(event) => handleChange("icdName", event.target.value)}
                  onPressEnter={onSearch}
                  className="shadow-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">ICD code type</label>
                <Select
                  size="large"
                  value={filters.codeType || undefined}
                  onChange={(value) => handleChange("codeType", value)}
                  placeholder="--Select--"
                  options={codeTypeOptions}
                  className="w-full shadow-sm"
                  allowClear
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">Filter by</label>
                <Select
                  size="large"
                  value={filters.filterBy || undefined}
                  onChange={(value) => handleChange("filterBy", value)}
                  placeholder="--Select filter--"
                  options={filterByOptions}
                  className="w-full shadow-sm"
                  allowClear
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

      <div className="my-6 flex flex-wrap gap-2">
        {(
          [
            { key: "icdNumber", label: "ICD number", value: filters.icdNumber },
            { key: "icdName", label: "ICD name", value: filters.icdName },
            { key: "codeType", label: "ICD code type", value: filters.codeType },
            { key: "filterBy", label: "Filter by", value: filters.filterBy },
          ] as const
        )
          .filter((filter) => filter.value)
          .map((filter) => (
            <span key={filter.key} className="inline-flex items-center gap-1 rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">
              {filter.label}: {filter.value}
              <button className="ml-1 text-indigo-500 hover:text-indigo-700" onClick={() => removeFilter(filter.key)}>
                ×
              </button>
            </span>
          ))}
      </div>
    </>
  );
};

export default IcdCodeFilterComponent;
