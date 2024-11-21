import { useEffect, useMemo, useState } from 'react';
import Input from '../../../storybook/components/Input/Input';
import { Inputs, ModalUserProps } from '../models';
import Button from '../../../storybook/components/Button/Button';
import SaveIcon from '../../../storybook/icons/save';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { updateUser, createUser, getUserById } from '../services/users.service';
import User from '../models/Users';
import { useForm, SubmitHandler } from 'react-hook-form';
import SkeletonTable from '../../../storybook/components/Skeleton/SkeletonTable';
import Dropdown from '../../../storybook/components/Dropdown/Dropdown';
import { getAllSubscription } from '../../Subscription/services/subscription.service';
import Subscription from '../../Subscription/models/Subscription';
import Toast from '../../../storybook/components/Toast/Toast';
import { IToast } from '../../../storybook/components/Toast/interface';

// Componente CreateModalUser: Modal para crear o actualizar un usuario
const CreateModalUser = ({ closeEvent, errorEvent, setErrorMessage, id }: ModalUserProps) => {
  // Estado local para gestionar errores
  const [error, setError] = useState({});

  const [toats, setToast] = useState<IToast>({
    show: false,
    error: '',
    type: 'error',
  });

  // Cliente de consultas para la gestión de cache
  const queryClient = useQueryClient();

  // Hook useQuery para obtener los datos del usuario por id
  const { data, isLoading } = useQuery<User>({
    queryKey: ['userById'],
    queryFn: async () => getUserById(id ?? ''),
    refetchOnWindowFocus: false, // Evita recargar datos al reenfocar la ventana
  });

  // Hook useQuery para obtener los datos del usuario por id
  const { data: subsData } = useQuery<Subscription[]>({
    queryKey: ['getSubscriptions'],
    queryFn: async () => getAllSubscription(),
    refetchOnWindowFocus: false, // Evita recargar datos al reenfocar la ventana
  });

  // Configuración de React Hook Form con valores predeterminados
  const { register, handleSubmit, reset, control } = useForm<Inputs>({
    defaultValues: {
      name: id ? data?.name : '',
      rut: id ? data?.rut : '',
      email: id ? data?.email : '',
      password: id ? data?.password : '',
      confirmPassword: id ? data?.password : '',
      changePassword: false,
      subscription: id ? data?.subscription?.id : '',
      phone_number: id ? data?.phone_number : '',
      date_of_birth: id ? data?.date_of_birth : '',
    },
  });

  // Actualiza el formulario con los datos del usuario cuando los datos están disponibles
  useEffect(() => {
    if (data) {
      reset({
        name: data?.name ?? '',
        rut: data?.rut ?? '',
        email: data?.email ?? '',
        password: data?.password ?? '',
        confirmPassword: data?.password ?? '',
        changePassword: false,
        subscription: data?.subscription?.id ?? '',
        phone_number: data?.phone_number ?? '',
        date_of_birth: data?.date_of_birth ?? '',
      });
    }
  }, [data, reset]);

  // crea variable con los elementos para el dropdown
  const subscriptionData = useMemo(() => {
    return subsData?.map((subscription) => {
      return {
        value: subscription.id,
        label: subscription.name,
      };
    });
  }, [subsData]);

  // Configuración de la mutación para agregar un usuario
  const addUserMutation = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      closeEvent(false);
      queryClient.invalidateQueries({ queryKey: ['getUsers'] });
    },
    onError: () => {
      setToast({
        ...toats,
        show: true,
        error: 'Ha ocurrido un error, comuniquese con el administrador.',
      });
    },
  });

  // Configuración de la mutación para actualizar un usuario
  const updateUserMutation = useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      closeEvent(false);
      queryClient.invalidateQueries({ queryKey: ['getUsers'] });
    },
    onError: () => {
      setToast({
        ...toats,
        show: true,
        error: 'Ha ocurrido un error, comuniquese con el administrador.',
      });
    },
  });

  // Escucha los errores en la mutación de agregar usuario
  useEffect(() => {
    errorEvent(addUserMutation.isError);
    setErrorMessage(addUserMutation.error?.toString() ?? 'Ha ocurrido un error, comuniquese con el administrador.');
  }, [addUserMutation, setErrorMessage, errorEvent]);

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

    if (formData.rut === '') {
      error = { ...error, rut: 'Rut requerido' };
    }

    if (formData.email === '') {
      error = { ...error, email: 'Email requerido' };
    }

    if (formData.subscription === '') {
      error = { ...error, subscription: 'Favor seleccione un valor' };
    }

    if (formData.date_of_birth === '') {
      error = { ...error, date_of_birth: 'Favor seleccione un valor' };
    }

    if (formData.phone_number === '') {
      error = { ...error, phone_number: 'Favor ingrese un valor' };
    }

    if (isNaN(formData.phone_number)) {
      error = { ...error, phone_number: 'Ingrese un valor númerico' };
    }

    setError(error);

    return Object.keys(error).length === 0;
  };

  /**
   * Envía los datos del formulario dependiendo si es una creación o actualización
   * @param data - Datos del formulario a enviar
   */
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const { name, rut, email, password = '123', date_of_birth, phone_number, subscription } = data;

    const isValid = formValidations(data);

    if (isValid) {
      const newUser = {
        name,
        rut,
        email,
        password,
        date_of_birth,
        phone_number,
        subscription,
      };

      const updateUser = {
        ...newUser,
        id,
      };

      // Condición para saber si es actualización o creación
      if (!!id) {
        updateUserMutation.mutate(updateUser);
      } else {
        addUserMutation.mutate(newUser);
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
          <h3 className="text-lg font-semibold text-gray-900">{id ? 'Actualizar Registro' : 'Crear usuario'}</h3>
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
        {isLoading ? (
          <SkeletonTable />
        ) : (
          <form className="p-4" autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-6 mb-6 md:grid-cols-3">
              {/* Campos de entrada */}
              <div>
                <Input
                  type="text"
                  tittle="Rut"
                  name="rut"
                  placeholders="Ej: 9999999-9"
                  appearance={error.hasOwnProperty('rut') ? 'error' : 'info'}
                  error={error}
                  register={register}
                />
              </div>
              <div>
                <Input
                  type="text"
                  tittle="Nombre"
                  name="name"
                  placeholders="Ej: Juanito Espinoza"
                  appearance={error.hasOwnProperty('name') ? 'error' : 'info'}
                  error={error}
                  register={register}
                />
              </div>
              <div>
                <Input
                  type="text"
                  tittle="Email"
                  name="email"
                  placeholders="correo@correo.cl"
                  appearance={error.hasOwnProperty('email') ? 'error' : 'info'}
                  error={error}
                  register={register}
                />
              </div>

              <div>
                <Input
                  type="date"
                  tittle="Fecha Nacimiento"
                  name="date_of_birth"
                  placeholders="Seleccione fecha nacimiento"
                  appearance={error.hasOwnProperty('date_of_birth') ? 'error' : 'info'}
                  error={error}
                  register={register}
                />
              </div>

              <div>
                <Dropdown
                  control={control}
                  fields={subscriptionData}
                  tittle={'Subscripción'}
                  name={'subscription'}
                  appearance={error.hasOwnProperty('subscription') ? 'error' : 'info'}
                  error={error}
                />
              </div>
              <div>
                <Input
                  type="text"
                  tittle="Telefono"
                  name="phone_number"
                  placeholders="ej: 9123456"
                  appearance={error.hasOwnProperty('phone_number') ? 'error' : 'info'}
                  error={error}
                  register={register}
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
        )}
      </div>
    </div>
  );
};

export default CreateModalUser;
