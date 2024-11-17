import { SubmitHandler, useForm } from 'react-hook-form';
import Button from '../../storybook/components/Button/Button';
import Input from '../../storybook/components/Input/Input';
import LoginModel, { LoginForm } from './models/Login';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { login } from './services/login.service';
import Toast from '../../storybook/components/Toast/Toast';
import { useUserActions } from '../../hooks/useLoginActions';

const Login = () => {
  const navigate = useNavigate();
  const { logout } = useUserActions();

  const [error, setError] = useState({});
  const [showToast, setShowToast] = useState(false);
  const [showError, setShowError] = useState('Ha ocurrido un error, comuniquese con el administrador.');

  const { loginUser } = useUserActions();

  const { register, handleSubmit } = useForm<LoginModel>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess(data) {
      const login = {
        isLogin: true,
        menu: data.menu,
        user: data.user,
      };

      localStorage.setItem('jwt', data.jwt);
      localStorage.setItem('refresh', data.refresh);

      loginUser(login);
      navigate('/users');
    },
    onError(error) {
      setShowError(error.message);
      setShowToast(true);
    },
  });

  const formValidations = (formData: any): boolean => {
    setError({});
    let error = {};

    if (formData.email === '') {
      error = { ...error, email: 'Email requerido' };
    }

    if (formData.password === '') {
      error = { ...error, password: 'Contraseña requerida' };
    }

    setError(error);

    return Object.keys(error).length === 0;
  };

  const onSubmit: SubmitHandler<LoginForm> = (data) => {
    setShowError('');
    setShowToast(false);

    const { email, password } = data;

    const isValid = formValidations(data);

    if (isValid) {
      const login = {
        email,
        password,
      };

      loginMutation.mutate(login);
    }
  };

  useEffect(() => {
    logout();
  }, []);

  return (
    <div id="crud-modal" aria-hidden="true" className="fixed inset-0 z-50 flex items-center justify-center ">
      <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full">
        <form className="p-4" autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-6 mb-6 md:grid-cols-1">
            <div>
              <Input
                type="text"
                tittle="Email"
                name="email"
                placeholders="correo@correo.cl"
                appearance={error.hasOwnProperty('email') ? 'error' : 'info'}
                register={register}
                error={error}
              />
            </div>
            <div>
              <Input
                type="password"
                tittle="Clave"
                name="password"
                placeholders="Escriba su contraseña"
                appearance={error.hasOwnProperty('password') ? 'error' : 'info'}
                register={register}
                error={error}
              />
            </div>
            <div className="flex justify-end">
              <div>
                <Link
                  to="/recoverPassword"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  ¿Has olvidado tu contraseña?
                </Link>
              </div>
            </div>
          </div>

          <section className="flex justify-end pb-4">
            <div>
              {showToast ? <Toast text={showError} type={'error'} /> : null}
              <Button text={'Iniciar Sesion'} status={'info'} type={'submit'} />
            </div>
          </section>
        </form>
      </div>
    </div>
  );
};

export default Login;
