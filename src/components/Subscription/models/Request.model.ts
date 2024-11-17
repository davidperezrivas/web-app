/**
 * Modelo para crear una nueva subscripción.
 * @param name - Nombre de la subscripción.
 * @param amount - Monto de la subscripción.
 */
export interface CreateSubModel {
  name: string; // Nombre de la subscripción
  amount: number; // Monto de la subscripción
}

/**
 * Modelo para actualizar una subscripción existente.
 * Extiende de CreateSubModel y añade un ID.
 * @param name - Nombre de la subscripción.
 * @param amount - Monto de la subscripción.
 * @param id - El ID de la subscripción a actualizar.
 */
export interface UpdateSubModel extends CreateSubModel {
  id: string; // ID de la subscripción a actualizar
}
