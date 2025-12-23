import { Badge } from "antd";
import { X } from "lucide-react";
import type { UserFilterValues } from "./UserList";

interface UserActiveFiltersProps {
  filters: UserFilterValues;
  onRemoveFilter: (key: keyof UserFilterValues, value?: string) => void;
}

const UserActiveFilters = ({ filters, onRemoveFilter }: UserActiveFiltersProps) => {
  const hasActiveFilters =
    filters.firstName ||
    filters.lastName ||
    filters.email ||
    filters.role ||
    filters.status ||
    filters.username ||
    filters.clientId ||
    filters.phone;

  if (!hasActiveFilters) return null;

  return (
    <div className="px-2">
      <div className="flex items-start gap-2 flex-wrap">
        <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide pt-1.5">
          Active Filters:
        </span>
        <div className="flex flex-wrap gap-2">
          {filters.firstName && (
            <Badge
              count={
                <X
                  className="h-3 w-3 cursor-pointer"
                  onClick={() => onRemoveFilter("firstName")}
                />
              }
              style={{ backgroundColor: "#eef2ff", color: "#4338ca" }}
            >
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-100 text-indigo-700 text-xs font-medium rounded-full">
                First Name: {filters.firstName}
              </span>
            </Badge>
          )}

          {filters.lastName && (
            <Badge
              count={
                <X
                  className="h-3 w-3 cursor-pointer"
                  onClick={() => onRemoveFilter("lastName")}
                />
              }
              style={{ backgroundColor: "#eef2ff", color: "#4338ca" }}
            >
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-100 text-indigo-700 text-xs font-medium rounded-full">
                Last Name: {filters.lastName}
              </span>
            </Badge>
          )}

          {filters.email && (
            <Badge
              count={
                <X
                  className="h-3 w-3 cursor-pointer"
                  onClick={() => onRemoveFilter("email")}
                />
              }
              style={{ backgroundColor: "#eef2ff", color: "#4338ca" }}
            >
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-100 text-indigo-700 text-xs font-medium rounded-full">
                Email: {filters.email}
              </span>
            </Badge>
          )}

          {filters.role && (
            <Badge
              count={
                <X
                  className="h-3 w-3 cursor-pointer"
                  onClick={() => onRemoveFilter("role")}
                />
              }
              style={{ backgroundColor: "#eef2ff", color: "#4338ca" }}
            >
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-100 text-indigo-700 text-xs font-medium rounded-full">
                Role: {filters.role}
              </span>
            </Badge>
          )}

          {filters.status && (
            <Badge
              count={
                <X
                  className="h-3 w-3 cursor-pointer"
                  onClick={() => onRemoveFilter("status")}
                />
              }
              style={{ backgroundColor: "#eef2ff", color: "#4338ca" }}
            >
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-100 text-indigo-700 text-xs font-medium rounded-full">
                Status: {filters.status}
              </span>
            </Badge>
          )}

          {filters.username && (
            <Badge
              count={
                <X
                  className="h-3 w-3 cursor-pointer"
                  onClick={() => onRemoveFilter("username")}
                />
              }
              style={{ backgroundColor: "#eef2ff", color: "#4338ca" }}
            >
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-100 text-indigo-700 text-xs font-medium rounded-full">
                Username: {filters.username}
              </span>
            </Badge>
          )}

          {filters.clientId && (
            <Badge
              count={
                <X
                  className="h-3 w-3 cursor-pointer"
                  onClick={() => onRemoveFilter("clientId")}
                />
              }
              style={{ backgroundColor: "#eef2ff", color: "#4338ca" }}
            >
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-100 text-indigo-700 text-xs font-medium rounded-full">
                Client ID: {filters.clientId}
              </span>
            </Badge>
          )}

          {filters.phone && (
            <Badge
              count={
                <X
                  className="h-3 w-3 cursor-pointer"
                  onClick={() => onRemoveFilter("phone")}
                />
              }
              style={{ backgroundColor: "#eef2ff", color: "#4338ca" }}
            >
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-100 text-indigo-700 text-xs font-medium rounded-full">
                Phone: {filters.phone}
              </span>
            </Badge>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserActiveFilters;
