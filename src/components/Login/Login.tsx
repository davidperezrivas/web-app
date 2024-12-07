// Importaciones agrupadas y ordenadas
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';

// Componentes de la UI
import Button from '../../storybook/components/Button/Button';
import Input from '../../storybook/components/Input/Input';
import Toast from '../../storybook/components/Toast/Toast';

// Servicios y hooks
import { login } from './services/login.service';
import { useUserActions } from '../../hooks/useLoginActions';

// Modelos
import LoginModel, { LoginForm } from './models/Login';

const Login = () => {
  const navigate = useNavigate();
  const { logout, loginUser } = useUserActions(); // Llamadas a acciones de usuario

  // Estado para manejar errores y mensajes de Toast
  const [error, setError] = useState({});
  const [showToast, setShowToast] = useState(false);
  const [showError, setShowError] = useState('Ha ocurrido un error, comuniquese con el administrador.');

  // Configuración del formulario con react-hook-form
  const { register, handleSubmit } = useForm<LoginModel>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  // Mutación de login utilizando React Query
  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess(data) {
      // Acción al realizar login exitoso
      const login = {
        isLogin: true,
        menu: data.menu,
        user: data.user,
      };

      // Guardamos los tokens en el localStorage
      localStorage.setItem('jwt', data.jwt);
      localStorage.setItem('refresh', data.refresh);

      // Llamada a la acción de login y redirección
      loginUser(login);
      navigate('/dashboard');
    },
    onError(error) {
      // En caso de error, mostramos el mensaje en el Toast
      setShowError(error.message);
      setShowToast(true);
    },
  });

  // Función de validación de formulario
  const formValidations = (formData: any): boolean => {
    setError({});
    let error = {};

    // Validación de email
    if (formData.email === '') {
      error = { ...error, email: 'Email requerido' };
    }

    // Validación de contraseña
    if (formData.password === '') {
      error = { ...error, password: 'Contraseña requerida' };
    }

    setError(error);

    // Retorna si hay errores
    return Object.keys(error).length === 0;
  };

  // Función para manejar el envío del formulario
  const onSubmit: SubmitHandler<LoginForm> = (data) => {
    setShowError('');
    setShowToast(false);

    const { email, password } = data;

    // Validamos los datos del formulario
    const isValid = formValidations(data);

    // Si es válido, ejecutamos la mutación
    if (isValid) {
      const login = {
        email,
        password,
      };

      loginMutation.mutate(login);
    }
  };

  // Efecto que ejecuta el logout al cargar el componente
  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    logout();
  }, []);

  return (
    <div id="crud-modal" aria-hidden="true" className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full">
        {/* Formulario de Login */}
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

          {/* Sección de botones y mensajes */}
          <section className="flex justify-end pb-4">
            <div>
              {/* Muestra el mensaje de error si ocurre un problema */}
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
