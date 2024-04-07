import ModalHeader from './ModalHeader'
import ModalButton from './ModalButton'
import profileImg from '../../../assets/placeholder.jpg'
const AddPhotoModalBody = ({ setCurrentTab, currentUser }) => {
  return (
    <>
      <ModalHeader handleClose={() => setCurrentTab('main')}>
        Upload profile photo
      </ModalHeader>
      <div className="p-6 flex flex-col items-center gap-4">
        <p className="text-center text-lg">
          <span className="capitalize font-bold ">
            {currentUser?.firstName}
          </span>
          , lets get you a profile photo.
        </p>
        <img
          src={currentUser?.alumniProfilePhoto || profileImg}
          className="w-[100px] h-[100px] rounded-full"
        ></img>
        <p className="text-center text-sm">
          Take a picture, or upload an existing one. Then edit with our cropping
          tool to make the perfect profile picture.
        </p>
      </div>
      <div className="p-6 flex justify-end gap-4">
        <ModalButton variant="hollow">Use camera</ModalButton>
        <ModalButton variant="noraml">Upload photo</ModalButton>
      </div>
    </>
  )
}

export default AddPhotoModalBody
