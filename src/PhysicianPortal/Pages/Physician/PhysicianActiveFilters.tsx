import { Badge } from "antd";
import { X } from "lucide-react";
import type { PhysicianFilterValues } from "./PhysicianList";

interface PhysicianActiveFiltersProps {
  filters: PhysicianFilterValues;
  onRemoveFilter: (key: keyof PhysicianFilterValues, value?: string) => void;
}

const PhysicianActiveFilters = ({ filters, onRemoveFilter }: PhysicianActiveFiltersProps) => {
  const hasActiveFilters =
    filters.physicianId ||
    filters.firstName ||
    filters.lastName ||
    filters.email ||
    filters.phone1 ||
    filters.city ||
    filters.state ||
    filters.zipCode;

  if (!hasActiveFilters) return null;

  return (
    <div className="px-2">
      <div className="flex items-start gap-2 flex-wrap">
        <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide pt-1.5">
          Active Filters:
        </span>
        <div className="flex flex-wrap gap-2">
          {filters.physicianId && (
            <Badge
              count={
                <X
                  className="h-3 w-3 cursor-pointer"
                  onClick={() => onRemoveFilter("physicianId")}
                />
              }
              style={{ backgroundColor: "#eef2ff", color: "#4338ca" }}
            >
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-100 text-indigo-700 text-xs font-medium rounded-full">
                Physician ID: {filters.physicianId}
              </span>
            </Badge>
          )}

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

          {filters.phone1 && (
            <Badge
              count={
                <X
                  className="h-3 w-3 cursor-pointer"
                  onClick={() => onRemoveFilter("phone1")}
                />
              }
              style={{ backgroundColor: "#eef2ff", color: "#4338ca" }}
            >
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-100 text-indigo-700 text-xs font-medium rounded-full">
                Phone: {filters.phone1}
              </span>
            </Badge>
          )}

          {filters.city && (
            <Badge
              count={
                <X
                  className="h-3 w-3 cursor-pointer"
                  onClick={() => onRemoveFilter("city")}
                />
              }
              style={{ backgroundColor: "#eef2ff", color: "#4338ca" }}
            >
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-100 text-indigo-700 text-xs font-medium rounded-full">
                City: {filters.city}
              </span>
            </Badge>
          )}

          {filters.state && (
            <Badge
              count={
                <X
                  className="h-3 w-3 cursor-pointer"
                  onClick={() => onRemoveFilter("state")}
                />
              }
              style={{ backgroundColor: "#eef2ff", color: "#4338ca" }}
            >
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-100 text-indigo-700 text-xs font-medium rounded-full">
                State: {filters.state}
              </span>
            </Badge>
          )}

          {filters.zipCode && (
            <Badge
              count={
                <X
                  className="h-3 w-3 cursor-pointer"
                  onClick={() => onRemoveFilter("zipCode")}
                />
              }
              style={{ backgroundColor: "#eef2ff", color: "#4338ca" }}
            >
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-100 text-indigo-700 text-xs font-medium rounded-full">
                ZipCode: {filters.zipCode}
              </span>
            </Badge>
          )}
        </div>
      </div>
    </div>
  );
};

export default PhysicianActiveFilters;
