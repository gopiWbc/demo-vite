import { useEffect, useMemo, useState } from "react";
import { Button, Modal, message } from "antd";
import { Trash2, ClipboardList, Layers, Eye } from "lucide-react";
import AppTabs from "../../../PatientPortal-V3/Protected/components/AppTabs";
import AppTable from "../../Components/AppTable";
import AssignPanel, { type AssignType } from "../User/AssignPanel";
import ClientFilterComponent from "./ClientFilterComponent";
import ClientForm from "./ClientForm";
import type { Client, ClientFilterValues, ClientFormData } from "./types";
import ClientDetails from "./ClientDetails";

const mockClients: Client[] = [
  {
    id: "1",
    clientId: "WBCClient123",
    clientName: "Wbctester123",
    type: "Lab",
    address: "123 Health Ave",
    city: "Orlando",
    state: "Florida",
    zipCode: "32801",
    email: "wbctester123@primex.com",
    phone: "(555) 111-2233",
    fax: "(555) 111-8899",
    mobile: "(555) 777-8899",
    resultFolder: "main",
    sendSmsAlert: true,
    createdDate: "12/20/2025",
  },
  {
    id: "2",
    clientId: "WBClient807",
    clientName: "WbcClient807",
    type: "IPA",
    address: "78 Wellness Blvd",
    city: "Austin",
    state: "Texas",
    zipCode: "73301",
    email: "wbcclient807@primex.com",
    phone: "(555) 224-3355",
    fax: "(555) 224-9933",
    mobile: "(555) 421-7788",
    resultFolder: "qa",
    sendSmsAlert: false,
    createdDate: "12/18/2025",
  },
  {
    id: "3",
    clientId: "V234",
    clientName: "V234",
    type: "Lab",
    address: "456 Diagnostic Dr",
    city: "Newark",
    state: "New Jersey",
    zipCode: "07102",
    email: "v234@primex.com",
    phone: "(555) 445-6677",
    fax: "(555) 445-7788",
    mobile: "(555) 998-8899",
    resultFolder: "archive",
    sendSmsAlert: true,
    createdDate: "12/10/2025",
  },
  {
    id: "4",
    clientId: "OTEST",
    clientName: "OTEST",
    type: "IPA",
    address: "963 Research Way",
    city: "Phoenix",
    state: "Arizona",
    zipCode: "85001",
    email: "otest@primex.com",
    phone: "(555) 556-8899",
    fax: "(555) 223-0098",
    mobile: "(555) 905-6677",
    resultFolder: "main",
    sendSmsAlert: false,
    createdDate: "12/08/2025",
  },
];

const initialFilters: ClientFilterValues = {
  clientId: "",
  clientName: "",
  type: "",
};

const initialFormState: ClientFormData = {
  type: "Lab",
  clientId: "",
  clientName: "",
  address: "",
  city: "",
  state: "",
  zipCode: "",
  email: "",
  phone: "",
  fax: "",
  mobile: "",
  resultFolder: "",
  sendSmsAlert: false,
  logo: null,
};

