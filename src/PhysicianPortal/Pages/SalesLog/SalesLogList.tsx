import { useMemo, useState } from "react";
import { Button, Modal } from "antd";
import type { UploadFile } from "antd/es/upload/interface";
import { Eye, Trash2 } from "lucide-react";

import AppTabs from "../../../PatientPortal-V3/Protected/components/AppTabs";
import AppTable from "../../Components/AppTable";
import SalesLogFilterComponent from "./SalesLogFilterComponent";
import SalesLogForm from "./SalesLogForm";
import SalesLogDetails from "./SalesLogDetails";
import type { SalesLogFilterValues, SalesLogFormData, SalesLogRecord } from "./types";

const initialFilters: SalesLogFilterValues = {
  logDate: "",
  callbackDate: "",
  clientName: "",
  visitStatus: "",
  salesTeam: "",
};

const initialFormData: SalesLogFormData = {
  logDateTime: "",
  callbackDateTime: "",
  subject: "",
  salesTeam: "",
  name: "",
  mobilePhone: "",
  clientName: "",
  clientContactInfo: "",
  physicianName: "",
  city: "",
  state: "",
  address1: "",
  address2: "",
  zipCode: "",
  workPhone: "",
  visitStatus: "",
  message: "",
  attachments: [],
};

const mockRecords: SalesLogRecord[] = [
  {
    id: "1",
    name: "SELF",
    logDate: "10/10/2025",
    subject: "Client Report",
    clientName: "RAJA",
    visitStatus: "Callback",
    callbackDate: "06/26/2025 13:00:00",
    salesTeam: "Self",
    createdAt: "10/10/2025 09:30",
  },
  {
    id: "2",
    name: "SELF",
    logDate: "06/20/2025",
    subject: "Test Order",
    clientName: "Client",
    visitStatus: "Callback",
    callbackDate: "06/12/2025 15:33:00",
    salesTeam: "Sales Team A",
    createdAt: "06/20/2025 11:15",
  },
  {
    id: "3",
    name: "SALES MAANIKAM",
    logDate: "06/12/2025",
    subject: "Sales Details",
    clientName: "VISHAL",
    visitStatus: "Closed",
    callbackDate: "06/09/2025 10:31:00",
    salesTeam: "Sales Team B",
    createdAt: "06/12/2025 14:00",
  },
];

const tabs = [
  { key: "view-sales", label: "View Sales Logs" },
  { key: "create-sales", label: "Create Sales Log" },
];

const formDataToRecord = (form: SalesLogFormData, id?: string): SalesLogRecord => ({
  id: id ?? Date.now().toString(),
  name: form.name,
  logDate: form.logDateTime ? form.logDateTime.split(" ")[0] : "",
  subject: form.subject,
  clientName: form.clientName,
  visitStatus: form.visitStatus || "",
  callbackDate: form.callbackDateTime ? form.callbackDateTime.split(" ")[0] : "",
  salesTeam: form.salesTeam,
  mobilePhone: form.mobilePhone,
  clientContactInfo: form.clientContactInfo,
  physicianName: form.physicianName,
  city: form.city,
  state: form.state,
  address1: form.address1,
  address2: form.address2,
  zipCode: form.zipCode,
  workPhone: form.workPhone,
  message: form.message,
  attachments: (form.attachments as UploadFile[]).map((file) => ({
    uid: file.uid,
    name: file.name,
    status: file.status,
    url: file.url,
    type: file.type,
  })),
  createdAt: form.logDateTime,
  updatedAt: form.logDateTime,
});

