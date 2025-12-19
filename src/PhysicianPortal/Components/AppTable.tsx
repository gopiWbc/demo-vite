import { Table } from "antd";
import type {
  ColumnsType,
  TablePaginationConfig,
  TableProps,
} from "antd/es/table";
import type { TableRowSelection } from "antd/es/table/interface";
import '@/styles/AppTable.css';

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
  scroll?: TableProps<T>["scroll"];
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
  scroll,
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

  const resolvedScroll: TableProps<T>["scroll"] =
    scroll ?? { x: "max-content" };

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
        scroll={resolvedScroll}
        onRow={(record) => ({
          onClick: () => onRowClick?.(record),
        })}
      />
    </div>
  );
}
