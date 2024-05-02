import { useSelector, useDispatch } from 'react-redux'
import {
  adminSearchUsers,
  adminResetSearch,
} from '../../../features/admin/adminAction.js'

const ButtonGroup = () => {
  const dispatch = useDispatch()
  const { loading, meta, searchQuery } = useSelector(state => state.admin)

  const handleReset = async () => {
    dispatch(adminResetSearch())
  }

  const handleSearch = async () => {
    dispatch(adminSearchUsers({ ...searchQuery, page: 1 }))
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
        disabled={loading}
        onClick={handleSearch}
      >
        Search
      </button>
    </div>
  )
}

export default ButtonGroup
