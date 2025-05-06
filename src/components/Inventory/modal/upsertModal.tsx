import { useEffect, useState } from 'react';
import Button from '../../../storybook/components/Button/Button';
import SaveIcon from '../../../storybook/icons/save';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { useForm, SubmitHandler } from 'react-hook-form';

import Toast from '../../../storybook/components/Toast/Toast';
import { IToast } from '../../../storybook/components/Toast/interface';
import Input2 from '../../../storybook/components/Input2/Input2';
import { Inputs, ModalProps } from '../models/ModalProps';
import { updatenventoryElement } from '../services/purchase.service';

// Componente UpdateModalProduct: Modal para crear o actualizar un usuario
const UpdateModalProduct = ({ closeEvent, information }: ModalProps) => {
  // Estado local para gestionar errores
  const [error, setError] = useState({});

  const [toats, setToast] = useState<IToast>({
    show: false,
    error: '',
    type: 'error',
  });

  // Cliente de consultas para la gestión de cache
  const queryClient = useQueryClient();

  // Configuración de React Hook Form con valores predeterminados
  const { handleSubmit, reset, control } = useForm<Inputs>({
    defaultValues: {
      count: information ? information?.count : 0,
    },
  });

  // Actualiza el formulario con los datos del usuario cuando los datos están disponibles
  useEffect(() => {
    if (information) {
      reset({
        count: information ? information?.count : 0,
      });
    }
  }, [information, reset]);

  // Configuración de la mutación para actualizar un producto
  const updateCategoryMutation = useMutation({
    mutationFn: updatenventoryElement,
    onSuccess: () => {
      closeEvent(false);
      queryClient.invalidateQueries({ queryKey: ['getInventory'] });
    },
    onError: () => {
      setToast({
        ...toats,
        show: true,
        error: 'Ha ocurrido un error, comuniquese con el administrador.',
      });
    },
  });

  /**
   * Validaciones del formulario para verificar los campos antes de enviar
   * @param formData - Los datos del formulario
   * @returns booleano - true si la validación es exitosa, false si falla
   */
  const formValidations = (formData: any): boolean => {
    setError({});
    let error = {};

    if (formData.count === '') {
      error = { ...error, count: 'Stock requerido' };
    }

    setError(error);

    return Object.keys(error).length === 0;
  };

  /**
   * Envía los datos del formulario dependiendo si es una creación o actualización
   * @param data - Datos del formulario a enviar
   */
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const { count } = data;

    const isValid = formValidations(data);

    if (isValid) {
      const newCategory = {
        ...information,
        count,
      };

      updateCategoryMutation.mutate(newCategory);
    }
  };

  return (
    <div
      id="crud-modal"
      aria-hidden="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900">{'Actualizar Registro'}</h3>
          <button
            type="button"
            className="text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg w-8 h-8 flex justify-center items-center"
            data-modal-toggle="crud-modal"
            onClick={() => {
              closeEvent(false);
            }}
          >
            {/* Icono SVG para el botón de cerrar */}
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
        {/* Renderizado condicional para mostrar carga o formulario */}
        <form className="p-4" autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-6">
            {/* Campos de entrada */}
            <div>
              <Input2
                type="text"
                tittle={'Nuevo Stock'}
                name={'count'}
                errors={error}
                control={control}
                placeholder={'ej: 159'}
              />
            </div>
          </div>

          {/* Botón de guardar */}
          <section className="flex justify-end pb-4">
            {toats.show ? <Toast text={toats.error} type={toats.type} /> : null}
            <div>
              <Button text="Guardar" type="submit" icon={<SaveIcon />} status={'info'} />
            </div>
          </section>
        </form>
      </div>
    </div>
  );
};

export default UpdateModalProduct;
