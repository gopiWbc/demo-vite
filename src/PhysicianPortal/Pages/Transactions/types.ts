export type TransactionRecord = {
  id: string;
  clientId: string;
  accessionId: string;
  patientId: string;
  name: string;
  type: string;
  received: string;
  processed: string;
  server: string;
};

export type TransactionFilterValues = {
  clientId: string;
  name: string;
  accessionId: string;
  server: string;
  receivedRange: [string | null, string | null];
  processedRange: [string | null, string | null];
  patientId: string;
  type: string;
};
