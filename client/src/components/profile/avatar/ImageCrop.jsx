import 'react-image-crop/dist/ReactCrop.css'
import ReactCrop, {
  centerCrop,
  convertToPixelCrop,
  makeAspectCrop,
} from 'react-image-crop'
import ModalButton from './ModalButton'
import { useRef, useState } from 'react'
import setCanvasPreview from './setCanvasPreview'
import { useAppDispatch } from '../../../store'
import { updateImage } from '../../../features/auth/authAction'
import { useSelector } from 'react-redux'
import { toast } from 'react-hot-toast'
import dataURLtoBlob from './dataUrlToBlob'

const MIN_WIDTH = 150
const ASPECT_RATIO = 4 / 3

const ImageCrop = ({ src, closeCrop, setCurrentTab, fileName }) => {
  const [crop, setCrop] = useState()
  const imageRef = useRef(null)
  const canvasRef = useRef(null)
  const dispatch = useAppDispatch()
  const { loading: isLoading } = useSelector(state => state.auth)

  // When image loads in, set crop in state
  const onImageLoad = event => {
    const { width, height } = event.currentTarget
    const crop = makeAspectCrop(
      {
        unit: '%',
        width: 100,
        minWidth: 300,
      },
      ASPECT_RATIO,
      width,
      height,
    )
    const centeredCrop = centerCrop(crop, width, height)

    setCrop(centeredCrop)
  }

  const handleCropChange = (pixelCrop, percentCrop) => setCrop(percentCrop)

  // Save cropped image and send to backend
  const handleCropSave = async () => {
    // draw cropped image onto canvas
    setCanvasPreview(
      imageRef.current,
      canvasRef.current,
      convertToPixelCrop(crop, imageRef.current.width, imageRef.current.height),
    )

    // extract cropped image from canvas as dataUrl
    const dataURL = canvasRef.current.toDataURL()

    // Format data for api
    const blob = dataURLtoBlob(dataURL)
    const formData = new FormData()
    formData.append('image', blob, fileName)

    // Send 'form data' to api.
    try {
      const response = await dispatch(updateImage(formData))
      console.log(response)
      if (response.type === 'auth/updateImage/rejected') {
        setCurrentTab('main')
        return toast.error('Could not update image')
      }

      toast.success('Your image has been updated!')
    } catch (error) {
      console.log(error)
      toast.error('Could not update image')
    }
    // go back to main tab.
    setCurrentTab('main')
  }

  return (
    <div className="relative">
      {isLoading && (
        <div className="p-6 absolute w-full h-full flex justify-center items-center bg-black/30 z-10">
          <div className="border-4 w-[50px] h-[50px] rounded-full border-gray-300 border-t-primary animate-spin"></div>
        </div>
      )}

      <div className="p-6 flex flex-col items-center relative">
        <ReactCrop
          crop={crop}
          onChange={handleCropChange}
          keepSelection
          aspect={ASPECT_RATIO}
          minWidth={MIN_WIDTH}
        >
          <img
            src={src}
            alt="Image you are editing"
            onLoad={onImageLoad}
            ref={imageRef}
          />
        </ReactCrop>
      </div>

      <div className="p-6 flex justify-end gap-4">
        <ModalButton variant="hollow" onClick={closeCrop} disabled={isLoading}>
          Cancel
        </ModalButton>

        <ModalButton
          variant="normal"
          onClick={handleCropSave}
          disabled={isLoading}
        >
          Save Photo
        </ModalButton>
      </div>

      {crop && <canvas className="hidden" ref={canvasRef} />}
    </div>
  )
}

export default ImageCrop
