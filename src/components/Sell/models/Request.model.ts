export interface increaseInventoryModel {
  folio: string; // Unique identifier for the purchase
  enterprise_rut: string; // RUT (tax ID) of the enterprise
  enterprise_name: string; // Name of the enterprise
  purchase_date: string; // Date of purchase in YYYY-MM-DD format
  product: Products[]; // Array of product details
}

interface Products {
  product: string; // Name of the product
  count: number; // Quantity of the product as a string
  last_value: number; // Value or price of the product as a string
  category: string; // UUID for the product category
}
