import { useState } from "react";
import { Input, Select } from "antd";
import { Filter, ChevronDown, ChevronUp, Search as SearchIcon } from "lucide-react";

export type SupplyFilterValues = {
  code: string;
  name: string;
  category: string;
  status: string;
};

type SupplyFilterProps = {
  filters: SupplyFilterValues;
  onFilterChange: (filters: SupplyFilterValues) => void;
  onSearch: () => void;
  onClearAll: () => void;
};

const categories = [
  { label: "--Select--", value: "" },
  { label: "Containers", value: "Containers" },
  { label: "Swabs", value: "Swabs" },
  { label: "Kits", value: "Kits" },
  { label: "Forms", value: "Forms" },
];

const statusOptions = [
  { label: "Active", value: "Active" },
  { label: "Inactive", value: "Inactive" },
];

const SupplyOrderFilterComponent = ({ filters, onFilterChange, onSearch, onClearAll }: SupplyFilterProps) => {
  const [showFilters, setShowFilters] = useState(true);

  const handleChange = <Key extends keyof SupplyFilterValues>(key: Key, value: SupplyFilterValues[Key]) => {
    onFilterChange({ ...filters, [key]: value });
  };

  const removeFilter = (key: keyof SupplyFilterValues) => {
    onFilterChange({ ...filters, [key]: "" });
  };

  const hasActive = Object.values(filters).some(Boolean);

  return (
    <>
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="px-4 sm:px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <button
            onClick={() => setShowFilters((prev) => !prev)}
            className="flex items-center gap-2 text-sm font-semibold text-gray-700 hover:text-indigo-800 transition"
          >
            <Filter className="h-4 w-4" />
            <span>Filters</span>
            {showFilters ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </button>
          {hasActive && (
            <span className="text-sm font-medium text-indigo-600 hover:text-indigo-700 cursor-pointer transition" onClick={onClearAll}>
              Clear all
            </span>
          )}
        </div>

        <div className={`transition-all duration-300 ease-in-out overflow-hidden ${showFilters ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"}`}>
          <div className="px-4 sm:px-6 py-5 bg-gray-50 border-b border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">Code</label>
                <Input
                  placeholder="Search by code"
                  prefix={<SearchIcon className="h-4 w-4 text-gray-400" />}
                  value={filters.code}
                  onChange={(e) => handleChange("code", e.target.value)}
                  allowClear
                  size="large"
                  className="shadow-sm"
                  onPressEnter={onSearch}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">Name</label>
                <Input
                  placeholder="Search by name"
                  prefix={<SearchIcon className="h-4 w-4 text-gray-400" />}
                  value={filters.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  allowClear
                  size="large"
                  className="shadow-sm"
                  onPressEnter={onSearch}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">Category</label>
                <Select
                  value={filters.category || undefined}
                  onChange={(value) => handleChange("category", value)}
                  className="w-full shadow-sm"
                  size="large"
                  placeholder="--Select--"
                  options={categories}
                  allowClear
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">Status</label>
                <Select
                  value={filters.status || undefined}
                  onChange={(value) => handleChange("status", value)}
                  className="w-full shadow-sm"
                  size="large"
                  placeholder="--Select--"
                  options={statusOptions}
                  allowClear
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 mt-6 pt-5 border-t border-gray-200">
              <button onClick={onClearAll} className="rounded-lg border border-gray-300 px-4 sm:px-5 py-2 text-xs sm:text-sm font-semibold text-gray-700 transition hover:border-indigo-600 hover:text-indigo-600">
                Reset
              </button>
              <button onClick={onSearch} className="btn-primary rounded-lg px-4 sm:px-5 py-2 text-xs sm:text-sm font-semibold shadow-md bg-indigo-600 text-white hover:bg-indigo-700">
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Active Filters (simple pills) */}
      <div className="mt-2 flex flex-wrap gap-2">
        {(
          [
            { key: "code", label: "Code", value: filters.code },
            { key: "name", label: "Name", value: filters.name },
            { key: "category", label: "Category", value: filters.category },
            { key: "status", label: "Status", value: filters.status },
          ] as const
        )
          .filter((f) => f.value)
          .map((f) => (
            <span key={f.key} className="inline-flex items-center gap-1 rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">
              {f.label}: {f.value}
              <button className="ml-1 text-indigo-500 hover:text-indigo-700" onClick={() => removeFilter(f.key)}>
                ×
              </button>
            </span>
          ))}
      </div>
    </>
  );
};

export default SupplyOrderFilterComponent;
