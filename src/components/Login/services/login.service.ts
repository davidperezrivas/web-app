import { ResponseLogin } from '../models/Response.model';
import { RequestLogin } from '../models/Request.model';
import { loginUrlApi } from './url';
import { fetchWithoutToken } from '../../../services/services';

export async function login(login: RequestLogin): Promise<ResponseLogin> {
  const response = await fetchWithoutToken(loginUrlApi.login, login, 'POST');

  if (response.status >= 400) {
    const data = await response.json();
    throw new Error(data.msg);
  }
  return response.json();
}
