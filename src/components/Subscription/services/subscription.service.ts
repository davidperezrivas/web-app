import Subscription from '../models/Subscription';
import { CreateSubModel, UpdateSubModel } from '../models/Request.model';
import { subscriptionUrlApi } from './url';
import { petitionWithToken } from '../../../services/services';

/**
 * Obtiene todas las subscripciones.
 * Realiza una petición GET a la API para obtener todas las subscripciones.
 * @returns {Promise<Subscription[]>} - Una lista de subscripciones.
 */
export const getAllSubscription = async (): Promise<Subscription[]> => {
  const response = await petitionWithToken(subscriptionUrlApi.susbcriptions, '', 'GET');
  const data = await response.json();
  return data;
};

/**
 * Obtiene una subscripción por su identificador.
 * Realiza una petición GET a la API para obtener una subscripción específica por su id.
 * @param {string} id - El identificador de la subscripción.
 * @returns {Promise<Subscription>} - Una subscripción.
 */
export const getSubscriptionById = async (id: string): Promise<Subscription> => {
  const url = `${subscriptionUrlApi.susbcriptions}/getById?id=${id}`;
  const response = await petitionWithToken(url, '', 'GET');
  const data = await response.json();
  return data;
};

/**
 * Crea una nueva subscripción.
 * Realiza una petición POST a la API para crear una nueva subscripción.
 * @param {CreateSubModel} subscription - Los datos de la nueva subscripción.
 * @throws {Error} - Si la respuesta tiene un estado 400 o superior, lanza un error con el mensaje de la respuesta.
 */
export const createSubscription = async (subscription: CreateSubModel) => {
  const response = await petitionWithToken(subscriptionUrlApi.susbcriptions, subscription, 'POST');

  if (response.status >= 400) {
    const data = await response.json();
    throw new Error(data.msg);
  }
};

/**
 * Actualiza una subscripción existente.
 * Realiza una petición PATCH a la API para actualizar los datos de una subscripción existente.
 * @param {UpdateSubModel} subscription - Los datos actualizados de la subscripción.
 * @throws {Error} - Si la respuesta tiene un estado 400 o superior, lanza un error con el mensaje de la respuesta.
 */
export const updateSubscription = async (subscription: UpdateSubModel) => {
  const response = await petitionWithToken(subscriptionUrlApi.susbcriptions, subscription, 'PATCH');

  if (response.status >= 400) {
    const data = await response.json();
    throw new Error(data.msg);
  }
};

/**
 * Elimina una subscripción.
 * Realiza una petición DELETE a la API para eliminar una subscripción específica por su id.
 * @param {string} id - El identificador de la subscripción a eliminar.
 * @throws {Error} - Si la respuesta tiene un estado 400 o superior, lanza un error con el mensaje de la respuesta.
 */
export const deleteSubscription = async (id: string) => {
  const url = `${subscriptionUrlApi.susbcriptions}?id=${id}`;

  const response = await petitionWithToken(url, '', 'DELETE');
  if (response.status >= 400) {
    const data = await response.json();
    throw new Error(data.msg);
  }
};
