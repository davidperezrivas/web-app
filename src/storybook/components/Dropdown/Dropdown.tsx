import { Controller } from 'react-hook-form';

const Dropdown = ({ control, fields, tittle }: any) => {
  return (
    <>
      <label
        className={`block mb-2 text-sm font-medium text-black-700 dark:text-white`}
      >
        {tittle}
      </label>
      <Controller
        control={control}
        name='role'
        render={({ field }) => (
          <select
            {...field}
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5'
          >
            {fields.map((role: any) => (
              <option key={role.value} value={role.value}>
                {role.label}
              </option>
            ))}
          </select>
        )}
      />
    </>
  );
};

export default Dropdown;