const SalesLogList = () => {
  const [activeTab, setActiveTab] = useState("view-sales");
  const [salesLogs, setSalesLogs] = useState<SalesLogRecord[]>(mockRecords);
  const [selectedLog, setSelectedLog] = useState<SalesLogRecord | null>(null);
  const [filters, setFilters] = useState<SalesLogFilterValues>(initialFilters);
  const [createFormData, setCreateFormData] = useState<SalesLogFormData>(initialFormData);

  const filteredData = useMemo(() => {
    return salesLogs.filter((record) => {
      const logDateMatch = filters.logDate ? record.logDate === filters.logDate : true;
      const callbackMatch = filters.callbackDate
        ? (record.callbackDate || "").includes(filters.callbackDate)
        : true;
      const clientMatch = filters.clientName
        ? record.clientName.toLowerCase().includes(filters.clientName.toLowerCase())
        : true;
      const visitMatch = filters.visitStatus ? record.visitStatus === filters.visitStatus : true;
      const teamMatch = filters.salesTeam ? record.salesTeam === filters.salesTeam : true;

      return logDateMatch && callbackMatch && clientMatch && visitMatch && teamMatch;
    });
  }, [salesLogs, filters]);

  const handleFilterChange = (updated: SalesLogFilterValues) => setFilters(updated);

  const handleSearch = () => {
    // Placeholder for API integration
    // eslint-disable-next-line no-console
    console.log("Applying sales log filters", filters);
  };

  const handleClear = () => setFilters(initialFilters);

  const handleCreateSalesLog = (form: SalesLogFormData) => {
    const newRecord = formDataToRecord(form);
    setSalesLogs((prev) => [...prev, newRecord]);
    setCreateFormData(initialFormData);
    setActiveTab("view-sales");
  };

  const handleViewLog = (record: SalesLogRecord) => {
    setSelectedLog(record);
    setActiveTab("view-sales");
  };

  const handleDelete = (record: SalesLogRecord) => {
    Modal.confirm({
      title: "Delete Sales Log",
      content: `Are you sure you want to delete log ${record.subject}?`,
      okText: "Delete",
      okType: "danger",
      cancelText: "Cancel",
      onOk: () => {
        setSalesLogs((prev) => prev.filter((item) => item.id !== record.id));
        if (selectedLog?.id === record.id) {
          setSelectedLog(null);
        }
      },
    });
  };

  const handleUpdateDetails = (updated: SalesLogRecord) => {
    setSalesLogs((prev) => prev.map((log) => (log.id === updated.id ? updated : log)));
    setSelectedLog(updated);
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (value: string, record: SalesLogRecord) => (
        <button
          type="button"
          className="font-semibold text-gray-800 hover:text-indigo-600"
          onClick={() => handleViewLog(record)}
        >
          {value}
        </button>
      ),
    },
    {
      title: "Log date",
      dataIndex: "logDate",
      key: "logDate",
    },
    {
      title: "Subject",
      dataIndex: "subject",
      key: "subject",
    },
    {
      title: "Client name",
      dataIndex: "clientName",
      key: "clientName",
    },
    {
      title: "Visit status",
      dataIndex: "visitStatus",
      key: "visitStatus",
      render: (status: string) => (
        <span
          className={`px-2 py-1 text-xs font-medium rounded-full ${
            status === "Callback"
              ? "bg-blue-100 text-blue-700"
              : status === "Closed"
              ? "bg-green-100 text-green-700"
              : "bg-gray-100 text-gray-700"
          }`}
        >
          {status || "--"}
        </span>
      ),
    },
    {
      title: "Callback date",
      dataIndex: "callbackDate",
      key: "callbackDate",
      render: (value: string | undefined) => value || "--",
    },
    {
      title: "Sales Team",
      dataIndex: "salesTeam",
      key: "salesTeam",
      render: (value: string | undefined) => value || "--",
    },
    {
      title: "Actions",
      key: "actions",
      width: 140,
      render: (record: SalesLogRecord) => (
        <div className="flex items-center gap-2">
          <Button
            type="text"
            size="small"
            icon={<Eye className="h-4 w-4" />}
            onClick={() => handleViewLog(record)}
            className="text-indigo-600 hover:text-indigo-700"
          />
          <Button
            type="text"
            size="small"
            icon={<Trash2 className="h-4 w-4" />}
            onClick={() => handleDelete(record)}
            className="text-red-600 hover:text-red-700"
          />
        </div>
      ),
    },
  ];

  if (selectedLog && activeTab === "view-sales") {
    return (
      <SalesLogDetails record={selectedLog} onBack={() => setSelectedLog(null)} onUpdate={handleUpdateDetails} />
    );
  }

  return (
    <div className="space-y-2 pb-10">
      <AppTabs
        tabs={tabs}
        activeKey={activeTab}
        onChange={(key) => {
          setActiveTab(key);
          if (key === "view-sales") {
            setSelectedLog(null);
          }
        }}
      />

      {activeTab === "create-sales" ? (
        <div className="space-y-6 pt-6">
          <SalesLogForm
            formData={createFormData}
            onChange={(field, value) => setCreateFormData((prev) => ({ ...prev, [field]: value }))}
          />
          <div className="flex items-center justify-end gap-3 mt-6 pt-6 border-t border-gray-200">
            <Button
              className="rounded-lg border border-gray-300 px-5 py-2 text-sm font-semibold text-gray-700 transition hover:border-indigo-600 hover:text-indigo-600"
              onClick={() => setCreateFormData(initialFormData)}
            >
              Reset
            </Button>
            <Button
              type="primary"
              className="btn-primary rounded-lg px-5 py-2 text-sm font-semibold shadow-md"
              onClick={() => handleCreateSalesLog(createFormData)}
            >
              Create Sales Log
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-6 pt-6">
          <SalesLogFilterComponent
            filters={filters}
            onFilterChange={handleFilterChange}
            onSearch={handleSearch}
            onClearAll={handleClear}
          />

          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
            <AppTable
              columns={columns}
              data={filteredData}
              rowKey="id"
              pagination={{
                pageSize: 10,
                showSizeChanger: true,
                pageSizeOptions: ["10", "20", "50"],
                showTotal: (total, range) => `${range[0]}-${range[1]} of ${total}`,
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default SalesLogList;
