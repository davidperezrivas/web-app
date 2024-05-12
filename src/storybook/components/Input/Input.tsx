import { useMemo } from 'react';
import { InputProps } from './interface';

const Input = ({ tittle, name, appearance, icon, placeholders, error, register, type }: InputProps) => {
  const classConfig = useMemo(() => {
    const config = {
      error: {
        input:
          'bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full p-2.5 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500',
        label: 'text-red-700 dark:text-red-500',
        explanation: 'text-red-700 dark:text-red-500',
      },
      info: {
        input:
          'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500',
        label: 'text-gray-900 dark:text-white',
        explanation: 'text-gray-500 dark:text-gray-400',
      },
    };

    return config[appearance] || {};
  }, [appearance]);

  return (
    <>
      <label className={`block mb-2 text-sm font-medium ${classConfig.label}`}>{tittle}</label>
      <input
        autoComplete="false"
        autofill="off"
        type={type}
        id={name}
        className={classConfig.input}
        placeholder={placeholders}
        name={name}
        {...register(name)}
      />
      <p id="helper-text-explanation" className={`mt-2 text-sm italic ${classConfig.explanation}`}>
        {error?.hasOwnProperty(name) ? error[name] : placeholders}
      </p>
    </>
  );
};

export default Input;
