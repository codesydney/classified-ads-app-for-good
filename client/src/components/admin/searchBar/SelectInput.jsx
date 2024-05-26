const SelectInput = ({ label, selectOptions, handleChange, value }) => {
  return (
    <label className="form-control w-full">
      <div className="label pb-1">
        <span className="label-text text-s font-semibold">{label}</span>
      </div>
      <select
        name="fieldName"
        onChange={handleChange}
        value={value}
        className="select select-bordered w-full
            border-2 border-gray-300 focus:border-transparent focus:ring-2 focus:ring-primary focus:outline-none text-xs h-fit min-h-fit py-2 appearance-none"
      >
        {selectOptions.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  )
}

export default SelectInput
