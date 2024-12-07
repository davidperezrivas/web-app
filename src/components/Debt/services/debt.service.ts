import IPeriod from '../models/Debt';

import { debt } from './url';
import { petitionWithToken } from '../../../services/services';

export const getAllDebts = async (): Promise<IPeriod[]> => {
  const response = await petitionWithToken(debt.debt, '', 'GET');
  const data = await response.json();
  return data;
};
