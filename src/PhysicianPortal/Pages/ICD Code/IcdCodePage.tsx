import { useMemo, useState } from "react";
import { Button, Modal } from "antd";
import { PenLine, Plus, Trash2 } from "lucide-react";

import AppTable from "../../Components/AppTable";
import IcdCodeFilterComponent, { type IcdCodeFilterValues } from "./IcdCodeFilterComponent";
import IcdCodeModal, { type IcdCodeItem } from "./IcdCodeModal";

const mockIcdCodes: IcdCodeItem[] = [
  {
    id: "1",
    icdNumber: "M54.5",
    icdName: "Lower Back Pain",
    codeType: "ICD9",
    description: "Initial stage of back pain",
  },
  {
    id: "2",
    icdNumber: "ICD678",
    icdName: "Sales",
    codeType: "ICD10",
    description: "Test ICD code",
  },
  {
    id: "3",
    icdNumber: "ICD2352",
    icdName: "Mcleod",
    codeType: "ICD10",
    description: "Poisoning by ecstasy, accidental (unintentional)",
  },
  {
    id: "4",
    icdNumber: "ICD2350",
    icdName: "Marrier",
    codeType: "ICD9",
    description: "Cannabis dependence with withdrawal",
  },
  {
    id: "5",
    icdNumber: "ICD2348",
    icdName: "Dillard",
    codeType: "ICD10",
    description: "Newborn affected by maternal use of antidepressants",
  },
];

const IcdCodePage = () => {
  const [codes, setCodes] = useState<IcdCodeItem[]>(mockIcdCodes);
  const [filters, setFilters] = useState<IcdCodeFilterValues>({
    icdNumber: "",
    icdName: "",
    codeType: "",
    filterBy: "",
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<IcdCodeItem | null>(null);

  const filteredData = useMemo(() => {
    return codes.filter((item) => {
      const numberMatch = filters.icdNumber
        ? item.icdNumber.toLowerCase().includes(filters.icdNumber.toLowerCase())
        : true;
      const nameMatch = filters.icdName
        ? item.icdName.toLowerCase().includes(filters.icdName.toLowerCase())
        : true;
      const codeTypeMatch = filters.codeType
        ? item.codeType === filters.codeType
        : true;

      return numberMatch && nameMatch && codeTypeMatch;
    });
  }, [codes, filters]);

  const handleFilterChange = (updated: IcdCodeFilterValues) => setFilters(updated);

  const handleSearch = () => {
    // Keep behavior consistent with other pages where search logs state.
    // eslint-disable-next-line no-console
    console.log("Applying ICD code filters", filters);
  };

  const handleClear = () => setFilters({ icdNumber: "", icdName: "", codeType: "", filterBy: "" });

  const openCreate = () => {
    setEditing(null);
    setModalOpen(true);
  };

  const openEdit = (item: IcdCodeItem) => {
    setEditing(item);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditing(null);
  };

  const handleSave = (item: IcdCodeItem) => {
    setCodes((prev) => {
      const exists = prev.some((record) => record.id === item.id);
      if (exists) {
        return prev.map((record) => (record.id === item.id ? item : record));
      }
      return [item, ...prev];
    });
    closeModal();
  };

  const handleDelete = (item: IcdCodeItem) => {
    Modal.confirm({
      title: "Delete ICD Code",
      content: `Are you sure you want to delete ${item.icdNumber}?`,
      okText: "Delete",
      okType: "danger",
      cancelText: "Cancel",
      onOk: () => setCodes((prev) => prev.filter((record) => record.id !== item.id)),
    });
  };

  const columns = [
    {
      title: "ICD number",
      dataIndex: "icdNumber",
      key: "icdNumber",
      render: (value: IcdCodeItem["icdNumber"]) => (
        <span className="text-gray-800 font-medium">{value}</span>
      ),
    },
    {
      title: "ICD name",
      dataIndex: "icdName",
      key: "icdName",
      render: (value: IcdCodeItem["icdName"]) => <span className="text-gray-700">{value}</span>,
    },
    {
      title: "ICD code type",
      dataIndex: "codeType",
      key: "codeType",
      render: (value: IcdCodeItem["codeType"]) => <span className="text-gray-600">{value}</span>,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (value: IcdCodeItem["description"]) => (
        <span className="text-gray-600 break-words">{value}</span>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      width: 120,
      render: (record: IcdCodeItem) => (
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
        <h1 className="text-xl font-bold text-slate-800">ICD Codes</h1>
        <Button
          type="primary"
          className="btn-primary rounded-lg px-5 py-2 text-sm font-semibold shadow-md"
          icon={<Plus className="h-4 w-4" />}
          onClick={openCreate}
        >
          Add
        </Button>
      </div>

      <IcdCodeFilterComponent
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

      <IcdCodeModal open={modalOpen} initial={editing} onClose={closeModal} onSave={handleSave} />
    </div>
  );
};

export default IcdCodePage;
