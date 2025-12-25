import { Badge } from "antd";
import { X } from "lucide-react";

import type { SalesLogFilterValues } from "./types";

type SalesLogActiveFiltersProps = {
  filters: SalesLogFilterValues;
  onRemoveFilter: (key: keyof SalesLogFilterValues) => void;
};

const labelMap: Record<keyof SalesLogFilterValues, string> = {
  logDate: "Log date",
  callbackDate: "Callback date",
  clientName: "Client name",
  visitStatus: "Visit status",
  salesTeam: "Sales Team",
};

const SalesLogActiveFilters = ({ filters, onRemoveFilter }: SalesLogActiveFiltersProps) => {
  const activeEntries = (Object.entries(filters) as [keyof SalesLogFilterValues, string][])?.filter(
    ([_, value]) => Boolean(value),
  );

  if (!activeEntries.length) return null;

  return (
    <div className="px-2">
      <div className="flex items-start gap-2 flex-wrap">
        <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide pt-1.5">Active Filters:</span>
        <div className="flex flex-wrap gap-2">
          {activeEntries.map(([key, value]) => (
            <Badge
              key={key}
              count={<X className="h-3 w-3 cursor-pointer" onClick={() => onRemoveFilter(key)} />}
              style={{ backgroundColor: "#eef2ff", color: "#4338ca" }}
            >
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-100 text-indigo-700 text-xs font-medium rounded-full">
                {labelMap[key]}: {value}
              </span>
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SalesLogActiveFilters;
