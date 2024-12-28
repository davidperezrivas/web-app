export interface IInventory {
  product: string;
  avg_value: number;
  last_value: number;
  count: number;
  folio: string;
  enterprise_rut: string;
  enterprise_name: string;
  purchase_date: string;
  category: string;
}

export interface InventoryModel {
  product: string;
  avg_value: number;
  last_value: number;
  count: number;
  folio: string;
  enterprise_rut: string;
  enterprise_name: string;
  purchase_date: string;
  categoria: any;
}
