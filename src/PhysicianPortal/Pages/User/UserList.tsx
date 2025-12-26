import { useState } from "react";
import { Button, Modal } from "antd";
import { Trash2, Eye, FlaskConical, Stethoscope, Briefcase, Users as UsersIcon } from "lucide-react";
import AppTabs from "../../../PatientPortal-V3/Protected/components/AppTabs";
import AppTable from "../../Components/AppTable";
import UserFilterComponent from "./UserFilterComponent";
import UserForm from "./UserForm";
import UserDetails from "./UserDetails";
import AssignPanel from "./AssignPanel";

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  middleName: string;
  email: string;
  phone: string;
  role: string;
  status: "Active" | "Inactive";
  createdDate: string;
  lastLogin?: string;
  mobile?: string;
  alternateMobile?: string;
  emailAsUsername?: boolean;
  username?: string;
  language?: string;
  userId?: string;
  password?: string;
  confirmPassword?: string;
  passwordExpiry?: string;
  recordsPerPage?: number;
  canOrderTest?: string;
  showResults?: string;
  criticalAlert?: string;
  specialResultWatch?: string;
  resultToBeWatched?: string;
  alertsStartingHour?: number;
  alertsHowManyHours?: string;
};

export type UserFilterValues = {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  status: string;
  username: string;
  clientId: string;
  phone: string;
  filterBy: string;
};

const mockUsers: User[] = [
  {
    id: "1",
    firstName: "John",
    lastName: "Doe",
    middleName: "Michael",
    email: "john.doe@hospital.com",
    phone: "(555) 123-4567",
    role: "Physician",
    status: "Active",
    createdDate: "01/15/2024",
    lastLogin: "12/20/2024 10:30 AM",
  },
  {
    id: "2",
    firstName: "Jane",
    lastName: "Smith",
    middleName: "Elizabeth",
    email: "jane.smith@hospital.com",
    phone: "(555) 987-6543",
    role: "Administrator",
    status: "Active",
    createdDate: "02/20/2024",
    lastLogin: "12/21/2024 2:15 PM",
  },

];

