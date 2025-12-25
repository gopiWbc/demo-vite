import type { UploadFile } from "antd/es/upload/interface";

export type SalesLogAttachment = {
  uid: string;
  name: string;
  status?: UploadFile["status"];
  url?: string;
  type?: string;
};

export type SalesLogRecord = {
  id: string;
  name: string;
  logDate: string;
  subject: string;
  clientName: string;
  visitStatus: string;
  callbackDate?: string;
  salesTeam?: string;
  mobilePhone?: string;
  clientContactInfo?: string;
  city?: string;
  state?: string;
  physicianName?: string;
  address1?: string;
  address2?: string;
  zipCode?: string;
  workPhone?: string;
  message?: string;
  attachments?: SalesLogAttachment[];
  createdAt?: string;
  updatedAt?: string;
};

export type SalesLogFilterValues = {
  logDate: string;
  callbackDate: string;
  clientName: string;
  visitStatus: string;
  salesTeam: string;
};

export type SalesLogFormData = {
  logDateTime: string;
  callbackDateTime: string;
  subject: string;
  salesTeam: string;
  name: string;
  mobilePhone: string;
  clientName: string;
  clientContactInfo: string;
  physicianName: string;
  city: string;
  state: string;
  address1: string;
  address2: string;
  zipCode: string;
  workPhone: string;
  visitStatus: string;
  message: string;
  attachments: UploadFile[];
};
