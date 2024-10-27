import { useEffect, useMemo, useState } from 'react';
import Input from '../../../storybook/components/Input/Input';
import { Inputs, ModalUserProps } from '../models';
import Button from '../../../storybook/components/Button/Button';
import SaveIcon from '../../../storybook/icons/save';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  updateUser,
  createUser,
  getUserById,
  getRoles,
} from '../services/users.service';
import User from '../models/Users';
import { useForm, SubmitHandler } from 'react-hook-form';
import SkeletonTable from '../../../storybook/components/Skeleton/SkeletonTable';
import Dropdown from '../../../storybook/components/Dropdown/Dropdown';
import Role from '../models/Role';

const CreateModalUser = ({
  closeEvent,
  errorEvent,
  setErrorMessage,
  id,
}: ModalUserProps) => {
  const [error, setError] = useState({});
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery<User>({
    queryKey: ['userById'],
    queryFn: async () => getUserById(id ?? ''),
    refetchOnWindowFocus: false,
  });

  const { data: roleList } = useQuery<Role[]>({
    queryKey: ['userRole'],
    queryFn: async () => getRoles(),
    refetchOnWindowFocus: false,
  });

  const { register, handleSubmit, reset, watch, control } = useForm<Inputs>({
    defaultValues: {
      name: id ? data?.name : '',
      rut: id ? data?.rut : '',
      email: id ? data?.email : '',
      password: id ? data?.password : '',
      role: id ? data?.role?.id : roleList?.[0]?.id,
      confirmPassword: id ? data?.password : '',
      changePassword: false,
    },
  });

  useEffect(() => {
    if (data) {
      reset({
        name: data?.name ?? '',
        rut: data?.rut ?? '',
        email: data?.email ?? '',
        password: data?.password ?? '',
        confirmPassword: data?.password ?? '',
        changePassword: false,
        role: data?.role?.id ?? roleList?.[0]?.id,
      });
    }
  }, [data, roleList, reset]);

  const roleElemets = useMemo(() => {
    return (
      roleList?.map((rol) => {
        return {
          label: rol.name,
          value: rol.id,
        };
      }) ?? []
    );
  }, [roleList]);

  const addUserMutation = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      closeEvent(false);
      queryClient.invalidateQueries({ queryKey: ['getUsers'] });
    },
  });

  const updateUserMutation = useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      closeEvent(false);
      queryClient.invalidateQueries({ queryKey: ['getUsers'] });
    },
  });

  useEffect(() => {
    errorEvent(addUserMutation.isError);
    setErrorMessage(
      addUserMutation.error?.toString() ??
        'Ha ocurrido un error, comuniquese con el administrador.',
    );
  }, [addUserMutation, setErrorMessage, errorEvent]);

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

      if (!!id) {
        updateUserMutation.mutate(updateUser);
      } else {
        addUserMutation.mutate(newUser);
      }
    }
  };

  const isChecked = watch('changePassword');

  return (
    <div
      id='crud-modal'
      aria-hidden='true'
      className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'
    >
      <div className='bg-white rounded-lg shadow-lg max-w-2xl w-full'>
        <div className='flex items-center justify-between p-4 border-b'>
          <h3 className='text-lg font-semibold text-gray-900'>
            {id ? 'Actualizar Registro' : 'Crear usuario'}
          </h3>
          <button
            type='button'
            className='text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg w-8 h-8 flex justify-center items-center'
            data-modal-toggle='crud-modal'
            onClick={() => {
              closeEvent(false);
            }}
          >
            <svg
              className='w-3 h-3'
              aria-hidden='true'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 14 14'
            >
              <path
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6'
              />
            </svg>
            <span className='sr-only'>Close modal</span>
          </button>
        </div>
        {isLoading ? (
          <SkeletonTable />
        ) : (
          <form
            className='p-4'
            autoComplete='off'
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className='grid gap-6 mb-6 md:grid-cols-3'>
              <div>
                <Input
                  type='text'
                  tittle='Rut'
                  name='rut'
                  placeholders='Ej: 9999999-9'
                  appearance={error.hasOwnProperty('rut') ? 'error' : 'info'}
                  error={error}
                  register={register}
                />
              </div>
              <div>
                <Input
                  type='text'
                  tittle='Nombre'
                  name='name'
                  placeholders='Ej: Juanito Espinoza'
                  appearance={error.hasOwnProperty('name') ? 'error' : 'info'}
                  error={error}
                  register={register}
                />
              </div>
              <div>
                <Input
                  type='text'
                  tittle='Email'
                  name='email'
                  placeholders='correo@correo.cl'
                  appearance={error.hasOwnProperty('email') ? 'error' : 'info'}
                  error={error}
                  register={register}
                />
              </div>
              <div>
                <Dropdown
                  control={control}
                  fields={roleElemets}
                  tittle={'Rol'}
                />
              </div>
              {id ? (
                <div className='flex items-center'>
                  <input
                    type='checkbox'
                    id='changePassword'
                    {...register('changePassword')}
                  />
                  <label className='ms-2 text-sm font-medium text-gray-900 dark:text-gray-300'>
                    Actualizar Contraseña
                  </label>
                </div>
              ) : null}
              {isChecked || !id ? (
                <>
                  <div className='mb-6'>
                    <Input
                      type='password'
                      tittle='Contraseña'
                      name='password'
                      placeholders='Min 6 Caracteres'
                      appearance={
                        error.hasOwnProperty('password') ? 'error' : 'info'
                      }
                      error={error}
                      register={register}
                    />
                  </div>

                  <div className='mb-6'>
                    <Input
                      type='password'
                      tittle='Confirmar contraseña'
                      name='confirmPassword'
                      placeholders=''
                      appearance={
                        error.hasOwnProperty('password') ? 'error' : 'info'
                      }
                      error={error}
                      register={register}
                    />
                  </div>
                </>
              ) : null}
            </div>

            <section className='flex justify-end pb-4'>
              <div>
                <Button
                  text={'Guardar'}
                  status={'info'}
                  icon={<SaveIcon />}
                  type={'submit'}
                />
              </div>
            </section>
          </form>
        )}
      </div>
    </div>
  );
};

export default CreateModalUser;
