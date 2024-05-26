import { useSelector, useDispatch } from 'react-redux'
import { updateSearchSort } from '../../../features/admin/adminSlice'
import SelectInput from './SelectInput'

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
      <SelectInput
        handleChange={handleSortChange}
        value={`${searchQuery.sort.sortBy}:${searchQuery.sort.sortValue}`}
        label="Sort By"
        selectOptions={sortOptions}
      />
    </div>
  )
}

export default SortField
