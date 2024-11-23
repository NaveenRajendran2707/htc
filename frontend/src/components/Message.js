import { useEffect, useState } from "react";

const Message = ({ variant, children }) => {
  const [alert, setAlert] = useState(true);

  const icon = {
    danger: "error",
    success: "check_circle",
    warning: "warning",
    info: "info",
  };

  const colorMap = {
    danger: "red",
    success: "green",
    warning: "yellow",
    info: "sky",
  };

  function getClassesByVariant(variant) {
    switch (variant) {
      case "danger":
        return {
          bgColorClass: "bg-red-100",
          borderColorClass: "border-red-600",
          textColorClass: "text-red-600",
        };
      case "success":
        return {
          bgColorClass: "bg-green-100",
          borderColorClass: "border-green-600",
          textColorClass: "text-green-600",
        };
      case "warning":
        return {
          bgColorClass: "bg-yellow-100",
          borderColorClass: "border-yellow-600",
          textColorClass: "text-yellow-600",
        };
      case "info":
        return {
          bgColorClass: "bg-sky-100",
          borderColorClass: "border-sky-600",
          textColorClass: "text-sky-600",
        };
      default:
        return {
          bgColorClass: "",
          borderColorClass: "",
          textColorClass: "",
        };
    }
  }

  // Usage:
  const { bgColorClass, borderColorClass, textColorClass } =
    getClassesByVariant(variant);

  useEffect(() => {
    const timeId = setTimeout(() => {
      setAlert(false);
    }, 5000);

    return () => {
      clearTimeout(timeId);
    };
  }, [alert]);

  return (
    alert && (
      <div
        className={`fixed z-[99999] top-[64px] right-[8px] ${variant}`}
        role="alert"
      >
        <div
          className={`flex items-center w-full max-w-sm p-4 border-t-4 text-gray-500 rounded ${borderColorClass} ${bgColorClass}`}
        >
          <div
            className={`inline-flex items-center justify-center flex-shrink-0 p-2 ${textColorClass} bg-white rounded`}
          >
            <span className="material-symbols-rounded text-2xl">{icon[variant]}</span>
          </div>
          <div className="ms-3 text-gray-800 text-sm font-normal">
            {children}
          </div>
          <button
            type="button"
            className={`${bgColorClass} ${textColorClass} hover:text-gray-800 rounded focus:ring-2 focus:ring-white-300 p-1.5 hover:bg-white-100 inline-flex items-center justify-center h-8 w-8`}
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
