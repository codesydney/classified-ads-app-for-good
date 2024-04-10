import MainModalBody from './MainModalBody'
import AddPhotoModalBody from './AddPhotoModalBody'
import EditPhotoModalBody from './EditPhotoModalBody'
import DeleteSubModal from './DeleteSubModal'
import { useSelector } from 'react-redux'
import { useState } from 'react'

const EditAvatarModal = ({ handleModalClose }) => {
  const [deleteSubModalOpen, setDeleteSubModalOpen] = useState(false)
  const [currentTab, setCurrentTab] = useState('main')
  const { currentUser } = useSelector(state => state.auth)

  return (
    <div
      onClick={handleModalClose}
      className="fixed w-screen h-screen top-0 left-0 bg-gray-800/20 z-10 flex items-center justify-center overflow-y-scroll"
    >
      <div
        onClick={event => event.stopPropagation()}
        className="w-[100%] max-w-[600px] bg-white rounded relative mx-2 overflow-hidden"
      >
        {currentTab === 'main' && (
          <MainModalBody
            setDeleteSubModalOpen={setDeleteSubModalOpen}
            handleModalClose={handleModalClose}
            setCurrentTab={setCurrentTab}
            currentUser={currentUser}
          />
        )}
        {currentTab === 'add' && (
          <AddPhotoModalBody
            setCurrentTab={setCurrentTab}
            currentUser={currentUser}
          />
        )}
        {currentTab === 'edit' && (
          <EditPhotoModalBody
            setCurrentTab={setCurrentTab}
            currentUser={currentUser}
          />
        )}
      </div>

      {deleteSubModalOpen && (
        <DeleteSubModal
          setDeleteSubModalOpen={setDeleteSubModalOpen}
          currentUser={currentUser}
        />
      )}
    </div>
  )
}

export default EditAvatarModal
