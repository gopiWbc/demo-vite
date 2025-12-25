import { useState } from "react";
import { Input, Select } from "antd";
import { Filter, ChevronUp, ChevronDown, Search as SearchIcon } from "lucide-react";

export type DictionaryFilterValues = {
  testCode: string;
  language: string;
  data: string;
};

type DictionaryFilterProps = {
  filters: DictionaryFilterValues;
  onFilterChange: (filters: DictionaryFilterValues) => void;
  onSearch: () => void;
  onClearAll: () => void;
  testCodeOptions?: { label: string; value: string }[];
  languageOptions?: { label: string; value: string }[];
};

const defaultTestCodeOptions = [
  { label: "--Select--", value: "" },
  { label: "Widal Test", value: "WIDAL" },
  { label: "TC234343", value: "TC234343" },
  { label: "Kansamitha", value: "KANSAMITHA" },
  { label: "Test01", value: "TEST01" },
];

const defaultLanguageOptions = [
  { label: "--Select--", value: "" },
  { label: "English", value: "English" },
  { label: "Spanish", value: "Spanish" },
  { label: "Chinese", value: "Chinese" },
  { label: "Korean", value: "Korean" },
];

const DictionaryFilterComponent = ({
  filters,
  onFilterChange,
  onSearch,
  onClearAll,
  testCodeOptions = defaultTestCodeOptions,
  languageOptions = defaultLanguageOptions,
}: DictionaryFilterProps) => {
  const [expanded, setExpanded] = useState(true);

  const handleChange = <Key extends keyof DictionaryFilterValues>(key: Key, value: DictionaryFilterValues[Key]) => {
    onFilterChange({ ...filters, [key]: value });
  };

  const removeFilter = (key: keyof DictionaryFilterValues) => onFilterChange({ ...filters, [key]: "" });

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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">Test code</label>
                <Select
                  size="large"
                  value={filters.testCode || undefined}
                  onChange={(value) => handleChange("testCode", value)}
                  placeholder="--Select--"
                  options={testCodeOptions}
                  className="w-full shadow-sm"
                  allowClear
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">Language</label>
                <Select
                  size="large"
                  value={filters.language || undefined}
                  onChange={(value) => handleChange("language", value)}
                  placeholder="--Select--"
                  options={languageOptions}
                  className="w-full shadow-sm"
                  allowClear
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">Data</label>
                <Input
                  size="large"
                  placeholder="Search by data"
                  prefix={<SearchIcon className="h-4 w-4 text-gray-400" />}
                  value={filters.data}
                  allowClear
                  onChange={(event) => handleChange("data", event.target.value)}
                  onPressEnter={onSearch}
                  className="shadow-sm"
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
            { key: "testCode", label: "Test code", value: filters.testCode },
            { key: "language", label: "Language", value: filters.language },
            { key: "data", label: "Data", value: filters.data },
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

export default DictionaryFilterComponent;
