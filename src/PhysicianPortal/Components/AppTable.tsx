import { Table } from "antd";
import type {
  ColumnsType,
  TablePaginationConfig,
  TableProps,
} from "antd/es/table";
import type { TableRowSelection } from "antd/es/table/interface";

interface AppTableProps<T> {
  columns: ColumnsType<T>;
  data: T[];
  loading?: boolean;
  rowKey?: string | ((record: T) => string);
  pagination?: TablePaginationConfig | false;
  onRowClick?: (record: T) => void;
  className?: string;
  rowSelection?: TableRowSelection<T> | boolean;
  rowClassName?: string | ((record: T, index: number) => string);
  onChange?: TableProps<T>["onChange"];
}

export default function AppTable<T extends object>({
  columns,
  data,
  loading = false,
  rowKey = "id",
  pagination,
  onRowClick,
  className = "",
  rowSelection,
  rowClassName,
  onChange,
}: AppTableProps<T>) {
  const defaultPagination: TablePaginationConfig = {
    pageSize: 10,
    position: ["bottomRight"],
    showSizeChanger: true,
    pageSizeOptions: ["10", "20", "50"],
    showTotal: (total, range) => `${range[0]}-${range[1]} of ${total}`,
  };

  const resolvedPagination =
    pagination === false
      ? false
      : { ...defaultPagination, ...(pagination ?? {}) };

  const resolvedRowSelection =
    rowSelection === true
      ? ({ type: "checkbox" } as TableRowSelection<T>)
      : rowSelection || undefined;

  return (
    <div className="app-table-container">
      <Table<T>
        columns={columns}
        dataSource={data}
        loading={loading}
        rowKey={rowKey}
        pagination={resolvedPagination}
        bordered={false}
        size="middle"
        className={`app-table ${className}`}
        rowSelection={resolvedRowSelection}
        rowClassName={rowClassName}
        onChange={onChange}
        onRow={(record) => ({
          onClick: () => onRowClick?.(record),
        })}
      />
    </div>
  );
}
