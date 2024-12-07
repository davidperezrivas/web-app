import { SubmitHandler, useForm } from 'react-hook-form';
import Button from '../../storybook/components/Button/Button';
import SaveIcon from '../../storybook/icons/save';
import { RecoverPasswordForm } from './models/Forms';
import Input from '../../storybook/components/Input/Input';
import { useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { recoverPassword } from '../User/services/users.service';
import Toast from '../../storybook/components/Toast/Toast';

const RecoverPassword = () => {
  const [showToast, setShowToast] = useState({ show: false, msg: '' });
  const [error, setError] = useState({});

  const recoverPasswordMutation = useMutation({
    mutationFn: recoverPassword,
    onSuccess: () => {},
  });

  const { register, handleSubmit, reset } = useForm<RecoverPasswordForm>({
    defaultValues: {
      email: '',
    },
  });

  const formValidations = (formData: any): boolean => {
    setError({});
    let error = {};

    if (formData.email === '') {
      error = { ...error, email: 'Email requerido' };
    }

    setError(error);

    return Object.keys(error).length === 0;
  };

  useEffect(() => {
    reset({
      email: '',
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const onSubmit: SubmitHandler<RecoverPasswordForm> = (data: RecoverPasswordForm) => {
    setShowToast({ show: false, msg: '' });
    const isValid = formValidations(data);
    if (isValid) {
      recoverPasswordMutation.mutate(data);
    }
  };

  return (
    <section className="p-5 mr-96">
      <section className="w-full text-xl text-gray-800 leading-normal ">
        <section className="drop-shadow-md bg-white box-content box-border">
          <span className="text-base md:text-sm text-green-500 font-bold">
            <h1 className="font-bold break-normal text-blue-500 pt-6 pb-2 text-3xl md:text-4xl pl-5">
              Recuperar Contraseña
            </h1>
          </span>
        </section>
        <section className="drop-shadow-md bg-white box-content box-border min-h-32 px-2 md:px-14 py-10">
          <section className="grid grid-cols-1 sm:grid-cols-1  md:grid-cols-1 lg:grid-cols-1 2xl:grid-cols-1">
            <section className="flex justify-end pb-4"></section>
          </section>
          <section className="min-h-full">
            <h5 className="break-normal text-black-500 pt-6 pb-2 pl-5">
              Se enviará un correo electrónico a la dirección proporcionada, que contendrá una contraseña temporal.
              <br /> Podrá utilizar esta contraseña para acceder nuevamente al sistema.
            </h5>
            <small className="break-normal text-black-500 pt-6 pb-2 pl-5 italic">
              Si el correo electrónico proporcionado está registrado, recibirás un enlace para restablecer tu
              contraseña.
            </small>
          </section>

          <section className="min-h-full">
            <form className="p-4" autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
              <div className="grid gap-6 mb-6 md:grid-cols-3">
                <div>
                  <Input
                    type="text"
                    tittle="Email"
                    name="email"
                    placeholders="Ej:juanito@gmail.com"
                    appearance={error.hasOwnProperty('email') ? 'error' : 'info'}
                    error={error}
                    register={register}
                  />
                  {showToast.show ? <Toast text={showToast.msg} type={'error'} /> : null}
                </div>
              </div>
              <section className="flex justify-start pb-4">
                <div>
                  <Button text={'Recuperar Contraseña'} status={'info'} icon={<SaveIcon />} type={'submit'} />
                </div>
              </section>
            </form>
          </section>
        </section>
      </section>
    </section>
  );
};

export default RecoverPassword;
