import { useMemo, useState } from "react";
import { Button } from "antd";
import { PenLine, Trash2 } from "lucide-react";

import AppTable from "../../Components/AppTable";
import UserLogFilterComponent, { type UserLogFilterValues } from "./UserLogFilterComponent";

export type UserLogItem = {
  id: string;
  username: string;
  name: string;
  userType: string;
  logType: string;
  pageName: string;
  logDate: string;
  logTime: string;
};

const mockLogs: UserLogItem[] = [
  {
    id: "1",
    username: "Team WBC",
    name: "Team WBC",
    userType: "Administrator",
    logType: "Login",
    pageName: "UsersLog",
    logDate: "12/25/2025",
    logTime: "11:08:33",
  },
  {
    id: "2",
    username: "Team WBC",
    name: "Team WBC",
    userType: "Administrator",
    logType: "Navigation",
    pageName: "Dictionary",
    logDate: "12/25/2025",
    logTime: "10:56:44",
  },
  {
    id: "3",
    username: "Team WBC",
    name: "Team WBC",
    userType: "Administrator",
    logType: "Navigation",
    pageName: "TestCode",
    logDate: "12/25/2025",
    logTime: "10:56:22",
  },
  {
    id: "4",
    username: "Team WBC",
    name: "Team WBC",
    userType: "Administrator",
    logType: "Navigation",
    pageName: "PanelCode",
    logDate: "12/25/2025",
    logTime: "10:52:21",
  },
  {
    id: "5",
    username: "Team WBC",
    name: "Team WBC",
    userType: "Administrator",
    logType: "Navigation",
    pageName: "PendingRequest",
    logDate: "12/25/2025",
    logTime: "10:51:58",
  },
];

const initialFilters: UserLogFilterValues = {
  username: "",
  lastName: "",
  firstName: "",
  logType: "",
  userType: "",
  logDate: ["", ""],
};

const UserLogPage = () => {
  const [logs, setLogs] = useState<UserLogItem[]>(mockLogs);
  const [filters, setFilters] = useState<UserLogFilterValues>(initialFilters);

  const filteredData = useMemo(() => {
    return logs.filter((log) => {
      const usernameMatch = filters.username
        ? log.username.toLowerCase().includes(filters.username.toLowerCase())
        : true;
      const lastNameMatch = filters.lastName
        ? log.name.toLowerCase().includes(filters.lastName.toLowerCase())
        : true;
      const firstNameMatch = filters.firstName
        ? log.name.toLowerCase().includes(filters.firstName.toLowerCase())
        : true;
      const logTypeMatch = filters.logType ? log.logType === filters.logType : true;
      const userTypeMatch = filters.userType ? log.userType === filters.userType : true;
      const dateMatch = filters.logDate[0] && filters.logDate[1]
        ? log.logDate >= filters.logDate[0] && log.logDate <= filters.logDate[1]
        : true;

      return usernameMatch && lastNameMatch && firstNameMatch && logTypeMatch && userTypeMatch && dateMatch;
    });
  }, [logs, filters]);

  const handleFilterChange = (updated: UserLogFilterValues) => setFilters(updated);

  const handleSearch = () => {
    // Keep parity with other pages by logging explicit searches.
    // eslint-disable-next-line no-console
    console.log("Applying user log filters", filters);
  };

  const handleClear = () => setFilters(initialFilters);

  const handleDelete = (item: UserLogItem) => {
    setLogs((prev) => prev.filter((log) => log.id !== item.id));
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (value: UserLogItem["name"]) => <span className="text-gray-800 font-medium">{value}</span>,
    },
    {
      title: "Log date time",
      key: "logDateTime",
      render: (_: unknown, record: UserLogItem) => (
        <span className="text-gray-700">
          {record.logDate} {record.logTime}
        </span>
      ),
    },
    {
      title: "Page name",
      dataIndex: "pageName",
      key: "pageName",
      render: (value: UserLogItem["pageName"]) => <span className="text-gray-600">{value}</span>,
    },
    // {
    //   title: "Actions",
    //   key: "actions",
    //   width: 110,
    //   render: (record: UserLogItem) => (
    //     <div className="flex items-center gap-2">
    //       <Button
    //         type="text"
    //         size="small"
    //         icon={<PenLine className="h-4 w-4" />}
    //         className="text-indigo-600 hover:text-indigo-700"
    //       />
    //       <Button
    //         type="text"
    //         size="small"
    //         icon={<Trash2 className="h-4 w-4" />}
    //         onClick={() => handleDelete(record)}
    //         className="text-red-600 hover:text-red-700"
    //       />
    //     </div>
    //   ),
    // },
  ];

  return (
    <div className="space-y-2 px-4 pb-10">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-slate-800">User Logs</h1>
      </div>

      <UserLogFilterComponent
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
  );
};

export default UserLogPage;
