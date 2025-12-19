import type { Dayjs } from "dayjs";

export type FilterValues = {
  patientName: string;
  patientId: string;
  status: string[];
  category: string[];
  dateRange: [Dayjs | null, Dayjs | null];
  provider: string;
};

export type ResultRecord = {
  id: string;
  reportedDate: string;
  collectedDate: string;
  patientName: string;
  dob: string;
  patientId: string;
  accession: string;
  orderingProvider: string;
  accountNumber: string;
  orderedTests: string;
  status: "Preliminary" | "Final";
  category: string;
  flagged?: boolean;
};
