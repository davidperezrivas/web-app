/**
 * Modelo de una subscripción.
 * Representa una subscripción con su identificador, nombre y monto.
 * @param id - Identificador único de la subscripción.
 * @param name - Nombre de la subscripción.
 * @param amount - Monto asociado a la subscripción.
 */
export default interface Subscription {
  id: string; // Identificador único de la subscripción
  name: string; // Nombre de la subscripción
  amount: number; // Monto asociado a la subscripción
}
