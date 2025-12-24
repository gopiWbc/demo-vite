import { useState } from "react";
import { Input, Select } from "antd";
import { Filter, ChevronDown, ChevronUp, Search as SearchIcon } from "lucide-react";
import PhysicianActiveFilters from "./PhysicianActiveFilters";
import type { PhysicianFilterValues } from "./PhysicianList";

interface PhysicianFilterProps {
  filters: PhysicianFilterValues;
  onFilterChange: (filters: PhysicianFilterValues) => void;
  onSearch: () => void;
  onClearAll: () => void;
}

const PhysicianFilterComponent = ({
  filters,
  onFilterChange,
  onSearch,
  onClearAll,
}: PhysicianFilterProps) => {
  const [showFilters, setShowFilters] = useState(true);

  const handleChange = <Key extends keyof PhysicianFilterValues>(
    key: Key,
    value: PhysicianFilterValues[Key]
  ) => {
    onFilterChange({ ...filters, [key]: value });
  };

  const removeFilter = (key: keyof PhysicianFilterValues) => {
    onFilterChange({ ...filters, [key]: "" });
  };

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

          {(filters.physicianId ||
            filters.firstName ||
            filters.lastName) && (
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
              {/* Physician ID */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">
                  Physician ID
                </label>
                <Input
                  placeholder="Search by physician ID"
                  prefix={<SearchIcon className="h-4 w-4 text-gray-400" />}
                  value={filters.physicianId}
                  onChange={(e) => handleChange("physicianId", e.target.value)}
                  allowClear
                  size="large"
                  className="shadow-sm"
                  onPressEnter={onSearch}
                />
              </div>

              {/* First name */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">
                  First name
                </label>
                <Input
                  placeholder="Search by first name"
                  prefix={<SearchIcon className="h-4 w-4 text-gray-400" />}
                  value={filters.firstName}
                  onChange={(e) => handleChange("firstName", e.target.value)}
                  allowClear
                  size="large"
                  className="shadow-sm"
                  onPressEnter={onSearch}
                />
              </div>

              {/* Last name */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">
                  Last name
                </label>
                <Input
                  placeholder="Search by last name"
                  prefix={<SearchIcon className="h-4 w-4 text-gray-400" />}
                  value={filters.lastName}
                  onChange={(e) => handleChange("lastName", e.target.value)}
                  allowClear
                  size="large"
                  className="shadow-sm"
                  onPressEnter={onSearch}
                />
              </div>

              {/* Filter By */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">
                  Filter By
                </label>
                <Select
                  value={filters.state || undefined}
                  onChange={(value) => handleChange("state", value)}
                  className="w-full shadow-sm"
                  size="large"
                  placeholder="--Select filter--"
                  options={[
                    { label: "Name", value: "name" },
                    { label: "Email", value: "email" },
                    { label: "City", value: "city" },
                  ]}
                  allowClear
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 mt-6 pt-5 border-t border-gray-200">
              <button
                onClick={onClearAll}
                className="rounded-lg border border-gray-300 px-4 sm:px-5 py-2 text-xs sm:text-sm font-semibold text-gray-700 transition hover:border-indigo-600 hover:text-indigo-600 flex-1 sm:flex-initial"
              >
                Reset
              </button>
              <button
                onClick={onSearch}
                className="btn-primary rounded-lg px-4 sm:px-5 py-2 text-xs sm:text-sm font-semibold shadow-md bg-indigo-600 text-white hover:bg-indigo-700 flex-1 sm:flex-initial"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      </div>

      <PhysicianActiveFilters filters={filters} onRemoveFilter={removeFilter} />
    </>
  );
};

export default PhysicianFilterComponent;
