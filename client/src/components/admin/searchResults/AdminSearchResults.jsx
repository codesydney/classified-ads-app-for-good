import { useSelector, useDispatch } from 'react-redux'
import {
  adminSearchUsers,
  adminResetSearch,
} from '../../../features/admin/adminAction'
import { useEffect, useState } from 'react'
import NoUserResults from './NoUserResults'
import ResultsCount from './ResultsCount'
import PaginationNavigation from '../../search/PaginationNavigation'
import IndividualUserResultContainer from './IndividualUserResultContainer'
import AddDocumentModal from './AddDocumentModal'

const AdminSearchResults = () => {
  const dispatch = useDispatch()
  const { users, meta, searchQuery } = useSelector(state => state.admin)
  const [newDocumentModalOpen, setNewDocumentModalOpen] = useState(false)

  const handlePageChange = async page => {
    dispatch(adminSearchUsers({ ...searchQuery, page }))
  }

  useEffect(() => {
    dispatch(adminResetSearch())
  }, [])
  return (
    <>
      <div className="p-4 m-auto max-w-[1444px]">
        <div className="mb-2 flex justify-between">
          <ResultsCount meta={meta} usersLength={users.length} />
          <button
            className={`rounded border-[1px] text-xs px-2 py-1 hover:ring-4  hover:ring-gray-300 border-gray-500 bg-white`}
            onClick={() => setNewDocumentModalOpen(true)}
          >
            Insert Document
          </button>
        </div>
        <div
          className={`min-h-[300px] bg-gray-50 rounded flex flex-col items-center  max-sm:scale-50 max-sm:w-[200%] max-sm:origin-top-left max-sm:h-[50%] p-2 ${!users.length && 'justify-center'}`}
        >
          {users.length ? (
            users.map(user => {
              return <IndividualUserResultContainer key={user.id} user={user} />
            })
          ) : (
            <NoUserResults />
          )}
        </div>
        <PaginationNavigation meta={meta} handlePageChange={handlePageChange} />
      </div>
      {newDocumentModalOpen && (
        <AddDocumentModal setNewDocumentModalOpen={setNewDocumentModalOpen} />
      )}
    </>
  )
}

export default AdminSearchResults
