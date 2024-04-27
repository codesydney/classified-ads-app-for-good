import { useSelector, useDispatch } from 'react-redux'
import { updateSearchSort } from '../../features/admin/adminSlice'

const sortOptions = [
  { value: ':', label: 'None' },
  { value: 'createdAt:asc', label: 'Created At (asc)' },
  { value: 'createdAt:desc', label: 'Created At (desc)' },
  { value: 'updatedAt:asc', label: 'Updated At (asc)' },
  { value: 'updatedAt:desc', label: 'Updated At (desc)' },
]

const SortField = () => {
  const dispatch = useDispatch()
  const { searchQuery } = useSelector(state => state.admin)
  const handleSortChange = event => {
    dispatch(updateSearchSort(event.target.value))
  }

  return (
    <div className="flex-grow">
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text text-[15px] font-semibold">Sort By</span>
          {/* {tooltip && <Tooltip tooltipRef={tooltipRef}>{tooltip}</Tooltip>} */}
        </div>
        <select
          name="fieldName"
          className="select select-bordered w-full
            border-2 border-gray-300 focus:border-transparent focus:ring-2 focus:ring-primary"
          onChange={handleSortChange}
          value={`${searchQuery.sort.sortBy}:${searchQuery.sort.sortValue}`}
        >
          {sortOptions.map(option => (
            <option key={option.label} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>
    </div>
  )
}

export default SortField
