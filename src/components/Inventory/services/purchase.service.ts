import { inventoryUrlApi } from './url';
import { petitionWithToken } from '../../../services/services';

export const getInventory = async () => {
  const response = await petitionWithToken(inventoryUrlApi.inventory, '', 'GET');

  const data = await response.json();
  if (response.status >= 400) {
    throw new Error(data.msg);
  }

  return data;
};

export const deleteInventoryElement = async (id: string) => {
  const url = inventoryUrlApi.inventory + '?id=' + id;
  console.log(url);
  const response = await petitionWithToken(url, '', 'DELETE');

  const data = await response.json();
  if (response.status >= 400) {
    throw new Error(data.msg);
  }

  return data;
};
