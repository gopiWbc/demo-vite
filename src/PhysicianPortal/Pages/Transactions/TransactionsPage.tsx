import { useState } from "react";
import { Button } from "antd";
import { Eye, Trash2 } from "lucide-react";

import AppTable from "../../Components/AppTable";
import type { TransactionFilterValues, TransactionRecord } from "./types";
import TransactionFilterComponent from "./TransactionFilterComponent";

const mockTransactions: TransactionRecord[] = [
  {
    id: "TX-0001",
    clientId: "Wbctester123",
    accessionId: "00124958",
    patientId: "PL00007930",
    name: "ORM001",
    type: "OUTBOUND",
    received: "06/20/2025 10:18:27",
    processed: "06/20/2025 11:16:27",
    server: "Interface: PRIMEX-ORDER",
  },
  {
    id: "TX-0002",
    clientId: "Wbctester123",
    accessionId: "00124957",
    patientId: "PL00007930",
    name: "ORM001",
    type: "OUTBOUND",
    received: "06/17/2025 12:49:12",
    processed: "06/17/2025 12:49:12",
    server: "Interface: PRIMEX-ORDER",
  },
  {
    id: "TX-0003",
    clientId: "Wbctester123",
    accessionId: "00124956",
    patientId: "PL00007928",
    name: "ORM001",
    type: "OUTBOUND",
    received: "06/16/2025 12:44:44",
    processed: "06/16/2025 12:44:44",
    server: "Interface: PRIMEX-ORDER",
  },
  {
    id: "TX-0004",
    clientId: "Wbctester123",
    accessionId: "00124955",
    patientId: "PL00007928",
    name: "ORM001",
    type: "OUTBOUND",
    received: "06/16/2025 09:56:36",
    processed: "06/16/2025 09:56:36",
    server: "Interface: PRIMEX-ORDER",
  },
  {
    id: "TX-0005",
    clientId: "Wbctester123",
    accessionId: "00124954",
    patientId: "PL00007928",
    name: "ORM001",
    type: "OUTBOUND",
    received: "06/16/2025 09:56:36",
    processed: "06/16/2025 09:56:36",
    server: "Interface: PRIMEX-ORDER",
  },
  {
    id: "TX-0006",
    clientId: "Wbctester123",
    accessionId: "00124953",
    patientId: "PL00007928",
    name: "ORM001",
    type: "OUTBOUND",
    received: "06/09/2025 15:18:36",
    processed: "06/09/2025 15:18:36",
    server: "Interface: PRIMEX-ORDER",
  },
  {
    id: "TX-0007",
    clientId: "Wbctester123",
    accessionId: "00124952",
    patientId: "PL00007928",
    name: "ORM001",
    type: "OUTBOUND",
    received: "06/09/2025 15:18:36",
    processed: "06/09/2025 15:18:36",
    server: "Interface: PRIMEX-ORDER",
  },
  {
    id: "TX-0008",
    clientId: "Wbctester123",
    accessionId: "00124951",
    patientId: "PL00007928",
    name: "ORM001",
    type: "OUTBOUND",
    received: "06/02/2025 15:57:26",
    processed: "06/02/2025 15:57:26",
    server: "Interface: PRIMEX-ORDER",
  },
  {
    id: "TX-0009",
    clientId: "Wbctester123",
    accessionId: "00124950",
    patientId: "PL00007928",
    name: "ORM001",
    type: "OUTBOUND",
    received: "06/02/2025 15:40:12",
    processed: "06/02/2025 15:40:12",
    server: "Interface: PRIMEX-ORDER",
  },
  {
    id: "TX-0010",
    clientId: "Wbctester123",
    accessionId: "00124949",
    patientId: "PL00007928",
    name: "ORM001",
    type: "OUTBOUND",
    received: "05/31/2025 14:40:32",
    processed: "05/31/2025 14:40:32",
    server: "Interface: PRIMEX-ORDER",
  },
];

const TransactionPage = () => {
  const [filters, setFilters] = useState<TransactionFilterValues>({
    clientId: "",
    name: "",
    accessionId: "",
    server: "",
    receivedRange: [null, null],
    processedRange: [null, null],
    patientId: "",
    type: "",
  });

  const handleSearch = () => {
    // eslint-disable-next-line no-console
    console.log("Searching transactions", filters);
  };

  const handleClearAll = () => {
    setFilters({
      clientId: "",
      name: "",
      accessionId: "",
      server: "",
      receivedRange: [null, null],
      processedRange: [null, null],
      patientId: "",
      type: "",
    });
  };

  const columns = [
    {
      title: "Client ID",
      dataIndex: "clientId",
      key: "clientId",
    },
    {
      title: "Accession ID",
      dataIndex: "accessionId",
      key: "accessionId",
    },
    {
      title: "Patient ID",
      dataIndex: "patientId",
      key: "patientId",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Received",
      dataIndex: "received",
      key: "received",
    },
    {
      title: "Processed",
      dataIndex: "processed",
      key: "processed",
    },
    {
      title: "Server",
      dataIndex: "server",
      key: "server",
    },
     {
      title: "Actions",
      key: "actions",
      width: 100,
      render: () => (
        <div className="flex items-center gap-2">
          <Button
            type="text"
            size="small"
            icon={<Eye className="h-4 w-4" />}
            className="text-indigo-600 hover:text-indigo-700"
          />
          <Button
            type="text"
            size="small"
            icon={<Trash2 className="h-4 w-4" />}
            className="text-red-600 hover:text-red-700"
          />
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <header className="px-2">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Transactions</h1>
            <p className="text-sm text-gray-500">Monitor interface transactions and troubleshoot delivery statuses.</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="rounded-lg border border-gray-300 px-4 sm:px-5 py-2 text-xs sm:text-sm font-semibold text-gray-700 transition hover:border-indigo-600 hover:text-indigo-600">
              Export
            </button>
          </div>
        </div>
      </header>

      <TransactionFilterComponent
        filters={filters}
        onFilterChange={setFilters}
        onSearch={handleSearch}
        onClearAll={handleClearAll}
      />

      <AppTable<TransactionRecord>
        columns={columns}
        data={mockTransactions}
        rowKey="id"
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          pageSizeOptions: ["10", "20", "50"],
          showTotal: (total, range) => `${range[0]}-${range[1]} of ${total}`,
        }}
      />
    </div>
  );
};

export default TransactionPage;
