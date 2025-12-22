import { Badge } from "antd";
import { X } from "lucide-react";
import type { OrderFilterValues } from "./types";

interface OrderActiveFiltersProps {
  filters: OrderFilterValues;
  onRemoveFilter: (key: keyof OrderFilterValues, value?: string) => void;
}

const OrderActiveFilters = ({ filters, onRemoveFilter }: OrderActiveFiltersProps) => {
  const hasActiveFilters =
    filters.patientId ||
    filters.clientId ||
    filters.patientName ||
    filters.status.length > 0;

  if (!hasActiveFilters) return null;

  return (
    <div className="px-2">
      <div className="flex items-start gap-2 flex-wrap">
        <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide pt-1.5">
          Active Filters:
        </span>
        <div className="flex flex-wrap gap-2">
          {filters.patientName && (
            <Badge
              count={
                <X
                  className="h-3 w-3 cursor-pointer"
                  onClick={() => onRemoveFilter("patientName")}
                />
              }
              style={{ backgroundColor: "#eef2ff", color: "#4338ca" }}
            >
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-100 text-indigo-700 text-xs font-medium rounded-full">
                Patient: {filters.patientName.substring(0, 20)}
                {filters.patientName.length > 20 && "..."}
              </span>
            </Badge>
          )}

          {filters.patientId && (
            <Badge
              count={
                <X
                  className="h-3 w-3 cursor-pointer"
                  onClick={() => onRemoveFilter("patientId")}
                />
              }
              style={{ backgroundColor: "#eef2ff", color: "#4338ca" }}
            >
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-100 text-indigo-700 text-xs font-medium rounded-full">
                Patient ID: {filters.patientId}
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

          {filters.status.map((status) => (
            <Badge
              key={status}
              count={
                <X
                  className="h-3 w-3 cursor-pointer"
                  onClick={() => onRemoveFilter("status", status)}
                />
              }
              style={{ backgroundColor: "#eef2ff", color: "#4338ca" }}
            >
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-100 text-indigo-700 text-xs font-medium rounded-full">
                Status: {status}
              </span>
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderActiveFilters;
