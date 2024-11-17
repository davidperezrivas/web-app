import User from '../models/Users';
import { CreateUserModel, UpdateUserModel } from '../models/Request.model';
import { usersUrlApi } from './url';
import { fetchWithoutToken, petitionWithToken } from '../../../services/services';
import Role from '../models/Role';

export const getAllUsers = async (): Promise<User[]> => {
  const response = await petitionWithToken(usersUrlApi.users, '', 'GET');
  const data = await response.json();
  return data;
};

export const getUserById = async (id: string): Promise<User> => {
  const url = `${usersUrlApi.users}/getById?id=${id}`;
  const response = await petitionWithToken(url, '', 'GET');
  const data = await response.json();
  return data;
};

export const getRoles = async (): Promise<Role[]> => {
  const url = `${usersUrlApi.users}/getRoles`;
  const response = await petitionWithToken(url, '', 'GET');
  const data = await response.json();
  return data;
};

export const createUser = async (user: CreateUserModel) => {
  const response = await petitionWithToken(usersUrlApi.users, user, 'POST');

  if (response.status >= 400) {
    const data = await response.json();
    throw new Error(data.msg);
  }
};

export const updateUser = async (user: UpdateUserModel) => {
  const response = await petitionWithToken(usersUrlApi.users, user, 'PATCH');

  if (response.status >= 400) {
    const data = await response.json();
    throw new Error(data.msg);
  }
};

export const DeleteUser = async (id: string) => {
  const url = `${usersUrlApi.users}/?id=${id}`;
  const response = await petitionWithToken(url, '', 'DELETE');

  if (response.status >= 400) {
    const data = await response.json();
    throw new Error(data.msg);
  }
};

export const recoverPassword = async (email: { email: string }): Promise<any> => {
  const response = await fetchWithoutToken(usersUrlApi.recoverPassword, email, 'POST');

  const data = await response.json();

  if (response.status >= 400) {
    throw new Error(data.msg);
  }
  return data;
};

export const updatePassword = async (info: { password: string; token: string }): Promise<any> => {
  const response = await fetchWithoutToken(usersUrlApi.updatePassword, info, 'POST');

  const data = await response.json();

  if (response.status >= 400) {
    throw new Error(data.msg);
  }
  return data;
};