const UserList = () => {
  const [activeTab, setActiveTab] = useState("view-users");
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [filters, setFilters] = useState<UserFilterValues>({
    firstName: "",
    lastName: "",
    email: "",
    role: "",
    status: "",
    username: "",
    clientId: "",
    phone: "",
    filterBy: "",
  });

  // Form data for the "Create User" tab
  const [createTabFormData, setCreateTabFormData] = useState({
    role: undefined,
    recordsPerPage: 10,
    status: "Active" as "Active" | "Inactive",
    canOrderTest: false,
    showResults: "All",
    criticalAlert: false,
    emailAsUsername: true,
    firstName: "",
    lastName: "",
    middleName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
  });

  // Assign Panel State
  const [assignPanelOpen, setAssignPanelOpen] = useState(false);
  const [assignType, setAssignType] = useState<"Physician" | "Sales Rep" | "Client" | null>(null);
  const [assignUser, setAssignUser] = useState<{ id: string; name: string } | null>(null);

  const openAssignPanel = (user: User, type: "Physician" | "Sales Rep" | "Client") => {
    setAssignUser({ id: user.id, name: `${user.firstName} ${user.lastName}` });
    setAssignType(type);
    setAssignPanelOpen(true);
  };

  const closeAssignPanel = () => {
    setAssignPanelOpen(false);
    setAssignType(null);
    setAssignUser(null);
  };

  const tabs = [
    { key: "view-users", label: "View Users" },
    { key: "create-user", label: "Create User" },
  ];

  const handleCreateUser = (userData: any) => {
    // In a real app, you'd validate and send to API
    const newUser: User = {
      id: Date.now().toString(),
      createdDate: new Date().toLocaleDateString(),
      firstName: userData.firstName,
      lastName: userData.lastName,
      middleName: userData.middleName,
      email: userData.email,
      phone: userData.phone || "",
      role: userData.role,
      status: userData.status,
    } as User;
    
    setUsers((prev) => [...prev, newUser]);
    setActiveTab("view-users");
    // Reset form
    setCreateTabFormData({
        role: undefined,
        recordsPerPage: 10,
        status: "Active",
        canOrderTest: false,
        showResults: "All",
        criticalAlert: false,
        emailAsUsername: true,
        firstName: "",
        lastName: "",
        middleName: "",
        email: "",
        password: "",
        confirmPassword: "",
        phone: "",
    });
  };

  const handleUpdateUser = (updatedUser: User) => {
    setUsers((prev) =>
      prev.map((user) => (user.id === updatedUser.id ? updatedUser : user))
    );
    setSelectedUser(updatedUser); // Update the selected user view as well
  };

  const handleDeleteUser = (user: User) => {
    Modal.confirm({
      title: "Delete User",
      content: `Are you sure you want to delete ${user.firstName} ${user.lastName}?`,
      okText: "Delete",
      okType: "danger",
      cancelText: "Cancel",
      onOk: () => {
        setUsers((prev) => prev.filter((u) => u.id !== user.id));
        if (selectedUser?.id === user.id) {
            setSelectedUser(null);
        }
      },
    });
  };

  const handleFilterChange = (newFilters: UserFilterValues) => {
    setFilters(newFilters);
  };

  const handleSearch = () => {
    console.log("Searching with filters:", filters);
  };

  const handleClearAll = () => {
    setFilters({
      firstName: "",
      lastName: "",
      email: "",
      role: "",
      status: "",
      username: "",
      clientId: "",
      phone: "",
      filterBy: "",
    });
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "firstName",
      key: "name",
      render: (firstName: string, record: User) => (
        <div 
            className="cursor-pointer hover:text-indigo-600"
            onClick={() => setSelectedUser(record)}
        >
          <div className="font-semibold text-gray-900 hover:text-indigo-600">
            {firstName} {record.lastName}
          </div>
          {record.middleName && (
            <div className="text-xs text-gray-500">{record.middleName}</div>
          )}
        </div>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (role: string) => (
        <span className="px-2 py-1 text-xs font-medium rounded-full bg-indigo-100 text-indigo-700">
          {role}
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <span
          className={`px-2 py-1 text-xs font-medium rounded-full ${
            status === "Active"
              ? "bg-green-100 text-green-700"
              : "bg-gray-100 text-gray-700"
          }`}
        >
          {status}
        </span>
      ),
    },
    {
      title: "Created Date",
      dataIndex: "createdDate",
      key: "createdDate",
    },
    {
      title: "Last Login",
      dataIndex: "lastLogin",
      key: "lastLogin",
      render: (lastLogin: string) => lastLogin || "--",
    },
    {
      title: "Watch",
      key: "watch",
      align: "center" as const,
      width: 80,
      render: () => (
        <div className="flex justify-center">
          <FlaskConical className="h-4 w-4 text-indigo-600 cursor-pointer hover:text-indigo-800" />
        </div>
      ),
    },
    {
      title: "Assign",
      key: "assign",
      align: "center" as const,
      width: 150,
      render: (record: User) => (
        <div className="flex items-center justify-center gap-3">
          <div 
            className="cursor-pointer text-gray-500 hover:text-indigo-600" 
            title="Assign Physician"
            onClick={() => openAssignPanel(record, "Physician")}
          >
            <Stethoscope className="h-4 w-4" />
          </div>
          <div 
            className="cursor-pointer text-gray-500 hover:text-indigo-600" 
            title="Assign Sales Rep"
            onClick={() => openAssignPanel(record, "Sales Rep")}
          >
            <Briefcase className="h-4 w-4" />
          </div>
          <div 
            className="cursor-pointer text-gray-500 hover:text-indigo-600" 
            title="Assign Client"
            onClick={() => openAssignPanel(record, "Client")}
          >
            <UsersIcon className="h-4 w-4" />
          </div>
        </div>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      fixed: "right" as const,
      render: (record: User) => (
        <div className="flex items-center gap-2">
          <Button
            type="text"
            size="small"
            icon={<Eye className="h-4 w-4" />}
            onClick={() => setSelectedUser(record)}
            className="text-indigo-600 hover:text-indigo-700"
          />
          <Button
            type="text"
            size="small"
            icon={<Trash2 className="h-4 w-4" />}
            onClick={() => handleDeleteUser(record)}
            className="text-red-600 hover:text-red-700"
          />
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-2 pb-5">

      <AppTabs tabs={tabs} activeKey={activeTab} onChange={(key) => {
          setActiveTab(key);
          if (key === 'view-users') setSelectedUser(null);
      }} />

      {activeTab === "create-user" ? (
        <div className="pt-6">
            <UserForm
              formData={createTabFormData}
              onChange={(field, value) =>
                setCreateTabFormData((prev) => ({ ...prev, [field]: value }))
              }
            />
            <div className="flex items-center justify-end gap-3 mt-6 pt-6 border-t border-gray-200">
              <Button className="rounded-lg border border-gray-300 px-5 py-2 text-sm font-semibold text-gray-700 transition hover:border-indigo-600 hover:text-indigo-600">
                Reset
              </Button>
              <Button
                type="primary"
                className="btn-primary rounded-lg px-5 py-2 text-sm font-semibold shadow-md"
                onClick={() => handleCreateUser(createTabFormData)}
              >
                Create User
              </Button>
            </div>
        </div>
      ) : (
        <>
            {selectedUser ? (
                <UserDetails 
                    user={selectedUser} 
                    onBack={() => setSelectedUser(null)}
                    onUpdate={handleUpdateUser}
                />
            ) : (
                <div className="space-y-6">
                <UserFilterComponent
                    filters={filters}
                    onFilterChange={handleFilterChange}
                    onSearch={handleSearch}
                    onClearAll={handleClearAll}
                />

                <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
                    <AppTable
                    columns={columns}
                    data={users}
                    loading={false}
                    rowKey="id"
                    pagination={{
                        pageSize: 10,
                        showSizeChanger: true,
                        pageSizeOptions: ["10", "20", "50"],
                        showTotal: (total, range) =>
                        `${range[0]}-${range[1]} of ${total}`,
                    }}
                    className="users-table"
                    />
                </div>
                </div>
            )}
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

export default UserList;