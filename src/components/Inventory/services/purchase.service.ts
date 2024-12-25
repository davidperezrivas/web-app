import { inventoryUrlApi } from './url';
import { petitionWithToken } from '../../../services/services';
import { increaseInventoryModel } from '../models/Request.model';

export const getInventory = async () => {
  const response = await petitionWithToken(inventoryUrlApi.inventory, '', 'GET');

  const data = await response.json();
  if (response.status >= 400) {
    throw new Error(data.msg);
  }

  return data;
};
