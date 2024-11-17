import { useEffect, useMemo, useState } from 'react';
import Input from '../../../storybook/components/Input/Input';
import { Inputs, ModalUserProps } from '../models';
import Button from '../../../storybook/components/Button/Button';
import SaveIcon from '../../../storybook/icons/save';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { updateUser, createUser, getUserById, getRoles } from '../services/users.service';
import User from '../models/Users';
import { useForm, SubmitHandler } from 'react-hook-form';
import SkeletonTable from '../../../storybook/components/Skeleton/SkeletonTable';

// Componente CreateModalUser: Modal para crear o actualizar un usuario
const CreateModalUser = ({ closeEvent, errorEvent, setErrorMessage, id }: ModalUserProps) => {
  // Estado local para gestionar errores
  const [error, setError] = useState({});
  // Cliente de consultas para la gestión de cache
  const queryClient = useQueryClient();

  // Hook useQuery para obtener los datos del usuario por id
  const { data, isLoading } = useQuery<User>({
    queryKey: ['userById'],
    queryFn: async () => getUserById(id ?? ''),
    refetchOnWindowFocus: false, // Evita recargar datos al reenfocar la ventana
  });

  // Configuración de React Hook Form con valores predeterminados
  const { register, handleSubmit, reset, watch, control } = useForm<Inputs>({
    defaultValues: {
      name: id ? data?.name : '',
      rut: id ? data?.rut : '',
      email: id ? data?.email : '',
      password: id ? data?.password : '',
      confirmPassword: id ? data?.password : '',
      changePassword: false,
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
      });
    }
  }, [data, reset]);

  // Configuración de la mutación para agregar un usuario
  const addUserMutation = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      closeEvent(false);
      queryClient.invalidateQueries({ queryKey: ['getUsers'] });
    },
  });

  // Configuración de la mutación para actualizar un usuario
  const updateUserMutation = useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      closeEvent(false);
      queryClient.invalidateQueries({ queryKey: ['getUsers'] });
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

    if (formData.password === '') {
      error = { ...error, password: 'Contraseña requerida' };
    }

    if (formData.password !== formData.confirmPassword) {
      error = { ...error, password: 'Las contraseñas no coinciden' };
    }

    if (formData.password.length < 6) {
      error = { ...error, password: 'Mínimo 6 caracteres' };
    }

    setError(error);

    return Object.keys(error).length === 0;
  };

  /**
   * Envía los datos del formulario dependiendo si es una creación o actualización
   * @param data - Datos del formulario a enviar
   */
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const { name, rut, email, password, changePassword, role } = data;

    const isValid = formValidations(data);

    if (isValid) {
      const newUser = {
        name,
        rut,
        email,
        password,
        role,
      };

      const updateUser = {
        ...newUser,
        id,
        changePassword,
      };

      // Condición para saber si es actualización o creación
      if (!!id) {
        updateUserMutation.mutate(updateUser);
      } else {
        addUserMutation.mutate(newUser);
      }
    }
  };

  // Estado para verificar si la opción de cambiar contraseña está seleccionada
  const isChecked = watch('changePassword');

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

              {/* Checkbox para actualizar contraseña */}
              {id ? (
                <div className="flex items-center">
                  <input type="checkbox" id="changePassword" {...register('changePassword')} />
                  <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                    Actualizar Contraseña
                  </label>
                </div>
              ) : null}
              {/* Campos de contraseña si es nuevo usuario o si la opción está activada */}
              {isChecked || !id ? (
                <>
                  <div className="mb-6">
                    <Input
                      type="password"
                      tittle="Contraseña"
                      name="password"
                      placeholders="Min 6 Caracteres"
                      appearance={error.hasOwnProperty('password') ? 'error' : 'info'}
                      error={error}
                      register={register}
                    />
                  </div>

                  <div className="mb-6">
                    <Input
                      type="password"
                      tittle="Confirmar contraseña"
                      name="confirmPassword"
                      placeholders=""
                      appearance={error.hasOwnProperty('password') ? 'error' : 'info'}
                      error={error}
                      register={register}
                    />
                  </div>
                </>
              ) : null}
            </div>

            {/* Botón de guardar */}
            <section className="flex justify-end pb-4">
              <div>
                <Button text="Guardar" type="submit" icon={SaveIcon} status={'info'} />
              </div>
            </section>
          </form>
        )}
      </div>
    </div>
  );
};

export default CreateModalUser;
