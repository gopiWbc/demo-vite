export interface ClientFilterValues {
  clientId: string;
  clientName: string;
  type: string;
}

export interface ClientFormData {
  type: "Lab" | "IPA" | string;
  clientId: string;
  clientName: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  email: string;
  phone: string;
  fax: string;
  mobile: string;
  resultFolder: string;
  sendSmsAlert: boolean;
  logo?: string | null;
}

export interface Client extends ClientFormData {
  id: string;
  createdDate: string;
  logo?: string | null;
}
