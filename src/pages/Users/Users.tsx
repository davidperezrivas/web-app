import Breadcrumb from '../../storybook/components/Breadcrumbs/Breadcrumbs';
import Table from '../../storybook/components/Table/Table';

import { useQuery } from '@tanstack/react-query';
import User from './models/Users';
import { getAllUsers } from '../../services/Users/users.service';
import PlusIcon from '../../storybook/icons/plus';
import Button from '../../storybook/components/Button/Button';
import Toast from '../../storybook/components/Toast/Toast';

const Users = () => {
  const { isLoading, isError, data } = useQuery<User[]>({ queryKey: ['users'], queryFn: async () => getAllUsers() });

  console.log(data);
  console.log(isLoading);
  console.log(isError);
  return (
    <section className="w-full p-5">
      <section className="w-full px-2 md:px-6 text-xl text-gray-800 leading-normal">
        <section className="drop-shadow-md bg-white box-content box-border">
          <Breadcrumb />

          <span className="text-base md:text-sm text-green-500 font-bold">
            <h1 className="font-bold break-normal text-blue-500 pt-6 pb-2 text-3xl md:text-4xl pl-5">Usuarios</h1>
          </span>
          <Toast text={'Esta todo ook'} type={'warning'} />
        </section>
        <section className="drop-shadow-md bg-white box-content box-border min-h-32 px-2 md:px-14 py-10">
          <section className="grid grid-cols-1 sm:grid-cols-1  md:grid-cols-1 lg:grid-cols-1 2xl:grid-cols-1">
            <section className="flex justify-end pb-4">
              <div>
                <Button text={'Crear Usuario'} type={'info'} icon={<PlusIcon />} />
              </div>
            </section>
          </section>
          <section>
            <Table />
          </section>
        </section>
      </section>
    </section>
  );
};

export default Users;
