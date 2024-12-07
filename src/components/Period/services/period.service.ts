import IPeriod from '../models/Period';

import { periodUrlApi } from './url';
import { petitionWithToken } from '../../../services/services';
import { ICreateDebt } from '../models/Request.model';

export const getActivePeriod = async (): Promise<IPeriod[]> => {
  const response = await petitionWithToken(periodUrlApi.period, '', 'GET');
  const data = await response.json();
  return data;
};

export const createDebt = async (debt: ICreateDebt): Promise<void> => {
  const response = await petitionWithToken(periodUrlApi.debt, debt, 'POST');
  const data = await response.json();
  return data;
};
