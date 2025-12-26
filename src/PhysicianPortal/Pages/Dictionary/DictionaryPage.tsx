import { useMemo, useState } from "react";
import { Button, Modal } from "antd";
import { PenLine, Plus, Trash2 } from "lucide-react";

import AppTable from "../../Components/AppTable";
import DictionaryFilterComponent, { type DictionaryFilterValues } from "./DictionaryFilterComponent";
import type { DictionaryItem } from "./DictionaryModal";
import DictionaryModal from "./DictionaryModal";

const mockDictionary: DictionaryItem[] = [
  {
    id: "1",
    testCode: "WIDAL",
    language: "English",
    data: "Typhoid",
  },
  {
    id: "2",
    testCode: "TC234343",
    language: "English",
    data: "Test Wbc",
  },
  {
    id: "3",
    testCode: "KANSAMITHA",
    language: "Korean",
    data: "Gesture",
  },
  {
    id: "4",
    testCode: "TEST01",
    language: "Korean",
    data: "Uwji",
  },
  {
    id: "5",
    testCode: "TN1",
    language: "English",
    data: "123",
  },
];

const DictionaryPage = () => {
  const [entries, setEntries] = useState<DictionaryItem[]>(mockDictionary);
  const [filters, setFilters] = useState<DictionaryFilterValues>({
    testCode: "",
    language: "",
    data: "",
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<DictionaryItem | null>(null);

  const filteredData = useMemo(() => {
    return entries.filter((item) => {
      const testCodeMatch = filters.testCode
        ? item.testCode.toLowerCase().includes(filters.testCode.toLowerCase())
        : true;
      const languageMatch = filters.language
        ? item.language.toLowerCase().includes(filters.language.toLowerCase())
        : true;
      const dataMatch = filters.data
        ? item.data.toLowerCase().includes(filters.data.toLowerCase())
        : true;

      return testCodeMatch && languageMatch && dataMatch;
    });
  }, [entries, filters]);

  const handleFilterChange = (updated: DictionaryFilterValues) => setFilters(updated);

  const handleSearch = () => {
    // Maintain consistent UX by logging search actions.
    // eslint-disable-next-line no-console
    console.log("Applying dictionary filters", filters);
  };

  const handleClear = () => setFilters({ testCode: "", language: "", data: "" });

  const openCreate = () => {
    setEditing(null);
    setModalOpen(true);
  };

  const openEdit = (item: DictionaryItem) => {
    setEditing(item);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditing(null);
  };

  const handleSave = (item: DictionaryItem) => {
    setEntries((prev) => {
      const exists = prev.some((record) => record.id === item.id);
      if (exists) {
        return prev.map((record) => (record.id === item.id ? item : record));
      }
      return [item, ...prev];
    });
    closeModal();
  };

  const handleDelete = (item: DictionaryItem) => {
    Modal.confirm({
      title: "Delete Dictionary Code",
      content: `Are you sure you want to delete the entry for ${item.testCode}?`,
      okText: "Delete",
      okType: "danger",
      cancelText: "Cancel",
      onOk: () => setEntries((prev) => prev.filter((record) => record.id !== item.id)),
    });
  };

  const columns = [
    {
      title: "Test code",
      dataIndex: "testCode",
      key: "testCode",
      render: (value: DictionaryItem["testCode"]) => (
        <span className="text-gray-800 font-medium">{value}</span>
      ),
    },
    {
      title: "Language",
      dataIndex: "language",
      key: "language",
      render: (value: DictionaryItem["language"]) => <span className="text-gray-700">{value}</span>,
    },
    {
      title: "Data",
      dataIndex: "data",
      key: "data",
      render: (value: DictionaryItem["data"]) => <span className="text-gray-600 break-words">{value}</span>,
    },
    {
      title: "Actions",
      key: "actions",
      width: 120,
      render: (record: DictionaryItem) => (
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
    <div className="space-y-2 pb-10">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-slate-800">Dictionary</h1>
        <Button
          type="primary"
          className="btn-primary rounded-lg px-5 py-2 text-sm font-semibold shadow-md"
          icon={<Plus className="h-4 w-4" />}
          onClick={openCreate}
        >
          Add
        </Button>
      </div>

      <DictionaryFilterComponent
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

      <DictionaryModal open={modalOpen} initial={editing} onClose={closeModal} onSave={handleSave} />
    </div>
  );
};

export default DictionaryPage;
