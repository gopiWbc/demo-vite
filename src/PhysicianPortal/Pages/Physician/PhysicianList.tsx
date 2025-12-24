import { useState } from "react";
import { Trash2, Eye } from "lucide-react";
import { Button, Modal } from "antd";
import AppTabs from "../../../PatientPortal-V3/Protected/components/AppTabs";
import AppTable from "../../Components/AppTable";
import PhysicianFilterComponent from "./PhysicianFilterComponent";

export type PhysicianFilterValues = {
  physicianId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone1: string;
  city: string;
  state: string;
  zipCode: string;
};
import PhysicianForm from "./PhysicianForm";
import type { PhysicianFormData } from "./PhysicianForm";
import PhysicianDetails from "./PhysicianDetails";
import type { Physician } from "./PhysicianDetails";

const mockPhysicians: Physician[] = [
  {
    id: "1",
    physicianId: "WBcPhys077",
    firstName: "SAKTH",
    lastName: "KUMAR",
    middleName: "",
    email: "HarishKumarsubramanian28@Gmail.Com",
    address1: "123 Main St",
    city: "New York",
    state: "New York",
    country: "United States",
    zipCode: "10001",
    phone1: "(555) 123-4567",
    mobile: "(555) 987-6543",
    createdDate: "12/01/2024",
  },
  {
    id: "2",
    physicianId: "WBcPhys012",
    firstName: "WBC-NAME",
    lastName: "NAME",
    email: "Harishromos28@Gmail.Com",
    createdDate: "11/15/2024",
  },
  {
    id: "3",
    physicianId: "WBcPhy5263",
    firstName: "WBCH-NAME",
    lastName: "WBCLNAME  ",
    email: "Preethiweer96@Gmail.Com",
    createdDate: "10/22/2024",
  },
];

