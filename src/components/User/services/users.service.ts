import User from '../models/Users';
import { CreateUserModel, UpdateUserModel } from '../models/Request.model';
import { usersUrlApi } from './url';
import { petitionWithToken } from '../../../services/services';

export async function getAllUsers(): Promise<User[]> {
  const response = await petitionWithToken(usersUrlApi.users, '', 'GET');
  const data = await response.json();
  return data;
}

export async function getUserById(id: string): Promise<User> {
  const response = await fetch(`${usersUrlApi.users}/getById?id=${id}`);
  const data = await response.json();

  return data;
}

export async function createUser(user: CreateUserModel) {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },

    body: JSON.stringify(user),
  };
  const response = await fetch(usersUrlApi.users, requestOptions);
  if (response.status >= 400) {
    const data = await response.json();
    throw new Error(data.msg);
  }
}

export async function UpdateUser(user: UpdateUserModel) {
  const requestOptions = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },

    body: JSON.stringify(user),
  };
  const response = await fetch(usersUrlApi.users, requestOptions);
  if (response.status >= 400) {
    const data = await response.json();
    throw new Error(data.msg);
  }
}

export async function DeleteUser(id: string) {
  const requestOptions = {
    method: 'DELETE',
  };
  const response = await fetch(`${usersUrlApi.users}/?id=${id}`, requestOptions);
  if (response.status >= 400) {
    const data = await response.json();
    throw new Error(data.msg);
  }
}
