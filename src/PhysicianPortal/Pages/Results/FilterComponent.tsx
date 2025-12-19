
import { DatePicker, Input, Checkbox } from "antd";
import { Filter, ChevronUp, ChevronDown, Badge, Search } from "lucide-react";
import { useState } from "react";
import ActiveFilters from "./ActiveFilter";
import type { FilterValues } from "./types";

const { RangePicker } = DatePicker;

type FiltersComponentProps = {
  filters: FilterValues;
  onFilterChange: (filters: FilterValues) => void;
  activeFilterCount: number;
  onSearch: () => void;
  onClearAll: () => void;
};


const FiltersComponent = ({ 
  filters, 
  onFilterChange, 
  activeFilterCount,
  onSearch,
  onClearAll
}: FiltersComponentProps) => {
  const [showFilters, setShowFilters] = useState(false);

  const handleFilterChange = (key: keyof FilterValues, value: any) => {
    onFilterChange({ ...filters, [key]: value });
  };

  const removeFilter = (key: keyof FilterValues, value?: string) => {
    if (key === "status" || key === "category") {
      onFilterChange({
        ...filters,
        [key]: filters[key].filter((item) => item !== value),
      });
    } else {
      onFilterChange({ ...filters, [key]: key === "dateRange" ? [null, null] : "" });
    }
  };

  return (
    <>
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        {/* Filter Header */}
        <div className="px-4 sm:px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <button
            onClick={() => setShowFilters(!showFilters)}
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
          {activeFilterCount > 0 && (
            <span
              className="text-sm font-medium text-indigo-600 hover:text-indigo-700 cursor-pointer transition"
              onClick={onClearAll}
            >
              Clear all
            </span>
          )}
        </div>

        {/* Filter Content with Animation */}
        <div
          className={`transition-all duration-300 ease-in-out overflow-hidden ${
            showFilters ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="px-4 sm:px-6 py-5 bg-gray-50 border-b border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5">
              <div className="mb-5">
                <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">
                  Patient Name
                </label>
                <Input
                  placeholder="Search by patient name"
                  prefix={<Search className="h-4 w-4 text-gray-400" />}
                  value={filters.patientName}
                  onChange={(e) => handleFilterChange("patientName", e.target.value)}
                  allowClear
                  size="large"
                  className="shadow-sm"
                  onPressEnter={onSearch}
                />
              </div>
              <div className="mb-5">
                <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">
                  Patient ID
                </label>
                <Input
                  placeholder="Search by patient ID"
                  prefix={<Search className="h-4 w-4 text-gray-400" />}
                  value={filters.patientId}
                  onChange={(e) => handleFilterChange("patientId", e.target.value)}
                  allowClear
                  size="large"
                  className="shadow-sm"
                  onPressEnter={onSearch}
                />
              </div>
              <div className="flex justify-between gap-4">
                {/* Status */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-3 uppercase tracking-wide">
                    Status
                  </label>
                  <Checkbox.Group
                    value={filters.status}
                    onChange={(values) => handleFilterChange("status", values)}
                    className="flex  gap-2.5"
                  >
                    <Checkbox value="Preliminary" className="text-sm">
                      Preliminary
                    </Checkbox>
                    <Checkbox value="Final" className="text-sm">
                      Final
                    </Checkbox>
                  </Checkbox.Group>
                </div>

                {/* Category */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-3 uppercase tracking-wide">
                    Category
                  </label>
                  <Checkbox.Group
                    value={filters.category}
                    onChange={(values) =>
                      handleFilterChange("category", values)
                    }
                    className="flex gap-2.5"
                  >
                    <Checkbox value="Routine" className="text-sm">
                      Routine
                    </Checkbox>
                    <Checkbox value="Critical" className="text-sm">
                      Critical
                    </Checkbox>
                  </Checkbox.Group>
                </div>
              </div>

              {/* Date Range */}
              <div className="md:col-span-2 lg:col-span-1">
                <label className="block text-xs font-semibold text-gray-700 mb-3 uppercase tracking-wide">
                  Date Range
                </label>
                <RangePicker
                  value={filters.dateRange}
                  onChange={(dates) => handleFilterChange("dateRange", dates)}
                  className="w-full shadow-sm"
                  size="large"
                  format="MM/DD/YYYY"
                  placeholder={["Start Date", "End Date"]}
                />
              </div>

              {/* Provider Filter */}
              <div className="md:col-span-2 lg:col-span-1">
                <label className="block text-xs font-semibold text-gray-700 mb-3 uppercase tracking-wide">
                  Ordering Provider
                </label>
                <Input
                  placeholder="Provider name or NPI"
                  value={filters.provider}
                  onChange={(e) =>
                    handleFilterChange("provider", e.target.value)
                  }
                  allowClear
                  size="large"
                  className="shadow-sm"
                />
              </div>
            </div>

            {/* Action Buttons */}
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

      {/* Active Filters - Separate Component */}
      <ActiveFilters filters={filters} onRemoveFilter={removeFilter} />
    </>
  );
};

export default FiltersComponent;