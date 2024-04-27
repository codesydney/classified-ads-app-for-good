const ButtonGroup = ({ searchState, setSearchState }) => {
  const handleReset = () => {
    setSearchState({
      search: { fieldName: '', fieldValue: '' },
      filter: { fieldName: '', fieldValue: '' },
      sort: { sortBy: '', sortValue: '' },
    })
  }
  return (
    <div className="flex gap-2 items-end">
      <button
        className="w-full py-2 px-4 bg-gray-200 hover:bg-gray-300 hover:border-gray-300 rounded-md border-2 ease-in-out duration-300"
        type="button"
        onClick={handleReset}
      >
        Reset
      </button>
      <button
        className="w-full py-2 px-4 bg-primary bg-transparent hover:bg-primary text-primary hover:font-semibold hover:text-white rounded-md border-2 border-primary ease-in-out duration-300"
        type="button"
      >
        Search
      </button>
    </div>
  )
}

export default ButtonGroup
