import { useMemo, useState } from "react";
import { Button, Modal } from "antd";
import { PenLine, Plus, Trash2 } from "lucide-react";

import AppTable from "../../Components/AppTable";
import TestPanelFilterComponent, { type TestPanelFilterValues } from "./TestPanelFilterComponent";
import TestPanelModal, { type TestPanelItem } from "./TestPanelModal";

const mockTestPanels: TestPanelItem[] = [
  {
    id: "1",
    testCode: "1222",
    testNumber: "009",
    testName: "Blood",
    loinc: "656",
    description: "General blood test",
  },
  {
    id: "2",
    testCode: "TN-000001",
    testNumber: "N001",
    testName: "LFT",
    loinc: "1010",
    description: "Liver function test",
  },
  {
    id: "3",
    testCode: "Test010",
    testNumber: "Test010",
    testName: "Test010",
    loinc: "1011",
    description: "Placeholder test entry",
  },
  {
    id: "4",
    testCode: "TC_890",
    testNumber: "Typhoid101",
    testName: "Widal Test",
    loinc: "Typhoid",
    description: "Detects antibodies for typhoid fever",
  },
  {
    id: "5",
    testCode: "C0V19IGM",
    testNumber: "C0V19IGM",
    testName: "CORONAVIRUS",
    loinc: "C0V19IGM",
    description: "COVID-19 antibody test",
  },
];

const TestPanelPage = () => {
  const [tests, setTests] = useState<TestPanelItem[]>(mockTestPanels);
  const [filters, setFilters] = useState<TestPanelFilterValues>({
    testCode: "",
    testNumber: "",
    testName: "",
    loinc: "",
    filterBy: "",
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<TestPanelItem | null>(null);

  const filteredData = useMemo(() => {
    return tests.filter((item) => {
      const codeMatch = filters.testCode
        ? item.testCode.toLowerCase().includes(filters.testCode.toLowerCase())
        : true;
      const numberMatch = filters.testNumber
        ? item.testNumber.toLowerCase().includes(filters.testNumber.toLowerCase())
        : true;
      const nameMatch = filters.testName
        ? item.testName.toLowerCase().includes(filters.testName.toLowerCase())
        : true;
      const loincMatch = filters.loinc
        ? item.loinc.toLowerCase().includes(filters.loinc.toLowerCase())
        : true;

      return codeMatch && numberMatch && nameMatch && loincMatch;
    });
  }, [tests, filters]);

  const handleFilterChange = (updated: TestPanelFilterValues) => setFilters(updated);

  const handleSearch = () => {
    // Maintain UX parity with other configuration-like pages.
    // eslint-disable-next-line no-console
    console.log("Applying test panel filters", filters);
  };

  const handleClear = () =>
    setFilters({ testCode: "", testNumber: "", testName: "", loinc: "", filterBy: "" });

  const openCreate = () => {
    setEditing(null);
    setModalOpen(true);
  };

  const openEdit = (item: TestPanelItem) => {
    setEditing(item);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditing(null);
  };

  const handleSave = (item: TestPanelItem) => {
    setTests((prev) => {
      const exists = prev.some((record) => record.id === item.id);
      if (exists) {
        return prev.map((record) => (record.id === item.id ? item : record));
      }
      return [item, ...prev];
    });
    closeModal();
  };

  const handleDelete = (item: TestPanelItem) => {
    Modal.confirm({
      title: "Delete Test Panel",
      content: `Are you sure you want to delete ${item.testCode}?`,
      okText: "Delete",
      okType: "danger",
      cancelText: "Cancel",
      onOk: () => setTests((prev) => prev.filter((record) => record.id !== item.id)),
    });
  };

  const columns = [
    {
      title: "Test code",
      dataIndex: "testCode",
      key: "testCode",
      render: (value: TestPanelItem["testCode"]) => (
        <span className="text-gray-800 font-medium">{value}</span>
      ),
    },
    {
      title: "Test number",
      dataIndex: "testNumber",
      key: "testNumber",
      render: (value: TestPanelItem["testNumber"]) => <span className="text-gray-700">{value}</span>,
    },
    {
      title: "Test name",
      dataIndex: "testName",
      key: "testName",
      render: (value: TestPanelItem["testName"]) => <span className="text-gray-700">{value}</span>,
    },
    {
      title: "Loinc",
      dataIndex: "loinc",
      key: "loinc",
      render: (value: TestPanelItem["loinc"]) => <span className="text-gray-600">{value}</span>,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (value: TestPanelItem["description"]) => (
        <span className="text-gray-600 break-words">{value}</span>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      width: 120,
      render: (record: TestPanelItem) => (
        <div className="flex items-center gap-2">
          <Button
            type="text"
            size="small"
            icon={<PenLine className="h-4 w-4" />}
            onClick={() => openEdit(record)}
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

  return (
    <div className="space-y-2 px-4 pb-10">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-slate-800">Test/Panel Codes</h1>
        <Button
          type="primary"
          className="btn-primary rounded-lg px-5 py-2 text-sm font-semibold shadow-md"
          icon={<Plus className="h-4 w-4" />}
          onClick={openCreate}
        >
          Add
        </Button>
      </div>

      <TestPanelFilterComponent
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

      <TestPanelModal open={modalOpen} initial={editing} onClose={closeModal} onSave={handleSave} />
    </div>
  );
};

export default TestPanelPage;
