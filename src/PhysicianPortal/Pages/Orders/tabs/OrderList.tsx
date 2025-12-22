import { useMemo, useState } from 'react'
import AppTable from '../../../Components/AppTable'
import { orderColumns } from '../columns'
import OrderFilterComponent from '../FilterComponent'
import type { OrderFilterValues, OrderRecord } from '../types'

const ordersData: OrderRecord[] = [
  {
    id: "ORD-2001",
    status: "Pending",
    type: "New",
    orderDate: "06/17/2025",
    clientId: "WbcTester123",
    patientName: "Gurumurthy, G",
    dob: "08/05/1995",
  },
  {
    id: "ORD-2002",
    status: "Active",
    type: "Reorder",
    orderDate: "06/17/2025",
    clientId: "WbcTester123",
    patientName: "Goenka, Sanjeev",
    dob: "03/07/2018",
  },
  {
    id: "ORD-2003",
    status: "Completed",
    type: "New",
    orderDate: "06/16/2025",
    clientId: "WbcTester123",
    patientName: "Goenka, Sanjeev",
    dob: "03/07/2018",
  },
  {
    id: "ORD-2004",
    status: "Pending",
    type: "New",
    orderDate: "06/16/2025",
    clientId: "WbcTester123",
    patientName: "Goenka, Sanjeev",
    dob: "03/07/2018",
  },
  {
    id: "ORD-2005",
    status: "Completed",
    type: "Update",
    orderDate: "06/14/2025",
    clientId: "WbcTester123",
    patientName: "Goenka, Sanjeev",
    dob: "03/07/2018",
  },
  {
    id: "ORD-2007",
    status: "Active",
    type: "New",
    orderDate: "05/28/2025",
    clientId: "WbcTester123",
    patientName: "Ks, Alex",
    dob: "05/01/2025",
  },
  {
    id: "ORD-2008",
    status: "Completed",
    type: "Reorder",
    orderDate: "05/24/2025",
    clientId: "WbcTester123",
    patientName: "Edwin, A",
    dob: "05/01/2025",
  },
];


const OrderList = () => {

    const initialFilters: OrderFilterValues = {
  patientId: "",
  clientId: "",
  patientName: "",
  status: [],
  dateRange: [null, null],
};

    const [filters, setFilters] = useState<OrderFilterValues>(initialFilters);

  const activeFilterCount = useMemo(() => {
    const { patientId, clientId, patientName, status, dateRange } = filters;
    const baseCount = [patientId, clientId, patientName].filter(Boolean).length + status.length;
    const hasDateRange = dateRange[0] && dateRange[1] ? 1 : 0;
    return baseCount + hasDateRange;
  }, [filters]);

  const handleSearch = () => {
    // Hook up API call or client-side filtering here
    console.log("Searching orders with filters:", filters);
  };

  const handleClearAll = () => {
    setFilters(initialFilters);
  };
  return (
    <div className="space-y-3">
        <div className="flex justify-end items-center gap-3">
            <button className="btn-primary rounded-lg px-5 py-2 text-sm font-semibold shadow-md">
              Export
            </button>
          </div>
          <OrderFilterComponent
            filters={filters}
            onFilterChange={setFilters}
            activeFilterCount={activeFilterCount}
            onSearch={handleSearch}
            onClearAll={handleClearAll}
          />

          <AppTable<OrderRecord>
            columns={orderColumns}
            data={ordersData}
            rowKey="id"
            rowSelection={{ type: "checkbox" }}
            onChange={() => undefined}
          />
        </div>
  )
}

export default OrderList