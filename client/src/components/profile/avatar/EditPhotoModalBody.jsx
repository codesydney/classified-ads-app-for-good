import ModalHeader from './ModalHeader'
import ModalButton from './ModalButton'

const EditPhotoModalBody = ({ setCurrentTab, currentUser }) => {
  return (
    <>
      <ModalHeader handleClose={() => setCurrentTab('main')}>
        Edit profile photo
      </ModalHeader>
      <p>Yo its edit</p>
      <div className="p-6 flex justify-end gap-4">
        <ModalButton onClick={() => setCurrentTab('main')} variant="hollow">
          Cancel
        </ModalButton>
        <ModalButton variant="noraml">Save Edit</ModalButton>
      </div>
    </>
  )
}

export default EditPhotoModalBody
