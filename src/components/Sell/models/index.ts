export type Inputs = {
  folio: string;
  enterprise_rut: string;
  enterprise_name: string;
  purchase_date: string;
  product: Products[];
};

type Products = {
  product: string;
  category: string;
  last_value: number;
  count: number;
};
