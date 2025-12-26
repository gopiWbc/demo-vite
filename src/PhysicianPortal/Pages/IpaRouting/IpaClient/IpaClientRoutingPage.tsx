import { useMemo, useState } from "react";
import { Button, Modal } from "antd";
import { PenLine, Plus, Trash2 } from "lucide-react";

import IpaClientRoutingFilterComponent, {
  type IpaClientRoutingFilterValues,
} from "./IpaClientRoutingFilterComponent";
import IpaClientRoutingModal, {
  type IpaClientRoutingItem,
} from "./IpaClientRoutingModal";
import AppTable from "../../../Components/AppTable";

const mockClientRoutes: IpaClientRoutingItem[] = [
  {
    id: "1",
    client: "TYES",
    acoAffiliation: "TYES",
    ipaClientId: "111",
    ipaClientName: "TYES",
    clientId: "123",
  },
  {
    id: "2",
    client: "Aptech",
    acoAffiliation: "TYES",
    ipaClientId: "ZAP",
    ipaClientName: "TYES",
    clientId: "Aptech",
  },
  {
    id: "3",
    client: "TYES",
    acoAffiliation: "TYES",
    ipaClientId: "Https://5852928879905016563.Owasp.Org",
    ipaClientName: "TYES",
    clientId: "565656",
  },
  {
    id: "4",
    client: "TYES",
    acoAffiliation: "TYES",
    ipaClientId: "TEST;Start-Sleep -S 15",
    ipaClientName: "TYES",
    clientId: "565656",
  },
];

const initialFilters: IpaClientRoutingFilterValues = {
  ipaClientId: "",
  acoAffiliation: "",
};

const IpaClientRoutingPage = () => {
  const [routes, setRoutes] = useState<IpaClientRoutingItem[]>(mockClientRoutes);
  const [filters, setFilters] = useState<IpaClientRoutingFilterValues>(initialFilters);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<IpaClientRoutingItem | null>(null);

  const filteredData = useMemo(() => {
    return routes.filter((route) => {
      const ipaClientMatch = filters.ipaClientId
        ? route.ipaClientId.toLowerCase().includes(filters.ipaClientId.toLowerCase())
        : true;
      const acoMatch = filters.acoAffiliation
        ? route.acoAffiliation.toLowerCase().includes(filters.acoAffiliation.toLowerCase())
        : true;

      return ipaClientMatch && acoMatch;
    });
  }, [routes, filters]);

  const handleFilterChange = (updated: IpaClientRoutingFilterValues) => setFilters(updated);

  const handleSearch = () => {
    // Placeholder for API integration.
    // eslint-disable-next-line no-console
    console.log("Applying IPA client routing filters", filters);
  };

  const handleClear = () => setFilters(initialFilters);

  const openCreate = () => {
    setEditing(null);
    setModalOpen(true);
  };

  const openEdit = (item: IpaClientRoutingItem) => {
    setEditing(item);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditing(null);
  };

  const handleSave = (item: IpaClientRoutingItem) => {
    setRoutes((prev) => {
      const exists = prev.some((route) => route.id === item.id);
      if (exists) {
        return prev.map((route) => (route.id === item.id ? item : route));
      }
      return [item, ...prev];
    });
    closeModal();
  };

  const handleDelete = (item: IpaClientRoutingItem) => {
    Modal.confirm({
      title: "Delete IPA Client Route",
      content: `Are you sure you want to delete ${item.ipaClientId}?`,
      okText: "Delete",
      okType: "danger",
      cancelText: "Cancel",
      onOk: () => setRoutes((prev) => prev.filter((route) => route.id !== item.id)),
    });
  };

  const columns = [
    {
      title: "IPA client ID",
      dataIndex: "ipaClientId",
      key: "ipaClientId",
      sorter: (a: IpaClientRoutingItem, b: IpaClientRoutingItem) =>
        a.ipaClientId.localeCompare(b.ipaClientId),
      render: (value: string) => <span className="text-gray-800 font-medium">{value}</span>,
    },
    {
      title: "IPA client name",
      dataIndex: "ipaClientName",
      key: "ipaClientName",
      sorter: (a: IpaClientRoutingItem, b: IpaClientRoutingItem) =>
        a.ipaClientName.localeCompare(b.ipaClientName),
    },
    {
      title: "ACO affiliation",
      dataIndex: "acoAffiliation",
      key: "acoAffiliation",
      sorter: (a: IpaClientRoutingItem, b: IpaClientRoutingItem) =>
        a.acoAffiliation.localeCompare(b.acoAffiliation),
    },
    {
      title: "Client ID",
      dataIndex: "clientId",
      key: "clientId",
    },
    {
      title: "Actions",
      key: "actions",
      width: 120,
      render: (record: IpaClientRoutingItem) => (
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
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-xl font-bold text-slate-800">IPA Client Route</h1>
        <div className="flex justify-end gap-2">
          <Button className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-700">
            Export to CSV
          </Button>
          <Button
            type="primary"
            className="btn-primary rounded-lg px-4 py-2 text-sm font-semibold shadow-md"
            icon={<Plus className="h-4 w-4" />}
            onClick={openCreate}
          >
            Add
          </Button>
        </div>
      </div>

      <IpaClientRoutingFilterComponent
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

      <IpaClientRoutingModal open={modalOpen} initial={editing} onClose={closeModal} onSave={handleSave} />
    </div>
  );
};

export default IpaClientRoutingPage;
