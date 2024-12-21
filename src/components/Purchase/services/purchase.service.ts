import { inventoryUrlApi } from './url';
import { petitionWithToken } from '../../../services/services';
import { increaseInventoryModel } from '../models/Request.model';

export const purchaseInventory = async () => {
  const response = await petitionWithToken(inventoryUrlApi.inventory, '', 'GET');

  const data = await response.json();
  if (response.status >= 400) {
    throw new Error(data.msg);
  }

  return data;
};

export const increaseInventory = async (inventory: increaseInventoryModel) => {
  const response = await petitionWithToken(inventoryUrlApi.inventory, inventory, 'POST');

  if (response.status >= 400) {
    const data = await response.json();
    throw new Error(data.msg);
  }
};
