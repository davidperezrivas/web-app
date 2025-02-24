export interface IInventory {
  id: string;
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
  id: string;
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

export interface ModalDeleteProps {
  closeEvent: React.Dispatch<React.SetStateAction<boolean>>;
  id: string;
}
