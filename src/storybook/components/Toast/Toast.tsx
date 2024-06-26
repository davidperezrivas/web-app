import { useEffect, useState } from 'react';
import { ToastProps } from './interface';
import ToastErrorIcon from './icons/error';
import ToastSuccessIcon from './icons/success';
import ToastWarningIcon from './icons/warning';

const Toast = ({ text, type }: ToastProps) => {
  const [showToast, setShowToast] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowToast(false);
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  if (!showToast) {
    return null;
  }

  let typeToast;
  let toastColor;
  switch (type) {
    case 'error':
      typeToast = <ToastErrorIcon />;
      toastColor = 'bg-red-300';
      break;
    case 'success':
      typeToast = <ToastSuccessIcon />;
      toastColor = 'bg-green-300';
      break;
    case 'warning':
      typeToast = <ToastWarningIcon />;
      toastColor = 'bg-yellow-300';
      break;
    default:
      typeToast = null;
      toastColor = '';
  }

  return (
    <>
      {showToast && (
        <div
          id="toast-success"
          className={`fixed top-0 right-0 z-50 flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 ${toastColor}`}
          role="alert"
        >
          {typeToast}
          <div className="ms-3 text-sm font-normal text-black">{text}</div>
          <button
            type="button"
            className={`ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-red-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700 ${toastColor}`}
            onClick={() => setShowToast(false)}
          >
            <span className="sr-only">Close</span>
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
          </button>
        </div>
      )}
    </>
  );
};

export default Toast;
