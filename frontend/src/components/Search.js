const Search = ({ q, setQ, placeholder, searchHandler }) => {
  return (
    <form onSubmit={searchHandler}>
      <div className="input-group">
        <div className="relative">
          <input
            type="text"
            className="block w-full rounded-lg border-1 border-gray-400 py-2 ps-3 pe-8 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-500 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
            placeholder={placeholder}
            aria-label="Search"
            onChange={(e) => setQ(e.target.value)}
            value={q}
          />
          <div className="absolute inset-y-0 end-0 z-50 flex items-center pe-3">
            <button
              type="submit"
              className="text-gray-500 flex cursor-pointer hover:text-gray-800"
            >
              <span className="material-symbols-rounded">search</span>
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Search;