const PhysicianList = () => {
  const [activeTab, setActiveTab] = useState("view-physicians");
  const [physicians, setPhysicians] = useState<Physician[]>(mockPhysicians);
  const [selectedPhysician, setSelectedPhysician] = useState<Physician | null>(null);
  const [filters, setFilters] = useState<PhysicianFilterValues>({
    physicianId: "",
    firstName: "",
    lastName: "",
    email: "",
    phone1: "",
    city: "",
    state: "",
    zipCode: "",
  });

  // Form data for the "Create Physician" tab
  const [createTabFormData, setCreateTabFormData] = useState<PhysicianFormData>({
    firstName: "",
    lastName: "",
    middleName: "",
    email: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    country: "",
    zipCode: "",
    phone1: "",
    phone2: "",
    mobile: "",
    fax: "",
  });

  const handleFilterChange = (newFilters: PhysicianFilterValues) => {
    setFilters(newFilters);
  };

  const handleSearch = () => {
    // TODO: Implement actual search logic
    console.log("Searching with filters:", filters);
  };

  const handleClearFilters = () => {
    setFilters({
      physicianId: "",
      firstName: "",
      lastName: "",
      email: "",
      phone1: "",
      city: "",
      state: "",
      zipCode: "",
    });
  };

  const handleDeletePhysician = (physician: Physician) => {
    Modal.confirm({
      title: "Delete Physician",
      content: `Are you sure you want to delete ${physician.firstName} ${physician.lastName}?`,
      okText: "Delete",
      okType: "danger",
      cancelText: "Cancel",
      onOk: () => {
        setPhysicians((prev) => prev.filter((p) => p.id !== physician.id));
      },
    });
  };

  const handleCreatePhysician = () => {
    const newPhysician: Physician = {
      id: Date.now().toString(),
      physicianId: `PHY${Date.now().toString().slice(-6)}`,
      ...createTabFormData,
      createdDate: new Date().toLocaleDateString(),
    };
    setPhysicians((prev) => [...prev, newPhysician]);
    setCreateTabFormData({
      firstName: "",
      lastName: "",
      middleName: "",
      email: "",
      address1: "",
      address2: "",
      city: "",
      state: "",
      country: "",
      zipCode: "",
      phone1: "",
      phone2: "",
      mobile: "",
      fax: "",
    });
    setActiveTab("view-physicians");
  };

  const handleUpdatePhysician = (updatedPhysician: Physician) => {
    setPhysicians((prev) =>
      prev.map((p) => (p.id === updatedPhysician.id ? updatedPhysician : p))
    );
    setSelectedPhysician(null);
  };

  const handleFormChange = (field: keyof PhysicianFormData, value: string) => {
    setCreateTabFormData((prev) => ({ ...prev, [field]: value }));
  };

  const columns: any[] = [
    {
      title: "Physician ID",
      dataIndex: "physicianId",
      key: "physicianId",
      sorter: (a: any, b: any) =>
        a.physicianId.localeCompare(b.physicianId),
    },
    {
      title: "Name",
      key: "name",
      render: (record: Physician) => (
        <span>
          {record.firstName} {record.lastName}
        </span>
      ),
      sorter: (a: any, b: any) =>
        `${a.firstName} ${a.lastName}`.localeCompare(
          `${b.firstName} ${b.lastName}`
        ),
    },
    {
      title: "Email address",
      dataIndex: "email",
      key: "email",
      sorter: (a: any, b: any) => a.email.localeCompare(b.email),
    },
    {
      title: "Actions",
      key: "actions",
      render: (record: Physician) => (
        <div className="flex items-center gap-2">
          <Button
            type="text"
            size="small"
            icon={<Eye className="h-4 w-4" />}
            onClick={() => setSelectedPhysician(record)}
            className="text-indigo-600 hover:text-indigo-700"
          />
          <Button
            type="text"
            size="small"
            icon={<Trash2 className="h-4 w-4" />}
            onClick={() => handleDeletePhysician(record)}
            className="text-red-600 hover:text-red-700"
          />
        </div>
      ),
    },
  ];

  const tabItems = [
    {
      key: "view-physicians",
      label: "View Physicians",
    },
    {
      key: "create-physician",
      label: "Create Physician",
    },
  ];

  if (selectedPhysician) {
    return (
      <div className="p-6">
        <PhysicianDetails
          physician={selectedPhysician}
          onBack={() => setSelectedPhysician(null)}
          onUpdate={handleUpdatePhysician}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6 px-4 pb-10">
      <AppTabs
        tabs={tabItems}
        activeKey={activeTab}
        onChange={(key) => {
          setActiveTab(key);
          if (key === "view-physicians") setSelectedPhysician(null);
        }}
      />
      <div className="mt-6">
        {activeTab === "view-physicians" && (
          <div className="space-y-6">
            <PhysicianFilterComponent
              filters={filters}
              onFilterChange={handleFilterChange}
              onSearch={handleSearch}
              onClearAll={handleClearFilters}
            />
            <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
              <AppTable
                columns={columns}
                data={physicians}
                rowKey="id"
                pagination={{
                  pageSize: 10,
                  showSizeChanger: true,
                  pageSizeOptions: ["10", "20", "50"],
                  showTotal: (total, range) =>
                    `${range[0]}-${range[1]} of ${total}`,
                }}
              />
            </div>
          </div>
        )}
        {activeTab === "create-physician" && (
          <div className="space-y-6">
            <PhysicianForm
              formData={createTabFormData}
              onChange={handleFormChange}
            />
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
              <Button
                className="rounded-lg border border-gray-300 px-5 py-2 text-sm font-semibold text-gray-700 transition hover:border-indigo-600 hover:text-indigo-600"
                onClick={() => setActiveTab("view-physicians")}
              >
                Reset
              </Button>
              <Button
                type="primary"
                className="btn-primary rounded-lg px-5 py-2 text-sm font-semibold shadow-md"
                onClick={handleCreatePhysician}
              >
                Create Physician
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PhysicianList;
