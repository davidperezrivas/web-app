import User from '../models/Users';
import { CreateUserModel, UpdateUserModel } from '../models/Request.model';
import { usersUrlApi } from './url';
import { petitionWithToken } from '../../../services/services';
import Role from '../models/Role';

export async function getAllUsers(): Promise<User[]> {
  const response = await petitionWithToken(usersUrlApi.users, '', 'GET');
  const data = await response.json();
  return data;
}

export async function getUserById(id: string): Promise<User> {
  const url = `${usersUrlApi.users}/getById?id=${id}`;
  const response = await petitionWithToken(url, '', 'GET');
  const data = await response.json();
  return data;
}

export async function getRoles(): Promise<Role[]> {
  const url = `${usersUrlApi.users}/getRoles`;
  const response = await petitionWithToken(url, '', 'GET');
  const data = await response.json();
  return data;
}

export async function createUser(user: CreateUserModel) {
  const response = await petitionWithToken(usersUrlApi.users, user, 'POST');

  if (response.status >= 400) {
    const data = await response.json();
    throw new Error(data.msg);
  }
}

export async function updateUser(user: UpdateUserModel) {
  const response = await petitionWithToken(usersUrlApi.users, user, 'PATCH');

  if (response.status >= 400) {
    const data = await response.json();
    throw new Error(data.msg);
  }
}

export async function DeleteUser(id: string) {
  const url = `${usersUrlApi.users}/?id=${id}`;
  const response = await petitionWithToken(url, '', 'DELETE');

  if (response.status >= 400) {
    const data = await response.json();
    throw new Error(data.msg);
  }
}
