import { Eye, Trash2 } from "lucide-react";
import type { ColumnsType } from "antd/es/table";
import type { OrderRecord } from "./types";

const statusThemes: Record<OrderRecord["status"], string> = {
  Pending: "bg-amber-100 text-amber-600",
  Active: "bg-indigo-100 text-indigo-600",
  Completed: "bg-emerald-100 text-emerald-600",
  Cancelled: "bg-rose-100 text-rose-600",
};

export const orderColumns: ColumnsType<OrderRecord> = [
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (value: OrderRecord["status"]) => (
      <span
        className={`inline-flex items-center gap-2 text-xs rounded-full py-1 px-2 font-semibold uppercase ${statusThemes[value]}`}
      >
        <span className="h-2.5 w-2.5 rounded-full bg-current" />
        {value}
      </span>
    ),
  },
  {
    title: "Order Date",
    dataIndex: "orderDate",
    key: "orderDate",
    sorter: (a, b) => a.orderDate.localeCompare(b.orderDate),
  },
  {
    title: "Client ID",
    dataIndex: "clientId",
    key: "clientId",
  },
  {
    title: "Patient Name",
    dataIndex: "patientName",
    key: "patientName",
    render: (value: string) => (
      <span className="block max-w-[220px] truncate" title={value}>
        {value}
      </span>
    ),
  },
  {
    title: "DOB",
    dataIndex: "dob",
    key: "dob",
  },
  {
    title: "Order #",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Actions",
    key: "actions",
    fixed: "right",
    width: 120,
    render: () => (
      <div className="flex items-center gap-2">
        <button
          type="button"
          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 text-gray-600 transition hover:border-app-primary hover:text-app-primary"
          aria-label="View order"
        >
          <Eye className="h-4 w-4" />
        </button>
        <button
          type="button"
          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 text-gray-600 transition hover:border-rose-500 hover:text-rose-500"
          aria-label="Delete order"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    ),
  },
];
