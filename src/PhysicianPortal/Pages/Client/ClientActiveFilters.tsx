import { Badge } from "antd";
import { X } from "lucide-react";
import type { ClientFilterValues } from "./types";

type FilterKey = keyof ClientFilterValues;

export interface ClientActiveFiltersProps {
  filters: ClientFilterValues;
  onRemoveFilter: (key: FilterKey) => void;
}

const filterLabels: Record<FilterKey, string> = {
  clientId: "Client ID",
  clientName: "Client Name",
  type: "Type",
};

const ClientActiveFilters = ({ filters, onRemoveFilter }: ClientActiveFiltersProps) => {
  const activeEntries = (Object.keys(filters) as FilterKey[])
    .filter((key) => Boolean(filters[key]))
    .map((key) => ({ key, value: filters[key] }));

  if (!activeEntries.length) return null;

  return (
    <div className="px-2">
      <div className="flex items-start gap-2 flex-wrap">
        <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide pt-1.5">
          Active Filters:
        </span>
        <div className="flex flex-wrap gap-2">
          {activeEntries.map(({ key, value }) => (
            <Badge
              key={String(key)}
              count={
                <X
                  className="h-3 w-3 cursor-pointer"
                  onClick={() => onRemoveFilter(key)}
                />
              }
              style={{ backgroundColor: "#eef2ff", color: "#4338ca" }}
            >
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-100 text-indigo-700 text-xs font-medium rounded-full">
                {filterLabels[key]}: {value}
              </span>
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClientActiveFilters;
