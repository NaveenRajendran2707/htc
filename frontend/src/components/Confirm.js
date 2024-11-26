import "react-confirm-alert/src/react-confirm-alert.css";

export const Confirm = (action) => {
  return {
    customUI: ({ onClose }) => {
      return (
        <div className="p-4 shadow-lg rounded-xl text-gray-800 bg-white">
          <h4 className="text-xl font-bold mb-3">Delete?</h4>
          <p className="pb-3">This action cannot be reversed.</p>
          <div className="flex items-center justify-end gap-3 mt-3">
            <button
              className="px-4 py-2.5 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border-1 border-gray-300 bg-white text-gray-800 hover:bg-gray-100  hover:shadow focus:outline-none focus:bg-gray-50 active:bg-gray-50"
              onClick={onClose}
            >
              No, Keep it
            </button>
            <button
              className="inline-flex items-center text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 focus:ring-offset-white font-medium rounded-lg text-sm px-4 py-2.5 text-center "
              onClick={() => {
                action();
                onClose();
              }}
            >
              <span className="material-symbols-rounded">delete</span>
              <span className="ml-3">Yes, Delete it!</span>
            </button>
          </div>
        </div>
      );
    },
  };
};
