import InputGroup from '../profile/InputGroup'

const searchOptions = [
  { value: '', label: 'None' },
  { value: 'firstName', label: 'First Name' },
  { value: 'lastName', label: 'Last Name' },
  { value: 'email', label: 'Email' },
]

const SearchField = ({ setSearchState, searchState }) => {
  const handleSelectChange = event => {
    setSearchState({
      ...searchState,
      search: { ...searchState.search, fieldName: event.target.value },
    })
  }

  const handleInputChange = event => {
    setSearchState({
      ...searchState,
      search: { ...searchState.search, fieldValue: event.target.value },
    })
  }

  return (
    <div className="flex flex-col md:flex-row items-end gap-2 flex-grow">
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text text-[15px] font-semibold">
            Search By
          </span>
        </div>
        <select
          name="fieldName"
          onChange={handleSelectChange}
          value={searchState.search.fieldName}
          className="select select-bordered w-full
            border-2 border-gray-300 focus:border-transparent focus:ring-2 focus:ring-primary"
        >
          {searchOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text text-[15px] font-semibold">
            {searchState.search.fieldName}
          </span>
        </div>
        <input
          type="text"
          name="fieldValue"
          value={searchState.search.fieldValue}
          onChange={handleInputChange}
          placeholder={`${searchState.search.fieldName ? 'Enter ' + searchState.search.fieldName : 'Field unselected'}`}
          className={`input input-bordered w-full border-2 border-gray-300 focus:border-transparent focus:ring-2 focus:ring-primary focus:outline-primary`}
        />
      </label>
    </div>
  )
}

export default SearchField
