const SelectInput = ({ value, field, handleFieldEdit }) => {
  return (
    <select
      name={field}
      className="select select-bordered rounded border-[1px] border-gray-300 focus:border-none focus:outline-none focus:ring-[2px] focus:ring-primary w-fit min-h-fit h-fit text-xs"
      // {...register(field, { setValueAs: value => value === 'true' })}
      value={value}
      onChange={handleFieldEdit}
    >
      <option value={true}>True</option>
      <option value={false}>False</option>
    </select>
  )
}

export default SelectInput
