enum methodEnum {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

type methodType = keyof typeof methodEnum;

/**
 * Returns an object as a response with the result of the request indicated on the endpoint
 *
 * @param {string} path URL of the endpoint
 * @param {methodEnum} method Verbose HTML of the endpoint
 * @param {object} data An object with the request body
 * @param {object} headers An aditional headers
 * @param {object} params [Optional] An object with the params
 */
const fetchURL = async (path: string, method: methodType, data?: object, headers?: any, params?: any) => {
  // build patch with paramets
  let pathURL = path;
  if (params && Object.keys(params).length) {
    pathURL = `${pathURL}?${new URLSearchParams(params).toString()}`;
  }

  const resp = await fetch(pathURL, {
    method,
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json',
      ...((headers && headers) || {}),
    },
    ...((method !== 'GET' && { body: JSON.stringify(data) }) || {}),
  });

  return resp;
};

/**
 * Returns an object as a response with the result of the request indicated on the endpoint
 *
 * @param {string} path URL of the endpoint
 * @param {object} data An object with the request body
 * @param {methodEnum} method Verbose HTML of the endpoint
 * @param {object} headers [Optional] An aditional headers
 * @param {object} params [Optional] An object with the params
 */
export const petitionWithToken = async (
  path: string,
  data: any = {},
  method: methodType = 'GET',
  params: object = {},
) => {
  const token = localStorage.getItem('jwt');

  const response = await fetchURL(path, method, data, { Authorization: `Bearer ${token}` }, params);

  if (response.status === 401) {
    const url = 'http://localhost:3002/v1/refresh';

    const method = 'GET';
    const refresh = localStorage.getItem('refresh');

    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${refresh}`,
    };

    const options = {
      method,
      headers: headers,
    };

    const responseRefresh = await fetch(url, options);

    if (responseRefresh.status === 401) {
      localStorage.clear();
      window.location.replace('/login');
    }

    const values = await responseRefresh.json();
    const newToken = values.token;
    localStorage.setItem('jwt', newToken);
    const newRequest = await fetchURL(path, method, data, { Authorization: `Bearer ${newToken}` }, params);

    return newRequest;
  } else {
    return response;
  }
};

/**
 * Returns an object as a response with the result of the request indicated on the endpoint
 *
 * @param {string} path URL of the endpoint
 * @param {object} data An object with the request body
 * @param {methodEnum} method Verbose HTML of the endpoint
 * @param {object} headers [Optional] An aditional headers
 * @param {object} params [Optional] An object with the params
 */
export const fetchWithoutToken = (
  path: string,
  data: object = {},
  method: methodType = 'GET',
  headers?: object,
  params?: object,
) => {
  return fetchURL(path, method, data, headers, params);
};
