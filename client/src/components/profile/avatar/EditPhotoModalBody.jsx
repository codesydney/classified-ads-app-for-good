import ModalHeader from './ModalHeader'
import ModalButton from './ModalButton'
import ImageCrop from './ImageCrop'

// Edit Images wont work unless we allow cors from s3?
// if you must use cross-origin images, the external server hosting the images needs to be configured with Cross-Origin Resource Sharing (CORS) headers. This involves adding headers like Access-Control-Allow-Origin to explicitly permit your domain to access the images.
const EditPhotoModalBody = ({ setCurrentTab, currentUser }) => {
  return (
    <>
      <ModalHeader handleClose={() => setCurrentTab('main')}>
        Edit profile photo
      </ModalHeader>
      {currentUser?.alumniProfilePicture && (
        <ImageCrop
          src={currentUser.alumniProfilePicture}
          closeCrop={() => setCurrentTab('main')}
        />
      )}
    </>
  )
}

export default EditPhotoModalBody
