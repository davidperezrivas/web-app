import User from '../../pages/Users/models/Users';
import { usersUrlApi } from './url';

export async function getAllUsers(): Promise<User[]> {
  try {
    console.log('x1');
    const response = await fetch('http://localhost:3001/v1/users');
    console.log('x2', response);
    if (!response.ok) {
      throw new Error('No se pudo obtener la lista de usuarios');
    }

    const data = await response.json();
    console.log('data', data);
    return data;
  } catch (error) {
    console.log('x2', error);
    console.error('Error al obtener los usuarios:', error);
    throw error;
  }
}
