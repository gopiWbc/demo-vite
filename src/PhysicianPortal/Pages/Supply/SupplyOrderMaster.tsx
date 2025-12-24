import { useMemo, useState } from "react";
import { Button, Modal } from "antd";
import { Plus, PenLine, Trash2 } from "lucide-react";
import AppTable from "../../Components/AppTable";
import SupplyOrderFilterComponent, { type SupplyFilterValues } from "./SupplyOrderFilterComponent";
import SupplyOrderModal, { type SupplyItem } from "./SupplyOrderModal";

const mockSupplies: SupplyItem[] = [
  {
    id: "1",
    code: "KIT-STD",
    name: "Standard Collection Kit",
    category: "Kits",
    status: "Active",
    image: null,
    notes: "Includes tubes and swabs",
  },
  {
    id: "2",
    code: "SWB-NP",
    name: "Nasopharyngeal Swab",
    category: "Swabs",
    status: "Inactive",
    image: null,
  },
  {
    id: "3",
    code: "CNT-UR",
    name: "Urine Container 50ml",
    category: "Containers",
    status: "Active",
    image: null,
  },
];

const SupplyOrderMaster = () => {
  const [supplies, setSupplies] = useState<SupplyItem[]>(mockSupplies);
  const [filters, setFilters] = useState<SupplyFilterValues>({ code: "", name: "", category: "", status: "" });
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<SupplyItem | null>(null);

  const filteredData = useMemo(() => {
    return supplies.filter((s) => {
      const codeMatch = filters.code ? s.code.toLowerCase().includes(filters.code.toLowerCase()) : true;
      const nameMatch = filters.name ? s.name.toLowerCase().includes(filters.name.toLowerCase()) : true;
      const categoryMatch = filters.category ? s.category === filters.category : true;
      const statusMatch = filters.status ? s.status === filters.status : true;
      return codeMatch && nameMatch && categoryMatch && statusMatch;
    });
  }, [supplies, filters]);

  const handleFilterChange = (newFilters: SupplyFilterValues) => setFilters(newFilters);
  const handleSearch = () => {
    // Search triggers are optional since we filter reactively.
    // Added to mirror Physician filter UX.
    // eslint-disable-next-line no-console
    console.log("Applying filters", filters);
  };
  const handleClear = () => setFilters({ code: "", name: "", category: "", status: "" });

  const openCreate = () => {
    setEditing(null);
    setModalOpen(true);
  };
  const openEdit = (item: SupplyItem) => {
    setEditing(item);
    setModalOpen(true);
  };
  const closeModal = () => setModalOpen(false);

  const handleSave = (item: SupplyItem) => {
    setSupplies((prev) => {
      const exists = prev.some((p) => p.id === item.id);
      if (exists) return prev.map((p) => (p.id === item.id ? item : p));
      return [item, ...prev];
    });
    setModalOpen(false);
    setEditing(null);
  };

  const handleDelete = (item: SupplyItem) => {
    Modal.confirm({
      title: "Delete Supply",
      content: `Are you sure you want to delete ${item.name}?`,
      okText: "Delete",
      okType: "danger",
      cancelText: "Cancel",
      onOk: () => setSupplies((prev) => prev.filter((p) => p.id !== item.id)),
    });
  };

  const columns: any[] = [
    { title: "Code", dataIndex: "code", key: "code" },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (_: any, record: SupplyItem) => (
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-full overflow-hidden ring-1 ring-indigo-100 shadow-sm bg-gradient-to-br from-indigo-50 to-violet-100 flex items-center justify-center">
            {record.image ? (
              <img src={record.image} alt={record.name} className="h-full w-full object-cover" />
            ) : (
              <span className="text-indigo-700 text-xs font-semibold">
                {record.name?.charAt(0)?.toUpperCase() || "S"}
              </span>
            )}
          </div>
          <span className="text-slate-800 font-medium">{record.name}</span>
        </div>
      ),
    },
    { title: "Category", dataIndex: "category", key: "category" },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: SupplyItem["status"]) => (
        <span className={`px-2 py-1 text-xs font-medium rounded-full ${status === "Active" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"}`}>
          {status}
        </span>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      width: 110,
      render: (record: SupplyItem) => (
        <div className="flex items-center gap-2">
          <Button type="text" size="small" icon={<PenLine className="h-4 w-4" />} onClick={() => openEdit(record)} className="text-indigo-600 hover:text-indigo-700" />
          <Button type="text" size="small" icon={<Trash2 className="h-4 w-4" />} onClick={() => handleDelete(record)} className="text-red-600 hover:text-red-700" />
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6 px-4 pb-10">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-slate-800">Supply Order Master</h1>
        <Button type="primary" className="btn-primary rounded-lg px-5 py-2 text-sm font-semibold shadow-md" icon={<Plus className="h-4 w-4" />} onClick={openCreate}>
          Add Supply
        </Button>
      </div>

      <SupplyOrderFilterComponent filters={filters} onFilterChange={handleFilterChange} onSearch={handleSearch} onClearAll={handleClear} />

      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        <AppTable
          columns={columns}
          data={filteredData}
          rowKey="id"
          pagination={{ pageSize: 10, showSizeChanger: true, pageSizeOptions: ["10", "20", "50"], showTotal: (total, range) => `${range[0]}-${range[1]} of ${total}` }}
        />
      </div>

      <SupplyOrderModal open={modalOpen} initial={editing} onClose={closeModal} onSave={handleSave} />
    </div>
  );
};

export default SupplyOrderMaster;
