import { useSelector, useDispatch } from 'react-redux'
import { updateSearchFilter } from '../../features/admin/adminSlice'

const filterOptions = [
  { value: ':', label: 'None' },
  { value: 'isHidden:true', label: 'Profile Hidden' },
  { value: 'isHidden:false', label: 'Profile Visbile' },
  { value: 'isProfileComplete:true', label: 'Profile Complete' },
  { value: 'isProfileComplete:false', label: 'Profile Incomplete' },
]

const FilterField = () => {
  const dispatch = useDispatch()
  const { searchQuery } = useSelector(state => state.admin)

  const handleFilterChange = event => {
    dispatch(updateSearchFilter(event.target.value))
  }

  return (
    <div className="flex-grow">
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text text-[15px] font-semibold">
            Filter By
          </span>
        </div>
        <select
          name="fieldName"
          className="select select-bordered w-full
            border-2 border-gray-300 focus:border-transparent focus:ring-2 focus:ring-primary"
          onChange={handleFilterChange}
          value={`${searchQuery.filter.fieldName}:${searchQuery.filter.fieldValue}`}
        >
          {filterOptions.map(option => (
            <option key={option.label} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>
    </div>
  )
}

export default FilterField
