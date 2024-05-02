const SelectInput = ({ label, selectOptions, handleChange, value }) => {
  return (
    <label className="form-control w-full">
      <div className="label">
        <span className="label-text text-[15px] font-semibold">{label}</span>
      </div>
      <select
        name="fieldName"
        onChange={handleChange}
        value={value}
        className="select select-bordered w-full
            border-2 border-gray-300 focus:border-transparent focus:ring-2 focus:ring-primary"
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
