import { useForm } from 'react-hook-form';
import Button from '../../storybook/components/Button/Button';
import Input from '../../storybook/components/Input/Input';
import LoginModel from './models/Login';

const Login = () => {
  const { register, handleSubmit, reset } = useForm<LoginModel>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  return (
    <div id="crud-modal" aria-hidden="true" className="fixed inset-0 z-50 flex items-center justify-center ">
      <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900">Crear usuario</h3>
          <button
            type="button"
            className="text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg w-8 h-8 flex justify-center items-center"
            data-modal-toggle="crud-modal"
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

        <form className="p-4" autoComplete="off">
          <div className="grid gap-6 mb-6 md:grid-cols-1">
            <div>
              <Input
                type="text"
                tittle="Email"
                name="email"
                placeholders="correo@correo.cl"
                style={'info'}
                register={register}
              />
            </div>
            <div>
              <Input
                type="text"
                tittle="Clave"
                name="email"
                placeholders="correo@correo.cl"
                style={'info'}
                register={register}
              />
            </div>
            <div className="grid gap-6 mb-6 md:grid-cols-2">
              <div>
                <Input
                  type="text"
                  tittle="Clave"
                  name="password"
                  placeholders="correo@correo.cl"
                  style={'info'}
                  register={register}
                />
              </div>
              <div>
                <Input
                  type="text"
                  tittle="Clave"
                  name="password"
                  placeholders="correo@correo.cl"
                  style={'info'}
                  register={register}
                />
              </div>
            </div>
          </div>

          <section className="flex justify-end pb-4">
            <div>
              <Button text={'Iniciar Sesion'} status={'info'} type={'submit'} />
            </div>
          </section>
        </form>
      </div>
    </div>
  );
};

export default Login;
