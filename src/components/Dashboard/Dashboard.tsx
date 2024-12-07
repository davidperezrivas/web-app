import PieChart from '../../storybook/components/Charts/Pie/Pie';

const data = [
  {
    id: 'JavaScript',
    label: 'JavaScript',
    value: 45,
  },
  {
    id: 'Python',
    label: 'Python',
    value: 30,
  },
  {
    id: 'Java',
    label: 'Java',
    value: 15,
  },
  {
    id: 'C++',
    label: 'C++',
    value: 10,
  },
];
const Dashboard = () => {
  return (
    <section className="w-full h-screen  p-5 ">
      <section className="w-full px-2 md:px-6 text-xl text-gray-800 leading-normal ">
        <section className="drop-shadow-md bg-white box-content box-border">
          {/* Título y mensaje de error */}
          <span className="text-base md:text-sm text-green-500 font-bold">
            <h1 className="font-bold break-normal text-blue-500 pt-6 pb-2 text-3xl md:text-4xl pl-5">Dashboard</h1>
          </span>
        </section>

        {/* Tabla de usuarios con botón para agregar nuevo */}
        <section className="drop-shadow-md bg-white box-content box-border min-h-32 px-2 md:px-14 py-10">
          <section className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 2xl:grid-cols-1">
            <div className="grid grid-cols-4 gap-4">
              <div>
                <PieChart data={data} tittle={'test 1'} />
              </div>
              <div>
                <PieChart data={data} tittle={'test 2'} />
              </div>
              <div>
                <PieChart data={data} tittle={'test 3'} />
              </div>
              <div>
                <PieChart data={data} tittle={'test 4'} />
              </div>
            </div>
          </section>

          {/* Renderiza Skeleton mientras carga o la tabla de usuarios */}
          <section className="min-h-full"></section>
        </section>
      </section>
    </section>
  );
};

export default Dashboard;
