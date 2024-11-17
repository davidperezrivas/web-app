import { useEffect, useState } from 'react';
import Input from '../../../storybook/components/Input/Input';
import { Inputs, ModalSubscriptionProps } from '../models';
import Button from '../../../storybook/components/Button/Button';
import SaveIcon from '../../../storybook/icons/save';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { updateSubscription, createSubscription, getSubscriptionById } from '../services/subscription.service';
import Subscription from '../models/Subscription';
import { useForm, SubmitHandler } from 'react-hook-form';
import SkeletonTable from '../../../storybook/components/Skeleton/SkeletonTable';

// Componente CreateModalSubscription: Modal para crear o actualizar una subscripción
const CreateModalSubscription = ({ closeEvent, errorEvent, setErrorMessage, id }: ModalSubscriptionProps) => {
  // Estado local para gestionar errores
  const [error, setError] = useState({});
  // Cliente de consultas para la gestión de cache
  const queryClient = useQueryClient();

  // Hook useQuery para obtener los datos de la subscripción por id
  const { data, isLoading } = useQuery<Subscription>({
    queryKey: ['subsById'],
    queryFn: async () => getSubscriptionById(id ?? ''),
    refetchOnWindowFocus: false, // Evita recargar datos al reenfocar la ventana
  });

  // Configuración de React Hook Form con valores predeterminados
  const { register, handleSubmit, reset } = useForm<Inputs>({
    defaultValues: {
      name: id ? data?.name : '',
      amount: id ? Number(data?.amount) : 0,
    },
  });

  // Actualiza el formulario con los datos de la subscripción cuando los datos están disponibles
  useEffect(() => {
    if (data) {
      reset({
        name: data?.name ?? '',
        amount: data?.amount ?? '',
      });
    }
  }, [data, reset]);

  // Configuración de la mutación para agregar una subscripción
  const addSubscriptionMutation = useMutation({
    mutationFn: createSubscription,
    onSuccess: () => {
      closeEvent(false);
      queryClient.invalidateQueries({ queryKey: ['getSubscription'] });
    },
  });

  // Configuración de la mutación para actualizar una subscripción
  const updateSubscriptionMutation = useMutation({
    mutationFn: updateSubscription,
    onSuccess: () => {
      closeEvent(false);
      queryClient.invalidateQueries({ queryKey: ['getSubscription'] });
    },
  });

  // Escucha los errores en la mutación de agregar subscripción
  useEffect(() => {
    errorEvent(addSubscriptionMutation.isError);
    setErrorMessage(
      addSubscriptionMutation.error?.toString() ?? 'Ha ocurrido un error, comuníquese con el administrador.',
    );
  }, [addSubscriptionMutation, setErrorMessage, errorEvent]);

  /**
   * Validaciones del formulario para verificar los campos antes de enviar
   * @param formData - Los datos del formulario
   * @returns booleano - true si la validación es exitosa, false si falla
   */
  const formValidations = (formData: any): boolean => {
    setError({});
    let error = {};

    if (formData.name === '') {
      error = { ...error, name: 'Nombre requerido' };
    }

    if (formData.amount === '') {
      error = { ...error, amount: 'Monto requerido' };
    }

    if (isNaN(formData.amount)) {
      error = { ...error, amount: 'Ingrese valor numérico' };
    }

    setError(error);

    return Object.keys(error).length === 0;
  };

  /**
   * Envía los datos del formulario dependiendo si es una creación o actualización
   * @param data - Datos del formulario a enviar
   */
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const { name, amount } = data;

    const isValid = formValidations(data);

    if (isValid) {
      const newSubscription = {
        name,
        amount,
      };

      const updateSubscription = {
        ...newSubscription,
        id,
      };

      // Condición para saber si es actualización o creación
      if (!!id) {
        updateSubscriptionMutation.mutate(updateSubscription);
      } else {
        addSubscriptionMutation.mutate(newSubscription);
      }
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
          <h3 className="text-lg font-semibold text-gray-900">{id ? 'Actualizar Registro' : 'Crear subscripción'}</h3>
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
            <span className="sr-only">Cerrar modal</span>
          </button>
        </div>
        {/* Renderizado condicional para mostrar carga o formulario */}
        {isLoading ? (
          <SkeletonTable />
        ) : (
          <form className="p-4" autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-6 mb-6 md:grid-cols-3">
              {/* Campos de entrada */}

              <div>
                <Input
                  type="text"
                  tittle="Nombre"
                  name="name"
                  placeholders="Ej: Socio con alimentación"
                  appearance={error.hasOwnProperty('name') ? 'error' : 'info'}
                  error={error}
                  register={register}
                />
              </div>
              <div>
                <Input
                  type="text"
                  tittle="Monto Subscripción"
                  name="amount"
                  placeholders="Ej: 9999"
                  appearance={error.hasOwnProperty('amount') ? 'error' : 'info'}
                  error={error}
                  register={register}
                />
              </div>
            </div>

            {/* Botón de guardar */}
            <section className="flex justify-end pb-4">
              <div>
                <Button text="Guardar" type="submit" icon={<SaveIcon />} status={'info'} />
              </div>
            </section>
          </form>
        )}
      </div>
    </div>
  );
};

export default CreateModalSubscription;
