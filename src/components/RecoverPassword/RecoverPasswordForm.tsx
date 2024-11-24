import { SubmitHandler, useForm } from 'react-hook-form';
import Button from '../../storybook/components/Button/Button';
import SaveIcon from '../../storybook/icons/save';

import Input from '../../storybook/components/Input/Input';
import { useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import Toast from '../../storybook/components/Toast/Toast';
import { ConfirmRecoverPassword } from './models/Forms';
import ShowPassword from '../../storybook/icons/showPassword';
import HidePassword from '../../storybook/icons/hidePassword';
import { updatePassword } from '../User/services/users.service';
import { useParams } from 'react-router-dom';

const FormRecoverPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showToast, setShowToast] = useState({ show: false, msg: '' });

  const [error, setError] = useState({});
  const { token } = useParams(); // Captura el valor de `token` desde la URL

  const recoverPasswordMutation = useMutation({
    mutationFn: updatePassword,
    onSuccess: () => {
      console.log('Todo ok');
    },
    onError: () => {
      setShowToast({ show: true, msg: 'Ha ocurrido un error, intentelo nuevamente.' });
    },
  });

  const { register, handleSubmit, reset } = useForm<ConfirmRecoverPassword>({
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  useEffect(() => {
    reset({
      password: '',
      confirmPassword: '',
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const formValidations = (formData: ConfirmRecoverPassword): boolean => {
    setError({});
    let error = {};

    if (formData.password === '') {
      error = { ...error, password: 'Contraseña es requerida' };
    }

    if (formData.confirmPassword === '') {
      error = { ...error, confirmPassword: 'Favor ingrese valor' };
    }

    if (formData.confirmPassword !== formData.password) {
      error = { ...error, password: 'Valores deben ser identicos', confirmPassword: 'Valores deben ser identicos' };
    }

    setError(error);

    return Object.keys(error).length === 0;
  };

  const onSubmit: SubmitHandler<ConfirmRecoverPassword> = (data: ConfirmRecoverPassword) => {
    setShowToast({ show: false, msg: '' });
    const isValid = formValidations(data);
    if (isValid) {
      const info = {
        password: data.password,
        token: token || '',
      };

      recoverPasswordMutation.mutate(info);
    }
  };

  return (
    <section className="p-5 mr-96">
      <section className="w-full text-xl text-gray-800 leading-normal ">
        <section className="drop-shadow-md bg-white box-content box-border">
          <span className="text-base md:text-sm text-green-500 font-bold">
            <h1 className="font-bold break-normal text-blue-500 pt-6 pb-2 text-3xl md:text-4xl pl-5">
              Cambiar Contraseña
            </h1>
          </span>
        </section>
        <section className="drop-shadow-md bg-white box-content box-border min-h-32 px-2 md:px-14 py-10">
          <section className="grid grid-cols-1 sm:grid-cols-1  md:grid-cols-1 lg:grid-cols-1 2xl:grid-cols-1">
            <section className="flex justify-end pb-4"></section>
          </section>
          <section className="min-h-full">
            <h5 className="break-normal text-black-500 pt-6 pb-2 pl-5">Favor ingrese su nueva contraseña</h5>
          </section>

          <section className="min-h-full">
            <form className="p-4" autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
              <div className="grid gap-6 mb-6 md:grid-cols-3">
                <div className="relative w-full max-w-md">
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    tittle="Contraseña"
                    name="password"
                    placeholders="Ingrese su contraseña"
                    appearance={error.hasOwnProperty('password') ? 'error' : 'info'}
                    error={error}
                    register={register}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 hover:text-gray-700 focus:outline-none"
                  >
                    {showPassword ? <ShowPassword /> : <HidePassword />}
                  </button>
                </div>
                <div className="relative w-full max-w-md">
                  <Input
                    type={showConfirmPassword ? 'text' : 'password'}
                    tittle="Confirme contraseña"
                    name="confirmPassword"
                    placeholders="Repita Contraseña"
                    appearance={error.hasOwnProperty('confirmPassword') ? 'error' : 'info'}
                    error={error}
                    register={register}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 hover:text-gray-700 focus:outline-none"
                  >
                    {showConfirmPassword ? <ShowPassword /> : <HidePassword />}
                  </button>
                </div>
              </div>
              <section className="flex justify-start pb-4">
                <div>
                  <Button text={'Cambiar Contraseña'} status={'info'} icon={<SaveIcon />} type={'submit'} />
                </div>
              </section>
            </form>
            {showToast.show ? <Toast text={showToast.msg} type={'error'} /> : null}
          </section>
        </section>
      </section>
    </section>
  );
};

export default FormRecoverPassword;
