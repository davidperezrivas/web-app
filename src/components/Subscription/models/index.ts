/**
 * Propiedades para el modal de subscripción.
 * @param closeEvent - Función para cerrar el modal.
 * @param errorEvent - Función para manejar errores en el modal.
 * @param setErrorMessage - Función para establecer el mensaje de error.
 * @param id - El ID de la subscripción.
 */
export interface ModalSubscriptionProps {
  closeEvent: React.Dispatch<React.SetStateAction<boolean>>; // Función para cerrar el modal
  errorEvent: React.Dispatch<React.SetStateAction<boolean>>; // Función para manejar el estado de error
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>; // Función para establecer el mensaje de error
  id: string; // ID de la subscripción
}

/**
 * Tipo de datos para los inputs del formulario de subscripción.
 * @param name - Nombre de la subscripción.
 * @param amount - Monto de la subscripción.
 */
export type Inputs = {
  name: string; // Nombre de la subscripción
  amount: number; // Monto de la subscripción
};

/**
 * Propiedades para el modal de eliminación de subscripción.
 * @param closeEvent - Función para cerrar el modal.
 * @param id - El ID de la subscripción a eliminar.
 */
export interface ModalDeleteSubscriptionProps {
  closeEvent: React.Dispatch<React.SetStateAction<boolean>>; // Función para cerrar el modal
  id: string; // ID de la subscripción a eliminar
}
