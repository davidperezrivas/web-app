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

  const options = {
    method,
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json',
      ...((headers && headers) || {}),
    },
    ...((method !== 'GET' && method !== 'DELETE' && { body: JSON.stringify(data) }) || {}),
  };

  const resp = await fetch(pathURL, options);

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
  const newRequest = await fetchURL(path, method, data, {}, params);

  return newRequest;
};
