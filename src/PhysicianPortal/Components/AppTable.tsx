import { Table } from "antd";
import type {
  ColumnsType,
  TablePaginationConfig,
} from "antd/es/table";

interface AppTableProps<T> {
  columns: ColumnsType<T>;
  data: T[];
  loading?: boolean;
  rowKey?: string | ((record: T) => string);
  pagination?: TablePaginationConfig | false;
  onRowClick?: (record: T) => void;
  className?: string;
}

export default function AppTable<T extends object>({
  columns,
  data,
  loading = false,
  rowKey = "id",
  pagination = {
    pageSize: 10,
    position: ["bottomRight"],
    showSizeChanger: true,
  },
  onRowClick,
  className = "",
}: AppTableProps<T>) {
  return (
    <Table<T>
      columns={columns}
      dataSource={data}
      loading={loading}
      rowKey={rowKey}
      pagination={pagination}
      bordered={false}
      size="middle"
      className={`app-table ${className}`}
      onRow={(record) => ({
        onClick: () => onRowClick?.(record),
      })}
    />
  );
}
