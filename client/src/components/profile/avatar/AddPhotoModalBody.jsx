import ModalHeader from './ModalHeader'
import ModalButton from './ModalButton'
import profileImg from '../../../assets/placeholder.jpg'
import { useRef, useState } from 'react'
import ImageCrop from './ImageCrop'

const AddPhotoModalBody = ({ setCurrentTab, currentUser }) => {
  const [imgSrc, setImgSrc] = useState('')
  const [fileName, setFileName] = useState('')
  const [fileUploadError, setFileUploadError] = useState('')

  const onSelectFile = event => {
    const file = event.target.files?.[0]

    if (!file) return

    // Check file size
    const fileSize = file.size / 1024 / 1024

    if (fileSize > 1) {
      setImgSrc('')
      return setFileUploadError('Image must be under 1Mb in size.')
    }
    setFileName(file.name)

    const reader = new FileReader()
    reader.addEventListener('load', () => {
      // Create a faux image to check its the right size.
      const imageElement = new Image()
      const imageUrl = reader.result?.toString() || ''
      imageElement.src = imageUrl

      imageElement.addEventListener('load', event => {
        const { naturalWidth, naturalHeight } = event.target

        if (naturalWidth < 150) {
          setFileUploadError('Image Dimensions are too small.')
          setFileName('')
          return setImgSrc('')
        }
      })

      setImgSrc(imageUrl)
    })
    reader.readAsDataURL(file)
  }

  const uploadCroppedPhoto = async (imgSrc, fileName) => {}

  const closeCrop = () => {
    setImgSrc('')
  }

  return (
    <>
      <ModalHeader handleClose={() => setCurrentTab('main')}>
        Upload profile photo
      </ModalHeader>

      {imgSrc ? (
        <ImageCrop
          src={imgSrc}
          closeCrop={closeCrop}
          setCurrentTab={setCurrentTab}
          fileName={fileName}
        />
      ) : (
        <div className="p-6 flex flex-col items-center gap-4">
          <p className="text-center text-lg">
            <span className="capitalize font-bold ">
              {currentUser?.firstName}
            </span>
            , lets get you a profile photo.
          </p>
          <img
            src={currentUser?.alumniProfilePicture || profileImg}
            className="w-[100px] h-[100px] rounded-full"
          ></img>
          <p className="text-center text-sm">
            Take a picture, or upload an existing one. Then edit with our
            cropping tool to make the perfect profile picture.
          </p>
          {fileUploadError && (
            <p className="text-center text-md text-red-500">
              {fileUploadError}
            </p>
          )}
        </div>
      )}

      {!imgSrc && (
        <div className="p-6 flex justify-end gap-4">
          <ModalButton variant="hollow" onClick={() => setCurrentTab('main')}>
            Cancel
          </ModalButton>
          <label className="px-6 flex items-center justify-content py-2 border-[1px] border-primary rounded-full font-semibold w-fit transition duration-200 text-white bg-primary hover:bg-primary/70">
            <span className="">Upload Photo</span>
            <input
              type="file"
              accept="image/*"
              onChange={onSelectFile}
              className="hidden"
            />
          </label>
        </div>
      )}
    </>
  )
}

export default AddPhotoModalBody
