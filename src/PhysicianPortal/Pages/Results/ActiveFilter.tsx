import { X } from "lucide-react";
import {Badge, Space } from "antd";
import type { FilterValues } from "./types";

const ActiveFilters = ({ 
  filters, 
  onRemoveFilter 
}: { 
  filters: FilterValues; 
  onRemoveFilter: (key: keyof FilterValues, value?: string) => void;
}) => {
  const hasActiveFilters = 
    filters.patientName || 
    filters.patientId ||
    filters.status.length > 0 || 
    filters.category.length > 0 || 
    (filters.dateRange[0] && filters.dateRange[1]) || 
    filters.provider;

  if (!hasActiveFilters) return null;

  return (
    <div className="px-2">
      <div className="flex items-start gap-2 flex-wrap">
        <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide pt-1.5">
          Active Filters:
        </span>
        <Space size={[8, 8]} wrap>
          {filters.patientName && (
            <Badge
              count={
                <X
                  className="h-3 w-3 cursor-pointer"
                  onClick={() => onRemoveFilter("patientName")}
                />
              }
              style={{ backgroundColor: '#eef2ff', color: '#4338ca' }}
            >
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-100 text-indigo-700 text-xs font-medium rounded-full">
                Patient Name: {filters.patientName.substring(0, 20)}
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
              style={{ backgroundColor: '#eef2ff', color: '#4338ca' }}
            >
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-100 text-indigo-700 text-xs font-medium rounded-full">
                Patient ID: {filters.patientId.substring(0, 20)}
                {filters.patientId.length > 20 && "..."}
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
              style={{ backgroundColor: '#eef2ff', color: '#4338ca' }}
            >
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-100 text-indigo-700 text-xs font-medium rounded-full">
                Status: {status}
              </span>
            </Badge>
          ))}
          {filters.category.map((category) => (
            <Badge
              key={category}
              count={
                <X
                  className="h-3 w-3 cursor-pointer"
                  onClick={() => onRemoveFilter("category", category)}
                />
              }
              style={{ backgroundColor: '#eef2ff', color: '#4338ca' }}
            >
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-100 text-indigo-700 text-xs font-medium rounded-full">
                Category: {category}
              </span>
            </Badge>
          ))}
          {filters.dateRange && filters.dateRange[0] && filters.dateRange[1] && (
            <Badge
              count={
                <X
                  className="h-3 w-3 cursor-pointer"
                  onClick={() => onRemoveFilter("dateRange")}
                />
              }
              style={{ backgroundColor: '#eef2ff', color: '#4338ca' }}
            >
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-100 text-indigo-700 text-xs font-medium rounded-full">
                Date: {filters.dateRange[0]?.format("MM/DD/YY")} -{" "}
                {filters.dateRange[1]?.format("MM/DD/YY")}
              </span>
            </Badge>
          )}
          {filters.provider && (
            <Badge
              count={
                <X
                  className="h-3 w-3 cursor-pointer"
                  onClick={() => onRemoveFilter("provider")}
                />
              }
              style={{ backgroundColor: '#eef2ff', color: '#4338ca' }}
            >
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-100 text-indigo-700 text-xs font-medium rounded-full">
                Provider: {filters.provider.substring(0, 20)}
                {filters.provider.length > 20 && "..."}
              </span>
            </Badge>
          )}
        </Space>
      </div>
    </div>
  );
};

export default ActiveFilters;