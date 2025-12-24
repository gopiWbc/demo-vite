import { useState } from "react";
import { Input, Select } from "antd";
import { Filter, ChevronDown, ChevronUp, Search as SearchIcon } from "lucide-react";
import ClientActiveFilters from "./ClientActiveFilters";
import type { ClientFilterValues } from "./types";

type ClientFilterProps = {
  filters: ClientFilterValues;
  onFilterChange: (filters: ClientFilterValues) => void;
  onSearch: () => void;
  onClearAll: () => void;
};

const clientTypes = [
  { label: "Lab", value: "Lab" },
  { label: "IPA", value: "IPA" },
];

const ClientFilterComponent = ({
  filters,
  onFilterChange,
  onSearch,
  onClearAll,
}: ClientFilterProps) => {
  const [showFilters, setShowFilters] = useState(true);

  const handleChange = <Key extends keyof ClientFilterValues>(
    key: Key,
    value: ClientFilterValues[Key]
  ) => {
    onFilterChange({ ...filters, [key]: value });
  };

  const removeFilter = (key: keyof ClientFilterValues) => {
    onFilterChange({ ...filters, [key]: "" });
  };

  const hasActiveFilters = Object.values(filters).some(Boolean);

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
            {showFilters ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
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
            showFilters ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="px-4 sm:px-6 py-5 bg-gray-50 border-b border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">
                  Client ID
                </label>
                <Input
                  placeholder="Search by client ID"
                  prefix={<SearchIcon className="h-4 w-4 text-gray-400" />}
                  value={filters.clientId}
                  onChange={(e) => handleChange("clientId", e.target.value)}
                  allowClear
                  size="large"
                  className="shadow-sm"
                  onPressEnter={onSearch}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">
                  Client Name
                </label>
                <Input
                  placeholder="Search by client name"
                  prefix={<SearchIcon className="h-4 w-4 text-gray-400" />}
                  value={filters.clientName}
                  onChange={(e) => handleChange("clientName", e.target.value)}
                  allowClear
                  size="large"
                  className="shadow-sm"
                  onPressEnter={onSearch}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">
                  Type
                </label>
                <Select
                  value={filters.type || undefined}
                  onChange={(value) => handleChange("type", value)}
                  className="w-full shadow-sm"
                  size="large"
                  placeholder="--Select--"
                  options={clientTypes}
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

      <ClientActiveFilters
        filters={filters}
        onRemoveFilter={(key) => removeFilter(key as keyof ClientFilterValues)}
      />
    </>
  );
};

export default ClientFilterComponent;
