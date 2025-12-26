import { useMemo, useState } from "react";
import { Button, Modal } from "antd";
import { PenLine, Plus, Trash2 } from "lucide-react";

import AppTable from "../../Components/AppTable";
import CustomPanelFilterComponent, { type CustomPanelFilterValues } from "./CustomPanelFilterComponent";
import CustomPanelModal, { type CustomPanelItem } from "./CustomPanelModal";

const mockCustomPanels: CustomPanelItem[] = [
  {
    id: "1",
    panelNumber: "420",
    panelCode: "420",
    panelName: "Ezekiel",
    loinc: "Hami",
    description: "Deferring to management in instances of uncertainty.",
  },
  {
    id: "2",
    panelNumber: "CM",
    panelCode: "609",
    panelName: "Ezekiel",
    loinc: "Bridgeport",
    description: "Addressing queries, complaints, and recommendations furnished.",
  },
  {
    id: "3",
    panelNumber: "50",
    panelCode: "50",
    panelName: "Pc123",
    loinc: "Brighton",
    description: "Confirming customers' language preferences as you assist them.",
  },
  {
    id: "4",
    panelNumber: "1401267",
    panelCode: "619",
    panelName: "Rey",
    loinc: "Anchorage",
    description: "Redirecting customers to the pertinent department, if needed.",
  },
  {
    id: "5",
    panelNumber: "213",
    panelCode: "Panel06",
    panelName: "Bern",
    loinc: "Bridgeport",
    description: "Addressing queries, complaints, and recommendations furnished.",
  },
];

const CustomPanelPage = () => {
  const [panels, setPanels] = useState<CustomPanelItem[]>(mockCustomPanels);
  const [filters, setFilters] = useState<CustomPanelFilterValues>({
    panelNumber: "",
    panelCode: "",
    panelName: "",
    filterBy: "",
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<CustomPanelItem | null>(null);

  const filteredData = useMemo(() => {
    return panels.filter((item) => {
      const numberMatch = filters.panelNumber
        ? item.panelNumber.toLowerCase().includes(filters.panelNumber.toLowerCase())
        : true;
      const codeMatch = filters.panelCode
        ? item.panelCode.toLowerCase().includes(filters.panelCode.toLowerCase())
        : true;
      const nameMatch = filters.panelName
        ? item.panelName.toLowerCase().includes(filters.panelName.toLowerCase())
        : true;

      return numberMatch && codeMatch && nameMatch;
    });
  }, [panels, filters]);

  const handleFilterChange = (updated: CustomPanelFilterValues) => setFilters(updated);

  const handleSearch = () => {
    // Keep the same UX pattern of logging explicit filter actions.
    // eslint-disable-next-line no-console
    console.log("Applying custom panel filters", filters);
  };

  const handleClear = () => setFilters({ panelNumber: "", panelCode: "", panelName: "", filterBy: "" });

  const openCreate = () => {
    setEditing(null);
    setModalOpen(true);
  };

  const openEdit = (item: CustomPanelItem) => {
    setEditing(item);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditing(null);
  };

  const handleSave = (item: CustomPanelItem) => {
    setPanels((prev) => {
      const exists = prev.some((record) => record.id === item.id);
      if (exists) {
        return prev.map((record) => (record.id === item.id ? item : record));
      }
      return [item, ...prev];
    });
    closeModal();
  };

  const handleDelete = (item: CustomPanelItem) => {
    Modal.confirm({
      title: "Delete Custom Panel",
      content: `Are you sure you want to delete ${item.panelNumber}?`,
      okText: "Delete",
      okType: "danger",
      cancelText: "Cancel",
      onOk: () => setPanels((prev) => prev.filter((record) => record.id !== item.id)),
    });
  };

  const columns = [
    {
      title: "Panel number",
      dataIndex: "panelNumber",
      key: "panelNumber",
      render: (value: CustomPanelItem["panelNumber"]) => (
        <span className="text-gray-800 font-medium">{value}</span>
      ),
    },
    {
      title: "Panel code",
      dataIndex: "panelCode",
      key: "panelCode",
      render: (value: CustomPanelItem["panelCode"]) => <span className="text-gray-700">{value}</span>,
    },
    {
      title: "Panel name",
      dataIndex: "panelName",
      key: "panelName",
      render: (value: CustomPanelItem["panelName"]) => <span className="text-gray-700">{value}</span>,
    },
    {
      title: "LOINC",
      dataIndex: "loinc",
      key: "loinc",
      render: (value: CustomPanelItem["loinc"]) => <span className="text-gray-600">{value}</span>,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (value: CustomPanelItem["description"]) => (
        <span className="text-gray-600 break-words">{value}</span>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      width: 120,
      render: (record: CustomPanelItem) => (
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
        <h1 className="text-xl font-bold text-slate-800">Custom Panels</h1>
        <Button
          type="primary"
          className="btn-primary rounded-lg px-5 py-2 text-sm font-semibold shadow-md"
          icon={<Plus className="h-4 w-4" />}
          onClick={openCreate}
        >
          Add
        </Button>
      </div>

      <CustomPanelFilterComponent
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

      <CustomPanelModal open={modalOpen} initial={editing} onClose={closeModal} onSave={handleSave} />
    </div>
  );
};

export default CustomPanelPage;
