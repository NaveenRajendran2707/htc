import { useEffect, useState } from "react";

const Message = ({ variant, children }) => {
  const [alert, setAlert] = useState(true);
  const color = {
    danger: "red",
    success: "green",
    warning: "yellow",
    info: "sky",
  };

  const icon = {
    danger: 'error',
    success: 'check_circle',
    warning: 'warning',
    info: 'info',
  };
  function generateClasses(variant) {
    const colorMap = {
      danger: 'red',
      success: 'green',
      warning: 'yellow',
      info: 'sky',
    };
  
    const textColorClass = `text-${colorMap[variant]}-500`;
    const bgColorClass = `bg-${colorMap[variant]}-100`;
  
    return { textColorClass, bgColorClass };
  }
  useEffect(() => {
    const timeId = setTimeout(() => {
      setAlert(false);
    }, 150000);

    return () => {
      clearTimeout(timeId);
    };
  }, [alert]);
  const { textColorClass, bgColorClass } = generateClasses(variant);

  return (
    alert && (
      <div className={`fixed z-[999999] top-0 right-0 ${variant}`} role="alert">
        <div
          className={`flex items-center w-full max-w-xs p-4 text-gray-500 rounded-lg shadow dark:text-gray-400 dark:bg-gray-800 ${bgColorClass}`}
          role="alert"
        >
          <div className={`inline-flex items-center justify-center flex-shrink-0 w-8 h-8 ${textColorClass} bg-blue-100 rounded-lg`}>
            <span className="material-symbols-rounded">{icon[variant]}</span>
          </div>
          <div className="ms-3 text-gray-800 text-sm font-normal">
            {children}
          </div>
          <button
            type="button"
            className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 "
            aria-label="Close"
          >
            <span className="sr-only">Close</span>
            <span className="material-symbols-rounded">close</span>
          </button>
        </div>
      </div>
    )
  );
};

export default Message;
