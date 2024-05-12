import { ResponseLogin } from '../models/Response.model';
import { RequestLogin } from '../models/Request.model';
import { loginUrlApi } from './url';

export async function login(login: RequestLogin): Promise<ResponseLogin> {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },

    body: JSON.stringify(login),
  };
  const response = await fetch(loginUrlApi.login, requestOptions);
  if (response.status >= 400) {
    const data = await response.json();
    throw new Error(data.msg);
  }

  return response.json();
}
