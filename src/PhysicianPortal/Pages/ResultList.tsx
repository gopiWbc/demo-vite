import { useEffect, useMemo, useState, type ChangeEvent } from "react";
import AppTable from "../Components/AppTable";
import type { ColumnsType } from "antd/es/table";
import { Download, Eye } from "lucide-react";

type ResultRecord = {
  id: string;
  reportedDate: string;
  collectedDate: string;
  patientName: string;
  dob: string;
  patientId: string;
  accession: string;
  orderingProvider: string;
  accountNumber: string;
  orderedTests: string;
  status: "Preliminary" | "Final";
  category: string;
  flagged?: boolean;
};

const columns: ColumnsType<ResultRecord> = [
  {
    title: "Reported",
    dataIndex: "reportedDate",
    key: "reportedDate",
    sorter: (a, b) => a.reportedDate.localeCompare(b.reportedDate),
  },
  {
    title: "Collected",
    dataIndex: "collectedDate",
    key: "collectedDate",
    sorter: (a, b) => a.collectedDate.localeCompare(b.collectedDate),
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
    fixed: "right",
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

const resultData: ResultRecord[] = [
  {
    id: "ORD-1001",
    reportedDate: "12/18/2025",
    collectedDate: "12/10/2025",
    patientName: "Hogan, Robert",
    dob: "08/13/1956",
    patientId: "LLTFP109978",
    accession: "3455449932",
    orderingProvider: "Mandel, R (NPI 1659335333)",
    accountNumber: "04292915",
    orderedTests: "Estradiol, Free Serum, Comprehensive Panel",
    status: "Preliminary",
    category: "Routine",
  },
  {
    id: "ORD-1002",
    reportedDate: "12/18/2025",
    collectedDate: "12/15/2025",
    patientName: "Wolf Shackleford, Annette",
    dob: "01/13/1959",
    patientId: "10443397",
    accession: "3504940202",
    orderingProvider: "Huizenga, R (NPI 1245236541)",
    accountNumber: "04292915",
    orderedTests: "CBG with Free Cortisol, Serum",
    status: "Preliminary",
    category: "Routine",
  },
  {
    id: "ORD-1003",
    reportedDate: "12/18/2025",
    collectedDate: "12/12/2025",
    patientName: "Salah, Alexandra",
    dob: "12/17/1992",
    patientId: "XDP000629107",
    accession: "3475413940",
    orderingProvider: "Navizadeh, N (NPI 1588435239)",
    accountNumber: "04292915",
    orderedTests: "Bile Acids, Fractionated",
    status: "Final",
    category: "Critical",
  },
  {
    id: "ORD-1004",
    reportedDate: "12/18/2025",
    collectedDate: "12/11/2025",
    patientName: "Singer, Jacqueline",
    dob: "10/17/1980",
    patientId: "3465443990",
    accession: "3465443990",
    orderingProvider: "Sadeghi, H (NPI 1257745099)",
    accountNumber: "04292915",
    orderedTests: "G6PD, Qn Blcl and Red Cell Count",
    status: "Final",
    category: "Routine",
  },
  {
    id: "ORD-1005",
    reportedDate: "12/18/2025",
    collectedDate: "12/13/2025",
    patientName: "Pallister, Alana",
    dob: "08/09/1984",
    patientId: "10155339",
    accession: "3505439922",
    orderingProvider: "Ney, M (NPI 1710104674)",
    accountNumber: "04292915",
    orderedTests: "Zinc, RBC, Copper, Serum",
    status: "Preliminary",
    category: "Routine",
  },
  {
    id: "ORD-1006",
    reportedDate: "12/18/2025",
    collectedDate: "12/13/2025",
    patientName: "Klier, Jacob P",
    dob: "04/14/1989",
    patientId: "2525951",
    accession: "3475412199",
    orderingProvider: "Nguyen, T (NPI 1548012331)",
    accountNumber: "04292915",
    orderedTests: "Vitamin B1 (Thiamine), Plasma",
    status: "Final",
    category: "Routine",
  },
  {
    id: "ORD-1007",
    reportedDate: "12/18/2025",
    collectedDate: "12/12/2025",
    patientName: "Trinidad, Rafael G",
    dob: "05/29/1957",
    patientId: "7366697",
    accession: "3475411866",
    orderingProvider: "Kellogg, A (NPI 1104303344)",
    accountNumber: "04292915",
    orderedTests: "Vitamin B6, Plasma, Vitamin B12",
    status: "Preliminary",
    category: "Routine",
  },
  {
    id: "ORD-1008",
    reportedDate: "12/18/2025",
    collectedDate: "12/12/2025",
    patientName: "Cruz, Richard M",
    dob: "07/21/1993",
    patientId: "9365701",
    accession: "3475411701",
    orderingProvider: "Kellogg, A (NPI 1104303344)",
    accountNumber: "04292915",
    orderedTests: "Vitamin B6, Plasma, Vitamin B12",
    status: "Preliminary",
    category: "Routine",
  },
  {
    id: "ORD-1009",
    reportedDate: "12/18/2025",
    collectedDate: "12/10/2025",
    patientName: "Martiny, Clara",
    dob: "06/23/2000",
    patientId: "100024085",
    accession: "3455443021",
    orderingProvider: "Ngouamba, R (NPI 1184700222)",
    accountNumber: "04292915",
    orderedTests: "Estradiol, Free Serum, Comprehensive Panel",
    status: "Preliminary",
    category: "Routine",
  },
  {
    id: "ORD-1010",
    reportedDate: "12/18/2025",
    collectedDate: "12/15/2025",
    patientName: "Zashin, Hillary",
    dob: "09/14/1970",
    patientId: "3505499155",
    accession: "3505499155",
    orderingProvider: "Raskin, D (NPI 1528254566)",
    accountNumber: "04292915",
    orderedTests: "NMR LipoProfile+Lipids",
    status: "Final",
    category: "Critical",
    flagged: true,
  },
];

export default function ResultList() {
  return (
    <div className="space-y-6">
      <header className="bg-white border border-gray-200 rounded-2xl px-6 py-5 shadow-sm">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Result List</h1>
            <p className="text-sm text-gray-500">
              Review recent lab orders, manage result delivery, and access supporting files.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button className="btn-primary rounded-lg px-5 py-2 text-sm font-semibold shadow-md">
              New Order
            </button>
            <button className="rounded-lg border border-gray-300 px-5 py-2 text-sm font-semibold text-gray-700 transition hover:border-app-primary hover:text-app-primary">
              Export
            </button>
          </div>
        </div>
      </header>

      <AppTable<ResultRecord>
        columns={columns}
        data={resultData}
        rowKey="id"
        rowSelection={{ type: "checkbox" }}
        rowClassName={(record) => (record.flagged ? "danger-row" : "")}
        onChange={() => undefined}
      />
    </div>
  );
}
