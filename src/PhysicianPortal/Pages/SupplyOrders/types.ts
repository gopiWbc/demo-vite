export type SupplyOrderItem = {
  id: string;
  name: string;
  code: string;
  category: string;
  description: string;
  image: string;
  quantity: number;
};

export type SupplyOrderRecord = {
  id: string;
  clientId: string;
  orderDate: string;
  orderedBy: string;
  supplies: SupplyOrderItem[];
  notes: string;
};

export type SupplyOrderFilters = {
  clientId: string;
  orderDateRange: [string | null, string | null];
};
