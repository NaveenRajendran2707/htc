
const Pagination = ({ data, setPage }) => {
  return data ? (
    <div className='flex justify-end gap-2'>
      <span className='p-2.5 inline-flex items-center gap-x-2 text-sm font-medium text-gray-800'>
        {data.startIndex} - {data.endIndex} of {data.total}
      </span>
      <span
        onClick={() => setPage(data.page - 1)}
        className={`p-2.5 inline-flex items-center gap-x-2 text-sm font-medium rounded border-1 border-gray-300 bg-white text-gray-800 hover:bg-gray-100  hover:shadow cursor-pointer focus:outline-none focus:bg-gray-50 active:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none mx-1 ${data.page === 1 && 'disabled'}`}
      >
        <span className='material-symbols-rounded'>chevron_left</span>
      </span>
      <span
        onClick={() => setPage(data.page + 1)}
        className={`p-2.5 inline-flex items-center gap-x-2 text-sm font-medium rounded border-1 border-gray-300 bg-white text-gray-800 hover:bg-gray-100  hover:shadow cursor-pointer focus:outline-none focus:bg-gray-50 active:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none ${
          data.page === data.pages && 'disabled'
        }`}
      >
        <span className='material-symbols-rounded'>chevron_right</span>
        </span>
    </div>
  ) : null
}

export default Pagination