const ClientList = () => {
  const [activeTab, setActiveTab] = useState("view-clients");
  const [clients, setClients] = useState<Client[]>(mockClients);
  const [filters, setFilters] = useState<ClientFilterValues>(initialFilters);
  const [assignPanelOpen, setAssignPanelOpen] = useState(false);
  const [assignType, setAssignType] = useState<AssignType | null>(null);
  const [assignClient, setAssignClient] = useState<{ id: string; name: string } | null>(null);
  const [createFormData, setCreateFormData] = useState<ClientFormData>(initialFormState);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);

  useEffect(() => {
    return () => {
      if (createFormData.logo && createFormData.logo.startsWith("blob:")) {
        URL.revokeObjectURL(createFormData.logo);
      }
    };
  }, [createFormData.logo]);

  const openAssignPanel = (client: Client, type: AssignType) => {
    setAssignClient({ id: client.id, name: client.clientName });
    setAssignType(type);
    setAssignPanelOpen(true);
  };

  const closeAssignPanel = () => {
    setAssignPanelOpen(false);
    setAssignType(null);
    setAssignClient(null);
  };

  const handleFilterChange = (newFilters: ClientFilterValues) => {
    setFilters(newFilters);
  };

  const handleSearch = () => {
    message.info("Filter applied (mock action)");
  };

  const handleClearAll = () => {
    setFilters(initialFilters);
  };

  const handleDeleteClient = (client: Client) => {
    Modal.confirm({
      title: "Delete Client",
      content: `Are you sure you want to delete ${client.clientName}?`,
      okText: "Delete",
      okType: "danger",
      cancelText: "Cancel",
      onOk: () => {
        setClients((prev) => prev.filter((c) => c.id !== client.id));
        message.success("Client deleted");
        if (selectedClient?.id === client.id) {
          setSelectedClient(null);
        }
      },
    });
  };

  const handleCreateClient = () => {
    if (!createFormData.clientId || !createFormData.clientName) {
      message.warning("Client ID and Client name are required");
      return;
    }

    const newClient: Client = {
      id: Date.now().toString(),
      clientId: createFormData.clientId,
      clientName: createFormData.clientName,
      type: createFormData.type,
      address: createFormData.address,
      city: createFormData.city,
      state: createFormData.state,
      zipCode: createFormData.zipCode,
      email: createFormData.email,
      phone: createFormData.phone,
      fax: createFormData.fax,
      mobile: createFormData.mobile,
      resultFolder: createFormData.resultFolder,
      sendSmsAlert: createFormData.sendSmsAlert,
      createdDate: new Date().toLocaleDateString(),
      logo: createFormData.logo,
    };

    setClients((prev) => [...prev, newClient]);
    message.success("Client created");
    setActiveTab("view-clients");
    resetCreateForm();
  };

  const resetCreateForm = () => {
    if (createFormData.logo && createFormData.logo.startsWith("blob:")) {
      URL.revokeObjectURL(createFormData.logo);
    }
    setCreateFormData(initialFormState);
  };

  const handleFormChange = <Key extends keyof ClientFormData>(key: Key, value: ClientFormData[Key]) => {
    setCreateFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleLogoChange = (file: File | null) => {
    setCreateFormData((prev) => {
      if (prev.logo && prev.logo.startsWith("blob:")) {
        URL.revokeObjectURL(prev.logo);
      }

      if (!file) {
        return { ...prev, logo: null };
      }

      const previewUrl = URL.createObjectURL(file);
      return { ...prev, logo: previewUrl };
    });
  };

  const filteredClients = useMemo(() => {
    return clients.filter((client) => {
      const matchesClientId = filters.clientId
        ? client.clientId.toLowerCase().includes(filters.clientId.toLowerCase())
        : true;
      const matchesClientName = filters.clientName
        ? client.clientName.toLowerCase().includes(filters.clientName.toLowerCase())
        : true;
      const matchesType = filters.type ? client.type === filters.type : true;

      return matchesClientId && matchesClientName && matchesType;
    });
  }, [clients, filters]);

  const columns = [
    {
      title: "Client ID",
      dataIndex: "clientId",
      key: "clientId",
    },
    {
      title: "Client Name",
      dataIndex: "clientName",
      key: "clientName",
      render: (_: string, record: Client) => (
        <button
          type="button"
          className="font-semibold text-indigo-600 hover:text-indigo-800"
          onClick={() => setSelectedClient(record)}
        >
          {record.clientName}
        </button>
      ),
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      render: (type: string) => (
        <span className="px-2 py-1 text-xs font-medium rounded-full bg-indigo-100 text-indigo-700">
          {type}
        </span>
      ),
    },
    {
      title: "Assign",
      key: "assign",
      align: "center" as const,
      width: 140,
      render: (record: Client) => (
        <div className="flex items-center justify-center gap-4">
          <div
            className="cursor-pointer text-gray-500 hover:text-indigo-600"
            title="Assign ICD Codes"
            onClick={() => openAssignPanel(record, "ICD Codes")}
          >
            <ClipboardList className="h-4 w-4" />
          </div>
          <div
            className="cursor-pointer text-gray-500 hover:text-indigo-600"
            title="Assign Panel"
            onClick={() => openAssignPanel(record, "Panel")}
          >
            <Layers className="h-4 w-4" />
          </div>
        </div>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (record: Client) => (
        <div className="flex items-center gap-2">
          <Button
            type="text"
            size="small"
            icon={<Eye className="h-4 w-4" />}
            onClick={() => setSelectedClient(record)}
            className="text-indigo-600 hover:text-indigo-700"
          />
          <Button
            type="text"
            size="small"
            icon={<Trash2 className="h-4 w-4" />}
            onClick={() => handleDeleteClient(record)}
            className="text-red-600 hover:text-red-700"
          />
        </div>
      ),
    },
  ];

  const tabItems = [
    { key: "view-clients", label: "View Clients" },
    { key: "create-client", label: "Add Client" },
  ];

  return (
    <div className="space-y-6 px-4 pb-10">
      <AppTabs
        tabs={tabItems}
        activeKey={activeTab}
        onChange={(key) => {
          setActiveTab(key);
          if (key === "view-clients") {
            setSelectedClient(null);
          }
        }}
      />

      {activeTab === "view-clients" ? (
        selectedClient ? (
          <ClientDetails
            client={selectedClient}
            onBack={() => setSelectedClient(null)}
            onUpdate={(updatedClient: Client) => {
              setClients((prev) =>
                prev.map((client) =>
                  client.id === updatedClient.id ? updatedClient : client
                )
              );
              setSelectedClient(updatedClient);
            }}
          />
        ) : (
          <div className="space-y-6">
            <ClientFilterComponent
              filters={filters}
              onFilterChange={handleFilterChange}
              onSearch={handleSearch}
              onClearAll={handleClearAll}
            />

            <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
              <AppTable
                columns={columns}
                data={filteredClients}
                rowKey="id"
                loading={false}
                pagination={{
                  pageSize: 10,
                  showSizeChanger: true,
                  pageSizeOptions: ["10", "20", "50"],
                  showTotal: (total, range) => `${range[0]}-${range[1]} of ${total}`,
                }}
                className="clients-table"
              />
            </div>
          </div>
        )
      ) : (
        <div className="space-y-6 pt-6">
          <ClientForm
            formData={createFormData}
            onChange={handleFormChange}
            onLogoChange={handleLogoChange}
          />

          <div className="flex items-center justify-end gap-3 pt-6 border-t border-gray-100">
            <Button
              className="rounded-lg border border-gray-300 px-5 py-2 text-sm font-semibold text-gray-700 transition hover:border-indigo-600 hover:text-indigo-600"
              onClick={resetCreateForm}
            >
              Reset
            </Button>
            <Button
              type="primary"
              className="btn-primary rounded-lg px-5 py-2 text-sm font-semibold shadow-md"
              onClick={handleCreateClient}
            >
              Submit
            </Button>
          </div>
        </div>
      )}

      <AssignPanel
        open={assignPanelOpen}
        onClose={closeAssignPanel}
        assignType={assignType}
        user={assignClient}
      />
    </div>
  );
};

export default ClientList;
