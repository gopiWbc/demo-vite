import { useMemo, useState } from "react";
import { Button, Modal } from "antd";
import { PenLine, Trash2 } from "lucide-react";

import AppTable from "../../Components/AppTable";
import PendingRequestsFilterComponent, {
  type PendingRequestFilters,
} from "./PendingRequestsFilterComponent";
import PendingRequestDetails, {
  type PendingRequestRecord,
} from "./PendingRequestDetails";
import AssignPanel, { type AssignType } from "../User/AssignPanel";

const mockPendingRequests: PendingRequestRecord[] = [
  {
    id: "1",
    username: "Abdul-51@Wbcsoftwarelab.Com",
    firstName: "Gopi",
    lastName: "Ss",
    middleName: "",
    email: "Abdul-51@Wbcsoftwarelab.Com",
    mobile: "(555) 123-4567",
    carrier: "att",
    password: "********",
    confirmPassword: "********",
    emailAsUsername: true,
    enableClient: true,
    clientId: "CL001",
    clientName: "Primex Portal",
    address: "123 Main Street",
    city: "Los Angeles",
    state: "CA",
    zipCode: "90001",
    phone: "(555) 765-4321",
    fax: "(555) 444-8888",
    salesRepresentative: "John Smith",
    registeredDate: "12/16/2025",
  },
  {
    id: "2",
    username: "Murali@Gmail.Com",
    firstName: "Murali",
    lastName: "Arav",
    middleName: "",
    email: "Murali@Gmail.Com",
    mobile: "(555) 543-2109",
    carrier: "verizon",
    password: "********",
    confirmPassword: "********",
    emailAsUsername: true,
    enableClient: false,
    clientId: "",
    clientName: "",
    address: "456 Oak Avenue",
    city: "San Diego",
    state: "CA",
    zipCode: "92101",
    phone: "(555) 321-0987",
    fax: "",
    salesRepresentative: "",
    registeredDate: "08/06/2018",
  },
];

const PendingRequestsPage = () => {
  const [pendingRequests, setPendingRequests] = useState<PendingRequestRecord[]>(
    mockPendingRequests,
  );
  const [filters, setFilters] = useState<PendingRequestFilters>({
    username: "",
    firstName: "",
    lastName: "",
    client: "",
    filterBy: "",
  });
  const [selectedRequest, setSelectedRequest] = useState<PendingRequestRecord | null>(
    null,
  );

  const [assignPanelOpen, setAssignPanelOpen] = useState(false);
  const [assignUser, setAssignUser] = useState<{ id: string; name: string } | null>(
    null,
  );
  const [assignType, setAssignType] = useState<AssignType | null>(null);
  const [filtersExpanded, setFiltersExpanded] = useState(true);

  const filteredData = useMemo(() => {
    return pendingRequests.filter((request) => {
      const usernameMatch = filters.username
        ? request.username.toLowerCase().includes(filters.username.toLowerCase())
        : true;
      const firstNameMatch = filters.firstName
        ? request.firstName.toLowerCase().includes(filters.firstName.toLowerCase())
        : true;
      const lastNameMatch = filters.lastName
        ? request.lastName.toLowerCase().includes(filters.lastName.toLowerCase())
        : true;
      const clientMatch = filters.client
        ? request.clientName.toLowerCase().includes(filters.client.toLowerCase())
        : true;

      return usernameMatch && firstNameMatch && lastNameMatch && clientMatch;
    });
  }, [pendingRequests, filters]);

  const handleFilterChange = (updated: PendingRequestFilters) => setFilters(updated);

  const handleSearch = () => {
    // eslint-disable-next-line no-console
    console.log("Applying pending requests filters", filters);
  };

  const handleClear = () =>
    setFilters({ username: "", firstName: "", lastName: "", client: "", filterBy: "" });

  const handleEdit = (request: PendingRequestRecord) => {
    setSelectedRequest(request);
  };

  const handleBack = () => setSelectedRequest(null);

  const handleUpdate = (updated: PendingRequestRecord) => {
    setPendingRequests((prev) =>
      prev.map((record) => (record.id === updated.id ? updated : record)),
    );
    setSelectedRequest(updated);
  };

  const handleApprove = (approved: PendingRequestRecord) => {
    setPendingRequests((prev) => prev.filter((record) => record.id !== approved.id));
    setSelectedRequest(null);
  };

  const handleCancel = () => setSelectedRequest(null);

  const openAssignPanel = (request: PendingRequestRecord, type: AssignType) => {
    setAssignUser({ id: request.id, name: `${request.firstName} ${request.lastName}` });
    setAssignType(type);
    setAssignPanelOpen(true);
  };

  const closeAssignPanel = () => {
    setAssignPanelOpen(false);
    setAssignType(null);
    setAssignUser(null);
  };

  const handleDelete = (request: PendingRequestRecord) => {
    Modal.confirm({
      title: "Delete Pending Request",
      content: `Are you sure you want to delete ${request.username}?`,
      okText: "Delete",
      okType: "danger",
      cancelText: "Cancel",
      onOk: () =>
        setPendingRequests((prev) => prev.filter((record) => record.id !== request.id)),
    });
  };

  const columns = [
    {
      title: "Edit",
      key: "edit",
      width: 70,
      render: (record: PendingRequestRecord) => (
        <Button
          type="text"
          size="small"
          icon={<PenLine className="h-4 w-4" />}
          onClick={() => handleEdit(record)}
          className="text-indigo-600 hover:text-indigo-700"
        />
      ),
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "First name",
      dataIndex: "firstName",
      key: "firstName",
    },
    {
      title: "Last name",
      dataIndex: "lastName",
      key: "lastName",
    },
    {
      title: "Registered date",
      dataIndex: "registeredDate",
      key: "registeredDate",
    },
    {
      title: "Email address",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Del",
      key: "delete",
      width: 70,
      render: (record: PendingRequestRecord) => (
        <Button
          type="text"
          size="small"
          icon={<Trash2 className="h-4 w-4" />}
          onClick={() => handleDelete(record)}
          className="text-red-600 hover:text-red-700"
        />
      ),
    },
  ];

  return (
    <div className="space-y-6 px-4 pb-10">
      {!selectedRequest&&<div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-slate-800">Pending Requests</h1>
      </div>}

      {selectedRequest ? (
        <PendingRequestDetails
          request={selectedRequest}
          onBack={handleBack}
          onUpdate={handleUpdate}
          onApprove={handleApprove}
          onCancel={handleCancel}
          onAssign={(type) => {
            if (selectedRequest) {
              openAssignPanel(selectedRequest, type);
            }
          }}
        />
      ) : (
        <>
          <PendingRequestsFilterComponent
            filters={filters}
            onFilterChange={handleFilterChange}
            onSearch={handleSearch}
            onClearAll={handleClear}
            expanded={filtersExpanded}
            onToggle={setFiltersExpanded}
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
        </>
      )}

      <AssignPanel
        open={assignPanelOpen}
        onClose={closeAssignPanel}
        assignType={assignType}
        user={assignUser}
      />
    </div>
  );
};

export default PendingRequestsPage;
