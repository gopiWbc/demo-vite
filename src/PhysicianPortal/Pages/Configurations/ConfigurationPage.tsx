import { useMemo, useState } from "react";
import { Button, Modal } from "antd";
import { PenLine, Plus, Trash2 } from "lucide-react";

import AppTable from "../../Components/AppTable";
import ConfigurationFilterComponent, {
  type ConfigurationFilterValues,
} from "./ConfigurationFilterComponent";
import ConfigurationModal, { type ConfigurationItem } from "./ConfigurationModal";

const mockConfigurations: ConfigurationItem[] = [
  {
    id: "1",
    configType: "Admin",
    configName: "Admin-Email",
    configValue: "Lakshmi@Wbcsoftwarelab.com",
  },
  {
    id: "2",
    configType: "Admin",
    configName: "Admin-Email15",
    configValue: "1265532",
  },
  {
    id: "3",
    configType: "Admin1",
    configName: "Admin-Email",
    configValue: "Meyyammalwbcl@gmail.com",
  },
  {
    id: "4",
    configType: "Email",
    configName: "Email-Server",
    configValue: "Smtp.Gmail.com",
  },
  {
    id: "5",
    configType: "Email",
    configName: "Email-Ssl",
    configValue: "True",
  },
  {
    id: "6",
    configType: "Email",
    configName: "Email-Password",
    configValue: "16742aey",
  },
  {
    id: "7",
    configType: "Email",
    configName: "Email-Username",
    configValue: "Alerts@Primexlab.com",
  },
  {
    id: "8",
    configType: "Email",
    configName: "From-Address",
    configValue: "No_reply@Primexlab.com",
  },
  {
    id: "9",
    configType: "Email",
    configName: "Mp-Bcc",
    configValue: "Thivyaw@Wbcsoftwarelab.com",
  },
  {
    id: "10",
    configType: "Email",
    configName: "Mp-Cc",
    configValue: "Pavithra@Wbcsoftwarelab.com",
  },
  {
    id: "11",
    configType: "Email",
    configName: "Mp-Supply-To",
    configValue: "Sasi@Wbcsoftwarelab.com",
  },
  {
    id: "12",
    configType: "Email",
    configName: "Support-To",
    configValue: "Sasi@Wbcsoftwarelab.com",
  },
];

const ConfigurationPage = () => {
  const [configurations, setConfigurations] = useState<ConfigurationItem[]>(
    mockConfigurations,
  );
  const [filters, setFilters] = useState<ConfigurationFilterValues>({
    configType: "",
    name: "",
    value: "",
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<ConfigurationItem | null>(null);

  const filteredData = useMemo(() => {
    return configurations.filter((item) => {
      const typeMatch = filters.configType
        ? item.configType === filters.configType
        : true;
      const nameMatch = filters.name
        ? item.configName.toLowerCase().includes(filters.name.toLowerCase())
        : true;
      const valueMatch = filters.value
        ? item.configValue
            .toLowerCase()
            .includes(filters.value.toLowerCase())
        : true;

      return typeMatch && nameMatch && valueMatch;
    });
  }, [configurations, filters]);

  const handleFilterChange = (updated: ConfigurationFilterValues) =>
    setFilters(updated);

  const handleSearch = () => {
    // Mirrors existing UX where explicit search logs filters.
    // eslint-disable-next-line no-console
    console.log("Applying configuration filters", filters);
  };

  const handleClear = () =>
    setFilters({ configType: "", name: "", value: "" });

  const openCreate = () => {
    setEditing(null);
    setModalOpen(true);
  };

  const openEdit = (item: ConfigurationItem) => {
    setEditing(item);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditing(null);
  };

  const handleSave = (item: ConfigurationItem) => {
    setConfigurations((prev) => {
      const exists = prev.some((record) => record.id === item.id);
      if (exists) {
        return prev.map((record) => (record.id === item.id ? item : record));
      }
      return [item, ...prev];
    });
    closeModal();
  };

  const handleDelete = (item: ConfigurationItem) => {
    Modal.confirm({
      title: "Delete Configuration",
      content: `Are you sure you want to delete ${item.configName}?`,
      okText: "Delete",
      okType: "danger",
      cancelText: "Cancel",
      onOk: () =>
        setConfigurations((prev) =>
          prev.filter((record) => record.id !== item.id),
        ),
    });
  };

  const columns = [
    {
      title: "Config",
      dataIndex: "configType",
      key: "configType",
      render: (value: ConfigurationItem["configType"]) => (
        <span className="text-gray-800 font-medium">{value}</span>
      ),
    },
    {
      title: "Name",
      dataIndex: "configName",
      key: "configName",
      render: (value: ConfigurationItem["configName"]) => (
        <span className="text-gray-700">{value}</span>
      ),
    },
    {
      title: "Value",
      dataIndex: "configValue",
      key: "configValue",
      render: (value: ConfigurationItem["configValue"]) => (
        <span className="text-gray-600 break-words">{value}</span>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      width: 120,
      render: (record: ConfigurationItem) => (
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
    <div className="space-y-6 px-4 pb-10">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-slate-800">Configuration</h1>
        <Button
          type="primary"
          className="btn-primary rounded-lg px-5 py-2 text-sm font-semibold shadow-md"
          icon={<Plus className="h-4 w-4" />}
          onClick={openCreate}
        >
          Add
        </Button>
      </div>

      <ConfigurationFilterComponent
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

      <ConfigurationModal
        open={modalOpen}
        initial={editing}
        onClose={closeModal}
        onSave={handleSave}
      />
    </div>
  );
};

export default ConfigurationPage;
