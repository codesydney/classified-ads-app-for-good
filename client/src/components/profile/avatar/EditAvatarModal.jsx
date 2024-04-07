import MainModalBody from './MainModalBody'
import AddPhotoModalBody from './AddPhotoModalBody'
import EditPhotoModalBody from './EditPhotoModalBody'
import DeleteSubModal from './DeleteSubModal'
import { useSelector } from 'react-redux'
import { useRef, useState } from 'react'

const EditAvatarModal = ({ setModalOpen, profileImg }) => {
  const [imgSrc, setImgSrc] = useState(null)
  const [deleteSubModalOpen, setDeleteSubModalOpen] = useState(false)
  const [currentTab, setCurrentTab] = useState('main')
  const { currentUser } = useSelector(state => state.auth)

  const onSelectFile = event => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()

    reader.addEventListener('load', () => {
      const imageURL = reader.result?.toString() || ''
      console.log(imageURL)
      setImgSrc(imageURL)
    })

    reader.readAsDataURL(file)
  }

  return (
    <div
      onClick={() => setModalOpen(false)}
      className="fixed w-screen h-screen top-0 left-0 bg-gray-800/20 z-10 flex items-center justify-center"
    >
      <div
        onClick={event => event.stopPropagation()}
        className="w-[100%] max-w-[600px] bg-white rounded relative mx-2"
      >
        {currentTab === 'main' && (
          <MainModalBody
            setDeleteSubModalOpen={setDeleteSubModalOpen}
            setModalOpen={setModalOpen}
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
