import { Eye, Download } from "lucide-react";
import type { ResultRecord } from "./types";

export const columns = [
  {
    title: "Reported",
    dataIndex: "reportedDate",
    key: "reportedDate",
    sorter: (a: { reportedDate: string; }, b: { reportedDate: any; }) => a.reportedDate.localeCompare(b.reportedDate),
  },
  {
    title: "Collected",
    dataIndex: "collectedDate",
    key: "collectedDate",
    sorter: (a: { collectedDate: string; }, b: { collectedDate: any; }) => a.collectedDate.localeCompare(b.collectedDate),
  },
  {
    title: "Patient Name",
    dataIndex: "patientName",
    key: "patientName",
    render: (value: string) => value.toUpperCase(),
  },
  {
    title: "D.O.B.",
    dataIndex: "dob",
    key: "dob",
  },
  {
    title: "Patient ID",
    dataIndex: "patientId",
    key: "patientId",
  },
  {
    title: "Accession #",
    dataIndex: "accession",
    key: "accession",
  },
  {
    title: "Ordering Provider",
    dataIndex: "orderingProvider",
    key: "orderingProvider",
    render: (value: string) => (
      <span className="block max-w-[220px] truncate" title={value}>
        {value}
      </span>
    ),
  },
  {
    title: "Account #",
    dataIndex: "accountNumber",
    key: "accountNumber",
  },
  {
    title: "Ordered Tests",
    dataIndex: "orderedTests",
    key: "orderedTests",
    render: (value: string) => (
      <span className="block max-w-[220px] truncate" title={value}>
        {value}
      </span>
    ),
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (value: ResultRecord["status"]) => (
      <span
        className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase ${
          value === "Final"
            ? "bg-emerald-100 text-emerald-600"
            : "bg-amber-100 text-amber-600"
        }`}
      >
        {value}
      </span>
    ),
  },
  {
    title: "Category",
    dataIndex: "category",
    key: "category",
  },
  {
    title: "Actions",
    key: "actions",
    fixed: "right" as "right",
    width: 110,
    render: () => (
      <div className="flex items-center gap-2">
        <button
          type="button"
          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 text-gray-600 transition hover:border-app-primary hover:text-app-primary"
          aria-label="View details"
        >
          <Eye className="h-4 w-4" />
        </button>
        <button
          type="button"
          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 text-gray-600 transition hover:border-app-primary hover:text-app-primary"
          aria-label="Download"
        >
          <Download className="h-4 w-4" />
        </button>
      </div>
    ),
  },
];