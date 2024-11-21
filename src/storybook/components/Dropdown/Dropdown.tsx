import { Controller } from 'react-hook-form';
import { DropdownProps } from './interface';
import { useMemo } from 'react';

const Dropdown = ({ control, fields, tittle, name, appearance, error }: DropdownProps) => {
  const classConfig = useMemo(() => {
    const config = {
      error: {
        input: 'bg-gray-50 border border-red-500 text-red-500 text-sm rounded-lg w-full p-2.5',
        label: 'text-red-700 dark:text-red-500',
        explanation: 'text-red-700 dark:text-red-500',
      },
      info: {
        input: 'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5',
        label: 'text-gray-900 dark:text-white',
        explanation: 'text-gray-500 dark:text-gray-400',
      },
    };

    return config[appearance] || {};
  }, [appearance]);

  return (
    <>
      <label className={`block mb-2 text-sm font-medium ${classConfig.label}`}>{tittle}</label>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <select {...field} className={`${classConfig.input}`}>
            <option key={'default'} value={''}>
              {'Seleccione un valor'}
            </option>
            {fields?.map((field: any) => (
              <option key={field.value} value={field.value}>
                {field.label}
              </option>
            ))}
          </select>
        )}
      />
      <p id="helper-text-explanation" className={`mt-2 text-sm italic ${classConfig.explanation}`}>
        {error?.hasOwnProperty(name) ? error[name] : ''}
      </p>
    </>
  );
};

export default Dropdown;
