import { useMemo, useState } from "react";
import { Button } from "antd";
import { PenLine, Plus, Trash2 } from "lucide-react";

import IpaPatientFilterComponent, {
  type IpaPatientFilterValues,
} from "./IpaPatientFilterComponent";
import IpaPatientModal, { type IpaPatientItem } from "./IpaPatientModal";
import AppTable from "../../../Components/AppTable";
import AppTabs from "../../../../PatientPortal-V3/Protected/components/AppTabs";

type PatientTabKey = "view" | "import";

const mockPatients: IpaPatientItem[] = [
  {
    id: "1",
    ipaClient: "CL1",
    patientId: "CL1",
    ipaPatientId: "CL1",
    firstName: "SA",
    lastName: "SAKTHI",
    dob: "05/25/2001",
  },
  {
    id: "2",
    ipaClient: "Client5001",
    patientId: "KL90",
    ipaPatientId: "KL90",
    firstName: "FCNS",
    lastName: "DOE",
    dob: "02/05/1981",
  },
  {
    id: "3",
    ipaClient: "KL90",
    patientId: "KL90",
    ipaPatientId: "KL90",
    firstName: "JANANI",
    lastName: "DOE",
    dob: "03/06/1980",
  },
];

const initialFilters: IpaPatientFilterValues = {
  ipaClient: "",
  patientId: "",
  firstName: "",
  lastName: "",
};

const patientTabItems = [
  { key: "view" as PatientTabKey, label: "View IPA Patients" },
  { key: "import" as PatientTabKey, label: "Import" },
];

const IpaPatientRoutingPage = () => {
  const [activeTab, setActiveTab] = useState<PatientTabKey>("view");
  const [patients, setPatients] = useState<IpaPatientItem[]>(mockPatients);
  const [filters, setFilters] = useState<IpaPatientFilterValues>(initialFilters);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<IpaPatientItem | null>(null);

  const filteredData = useMemo(() => {
    return patients.filter((patient) => {
      const ipaClientMatch =
        filters.ipaClient && filters.ipaClient !== ""
          ? patient.ipaClient === filters.ipaClient
          : true;
      const patientIdMatch = filters.patientId
        ? patient.patientId.toLowerCase().includes(filters.patientId.toLowerCase())
        : true;
      const firstNameMatch = filters.firstName
        ? patient.firstName.toLowerCase().includes(filters.firstName.toLowerCase())
        : true;
      const lastNameMatch = filters.lastName
        ? patient.lastName.toLowerCase().includes(filters.lastName.toLowerCase())
        : true;

      return ipaClientMatch && patientIdMatch && firstNameMatch && lastNameMatch;
    });
  }, [patients, filters]);

  const handleFilterChange = (updated: IpaPatientFilterValues) => setFilters(updated);

  const handleSearch = () => {
    // Placeholder log for future API integration.
    // eslint-disable-next-line no-console
    console.log("Applying IPA patient routing filters", filters);
  };

  const handleClear = () => setFilters(initialFilters);

  const openCreate = () => {
    setEditing(null);
    setModalOpen(true);
  };

  const openEdit = (item: IpaPatientItem) => {
    setEditing(item);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditing(null);
  };

  const handleSave = (item: IpaPatientItem) => {
    setPatients((prev) => {
      const exists = prev.some((patient) => patient.id === item.id);
      if (exists) {
        return prev.map((patient) => (patient.id === item.id ? item : patient));
      }
      return [item, ...prev];
    });
    closeModal();
  };

  const handleDelete = (item: IpaPatientItem) => {
    setPatients((prev) => prev.filter((patient) => patient.id !== item.id));
  };

  const columns = [
    {
      title: "IPA client ID",
      dataIndex: "ipaClient",
      key: "ipaClient",
      sorter: (a: IpaPatientItem, b: IpaPatientItem) => a.ipaClient.localeCompare(b.ipaClient),
      render: (value: string) => <span className="text-gray-800 font-medium">{value}</span>,
    },
    {
      title: "IPA patient ID",
      dataIndex: "ipaPatientId",
      key: "ipaPatientId",
      sorter: (a: IpaPatientItem, b: IpaPatientItem) => a.ipaPatientId.localeCompare(b.ipaPatientId),
    },
    {
      title: "Patient ID",
      dataIndex: "patientId",
      key: "patientId",
      sorter: (a: IpaPatientItem, b: IpaPatientItem) => a.patientId.localeCompare(b.patientId),
    },
    {
      title: "First name",
      dataIndex: "firstName",
      key: "firstName",
      sorter: (a: IpaPatientItem, b: IpaPatientItem) => a.firstName.localeCompare(b.firstName),
    },
    {
      title: "Last name",
      dataIndex: "lastName",
      key: "lastName",
      sorter: (a: IpaPatientItem, b: IpaPatientItem) => a.lastName.localeCompare(b.lastName),
    },
    {
      title: "DOB",
      dataIndex: "dob",
      key: "dob",
    },
    {
      title: "Actions",
      key: "actions",
      width: 120,
      render: (record: IpaPatientItem) => (
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
      <AppTabs
        tabs={patientTabItems}
        activeKey={activeTab}
        onChange={(key) => setActiveTab(key as PatientTabKey)}
      />

      {activeTab === "view" && (
        <div className="space-y-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h1 className="text-xl font-bold text-slate-800">IPA Patient Route</h1>
            <div className="flex flex-wrap gap-2">
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

          <IpaPatientFilterComponent
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

      {activeTab === "import" && (
        <div className="bg-white border border-dashed border-indigo-200 rounded-2xl p-8 text-center">
          <h2 className="text-lg font-semibold text-slate-800">Import IPA Patients</h2>
          <p className="mt-2 text-sm text-slate-500">
            Import functionality will be integrated soon. Prepare your CSV template and upload once available.
          </p>
          <div className="mt-6">
            <Button className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-700" disabled>
              Upload CSV
            </Button>
          </div>
        </div>
      )}

      <IpaPatientModal open={modalOpen} initial={editing} onClose={closeModal} onSave={handleSave} />
    </div>
  );
};

export default IpaPatientRoutingPage;
