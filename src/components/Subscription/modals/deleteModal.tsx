import { useMutation, useQueryClient } from '@tanstack/react-query';
import Button from '../../../storybook/components/Button/Button';
import DeleteIcon from '../../../storybook/icons/delete';
import { deleteSubscription } from '../services/subscription.service';
import { ModalDeleteSubscriptionProps } from '../models';

/**
 * Componente DeleteModalSubscription: Modal para eliminar una subscripción
 * @param {ModalDeleteSubscriptionProps} props - Propiedades del componente, incluye el evento para cerrar el modal y el ID de la subscripción
 */
const DeleteModalSubscription = ({ closeEvent, id }: ModalDeleteSubscriptionProps) => {
  // Cliente de consultas para la gestión de cache
  const queryClient = useQueryClient();

  // Configuración de la mutación para eliminar una subscripción
  const deleteSubsMutation = useMutation({
    mutationFn: deleteSubscription,
    onSuccess: () => {
      // Cierra el modal y actualiza la caché después de la eliminación
      closeEvent(false);
      queryClient.invalidateQueries({ queryKey: ['getSubscription'] });
    },
  });

  /**
   * Maneja la eliminación de una subscripción
   * @param id - El ID de la subscripción a eliminar
   */
  const handleDeleteSubscription = () => {
    deleteSubsMutation.mutate(id);
  };

  return (
    <div
      id="crud-modal"
      aria-hidden="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900">Eliminar Subscripción</h3>
          <button
            type="button"
            className="text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg w-8 h-8 flex justify-center items-center"
            data-modal-toggle="crud-modal"
            onClick={() => {
              closeEvent(false);
            }}
          >
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span className="sr-only">Cerrar modal</span>
          </button>
        </div>

        <div className="relative p-4 text-center bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
          <svg
            className="text-gray-400 dark:text-gray-500 w-11 h-11 mb-3.5 mx-auto"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
              clipRule="evenodd"
            ></path>
          </svg>
          <p className="mb-4 text-gray-500 dark:text-gray-300">¿Está seguro que desea eliminar este registro?</p>
          <div className="flex justify-center items-center space-x-4">
            {/* Botón de Cancelar */}
            <Button
              text={'Cancelar'}
              status={'info'}
              type={'button'}
              onClick={() => {
                closeEvent(false);
              }}
            />
            {/* Botón de Confirmar eliminación */}
            <Button
              text={'Sí, Estoy seguro.'}
              status={'error'}
              icon={<DeleteIcon />}
              type={'button'}
              onClick={() => {
                handleDeleteSubscription();
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteModalSubscription;
