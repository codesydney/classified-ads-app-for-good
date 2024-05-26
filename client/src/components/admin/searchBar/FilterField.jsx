import { useSelector, useDispatch } from 'react-redux'
import { updateSearchFilter } from '../../../features/admin/adminSlice'
import SelectInput from './SelectInput'

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
      <SelectInput
        handleChange={handleFilterChange}
        value={`${searchQuery.filter.fieldName}:${searchQuery.filter.fieldValue}`}
        label="Filter By"
        selectOptions={filterOptions}
      />
    </div>
  )
}

export default FilterField
