import { useState } from "react";
import { Checkbox, DatePicker, Input } from "antd";
import { Filter, ChevronDown, ChevronUp, Search as SearchIcon } from "lucide-react";
import type { OrderFilterValues } from "./types";
import OrderActiveFilters from "./OrderActiveFilters";

const { RangePicker } = DatePicker;

interface OrderFilterProps {
  filters: OrderFilterValues;
  onFilterChange: (filters: OrderFilterValues) => void;
  activeFilterCount: number;
  onSearch: () => void;
  onClearAll: () => void;
}

const OrderFilterComponent = ({
  filters,
  onFilterChange,
  activeFilterCount,
  onSearch,
  onClearAll,
}: OrderFilterProps) => {
  const [showFilters, setShowFilters] = useState(true);

  const handleChange = <Key extends keyof OrderFilterValues>(key: Key, value: OrderFilterValues[Key]) => {
    onFilterChange({ ...filters, [key]: value });
  };

  const removeFilter = (key: keyof OrderFilterValues, value?: string) => {
    switch (key) {
      case "status":
        onFilterChange({
          ...filters,
          status: filters.status.filter((item) => item !== value),
        });
        break;
      default:
        onFilterChange({ ...filters, [key]: "" });
        break;
    }
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
            {showFilters ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
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

        <div
          className={`transition-all duration-300 ease-in-out overflow-hidden ${
            showFilters ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="px-4 sm:px-6 py-5 bg-gray-50 border-b border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-5">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">
                  Patient ID
                </label>
                <Input
                  placeholder="Search by patient ID"
                  prefix={<SearchIcon className="h-4 w-4 text-gray-400" />}
                  value={filters.patientId}
                  onChange={(event) => handleChange("patientId", event.target.value)}
                  allowClear
                  size="large"
                  className="shadow-sm"
                  onPressEnter={onSearch}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">
                  Client ID
                </label>
                <Input
                  placeholder="Search by client ID"
                  prefix={<SearchIcon className="h-4 w-4 text-gray-400" />}
                  value={filters.clientId}
                  onChange={(event) => handleChange("clientId", event.target.value)}
                  allowClear
                  size="large"
                  className="shadow-sm"
                  onPressEnter={onSearch}
                />
              </div>

              <div className="">
                <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">
                  Patient Name
                </label>
                <Input
                  placeholder="Search by patient name"
                  prefix={<SearchIcon className="h-4 w-4 text-gray-400" />}
                  value={filters.patientName}
                  onChange={(event) => handleChange("patientName", event.target.value)}
                  allowClear
                  size="large"
                  className="shadow-sm"
                  onPressEnter={onSearch}
                />
              </div>

               <div>
                <label className="block text-xs font-semibold text-gray-700 mb-3 uppercase tracking-wide">
                  Date Range
                </label>
                <RangePicker
                  value={filters.dateRange}
                  onChange={(dates) =>
                    onFilterChange({
                      ...filters,
                      dateRange: dates ?? [null, null],
                    })
                  }
                  className="w-full shadow-sm"
                  size="large"
                  format="MM/DD/YYYY"
                  placeholder={["Start Date", "End Date"]}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-3 uppercase tracking-wide">
                  Status
                </label>
                <Checkbox.Group
                  value={filters.status}
                  onChange={(values) =>
                    handleChange(
                      "status",
                      (values as string[]).map((status) => status)
                    )
                  }
                  className="flex flex-wrap gap-4"
                >
                  {[
                    { label: "Pending", value: "Pending" },
                    { label: "Active", value: "Active" },
                    { label: "Completed", value: "Completed" },
                  ].map((status) => (
                    <Checkbox key={status.value} value={status.value} className="text-sm">
                      {status.label}
                    </Checkbox>
                  ))}
                </Checkbox.Group>
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

      <OrderActiveFilters filters={filters} onRemoveFilter={removeFilter} />
    </>
  );
};

export default OrderFilterComponent;
