import { useState } from "react";
import { Input, Radio, Select } from "antd";
import { Filter, ChevronDown, ChevronUp, Search as SearchIcon } from "lucide-react";
import UserActiveFilters from "./UserActiveFilters";
import type { UserFilterValues } from "./UserList";

interface UserFilterProps {
  filters: UserFilterValues;
  onFilterChange: (filters: UserFilterValues) => void;
  onSearch: () => void;
  onClearAll: () => void;
}

const UserFilterComponent = ({
  filters,
  onFilterChange,
  onSearch,
  onClearAll,
}: UserFilterProps) => {
  const [showFilters, setShowFilters] = useState(true);

  const handleChange = <Key extends keyof UserFilterValues>(
    key: Key,
    value: UserFilterValues[Key]
  ) => {
    onFilterChange({ ...filters, [key]: value });
  };

  const removeFilter = (key: keyof UserFilterValues) => {
    onFilterChange({ ...filters, [key]: "" });
  };

  const roles = [
    { label: "Administrator", value: "Administrator" },
    { label: "Physician", value: "Physician" },
    { label: "Lab Technician", value: "Lab Technician" },
    { label: "Front Desk", value: "Front Desk" },
  ];

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

          {(filters.firstName ||
            filters.lastName ||
            filters.email ||
            filters.role ||
            filters.status ||
            filters.username ||
            filters.clientId ||
            filters.phone) && (
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
                  Username
                </label>
                <Input
                  placeholder="Search by username"
                  prefix={<SearchIcon className="h-4 w-4 text-gray-400" />}
                  value={filters.username}
                  onChange={(e) => handleChange("username", e.target.value)}
                  allowClear
                  size="large"
                  className="shadow-sm"
                  onPressEnter={onSearch}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">
                  Last Name
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
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">
                  First Name
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
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">
                  Email
                </label>
                <Input
                  placeholder="Search by email"
                  prefix={<SearchIcon className="h-4 w-4 text-gray-400" />}
                  value={filters.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  allowClear
                  size="large"
                  className="shadow-sm"
                  onPressEnter={onSearch}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">
                  Phone
                </label>
                <Input
                  placeholder="Search by phone"
                  prefix={<SearchIcon className="h-4 w-4 text-gray-400" />}
                  value={filters.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
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
                  onChange={(e) => handleChange("clientId", e.target.value)}
                  allowClear
                  size="large"
                  className="shadow-sm"
                  onPressEnter={onSearch}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">
                  User Type
                </label>
                <Select
                  value={filters.role || undefined}
                  onChange={(value) => handleChange("role", value)}
                  className="w-full shadow-sm"
                  size="large"
                  placeholder="--Select--"
                  options={roles}
                  allowClear
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">
                  User Status
                </label>
                <Radio.Group
                  value={filters.status}
                  onChange={(e) => handleChange("status", e.target.value)}
                  className="flex gap-4 pt-2"
                >
                  <Radio value="Active">Active</Radio>
                  <Radio value="Inactive">Inactive</Radio>
                </Radio.Group>
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

      <UserActiveFilters filters={filters} onRemoveFilter={removeFilter} />
    </>
  );
};

export default UserFilterComponent;
