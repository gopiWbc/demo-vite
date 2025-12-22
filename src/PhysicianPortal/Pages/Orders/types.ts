import type { Dayjs } from "dayjs";

export type OrderFilterValues = {
  patientId: string;
  clientId: string;
  patientName: string;
  status: string[];
  dateRange: [Dayjs | null, Dayjs | null];
};

export type OrderRecord = {
  id: string;
  status: "Pending" | "Completed" | "Cancelled" | "Active";
  type: string;
  orderDate: string;
  clientId: string;
  patientName: string;
  dob: string;
};
