import { useMutation, useQueryClient } from '@tanstack/react-query';
import Button from '../../../storybook/components/Button/Button';
import DeleteIcon from '../../../storybook/icons/delete';
import { DeleteUser } from '../services/users.service';
import { ModalDeleteUserProps } from '../models';

const DeleteModalUser = ({ closeEvent, id }: ModalDeleteUserProps) => {
  const queryClient = useQueryClient();

  const deleteUserMutation = useMutation({
    mutationFn: DeleteUser,
    onSuccess: () => {
      closeEvent(false);
      queryClient.invalidateQueries({ queryKey: ['getUsers'] });
    },
  });

  const handleDeleteUser = () => {
    deleteUserMutation.mutate(id);
  };
  return (
    <div
      id="crud-modal"
      aria-hidden="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900">Eliminar Usuario</h3>
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
            <span className="sr-only">Close modal</span>
          </button>
        </div>
        <div className="relative p-4 text-center bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
          <button
            type="button"
            className="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
            onClick={() => {
              closeEvent(false);
            }}
          >
            <svg
              aria-hidden="true"
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
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
          <p className="mb-4 text-gray-500 dark:text-gray-300">¿Está seguro que desea eliminar este registro.?</p>
          <div className="flex justify-center items-center space-x-4">
            <Button
              text={'Cancelar'}
              status={'info'}
              type={'button'}
              onClick={() => {
                closeEvent(false);
              }}
            />
            <Button
              text={'Si, Estoy seguro.'}
              status={'error'}
              icon={<DeleteIcon />}
              type={'button'}
              onClick={() => {
                handleDeleteUser();
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteModalUser;
