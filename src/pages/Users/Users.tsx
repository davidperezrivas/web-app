import Button from '@mui/material/Button';
import Breadcrumb from '../../storybook/components/Breadcrumbs/Breadcrumbs';
import Table from '../../storybook/components/Table/Table';
import AddCircleIcon from '@mui/icons-material/AddCircle';

const Blog = () => {
  return (
    <section className="w-full h-full p-5">
      <section className="w-full px-4 md:px-6 text-xl text-gray-800 leading-normal">
        <Breadcrumb />
        <section className="drop-shadow-md bg-white box-content box-border">
          <span className="text-base md:text-sm text-green-500 font-bold">
            <span>
              <h1 className="font-bold break-normal text-blue-500 pt-6 pb-2 text-3xl md:text-4xl pl-5">Usuarios</h1>
            </span>
          </span>
        </section>
        <section className="drop-shadow-md bg-white box-content box-border min-h-96 px-14 py-10">
          <section className="flex justify-end pb-4">
            <div>
              <Button variant="outlined" startIcon={<AddCircleIcon />}>
                Nuevo Usuario
              </Button>
            </div>
          </section>
          <Table />
        </section>
      </section>
    </section>
  );
};

export default Blog;
