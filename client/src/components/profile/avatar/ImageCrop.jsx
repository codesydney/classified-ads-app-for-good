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

const MIN_WIDTH = 150
const ASPECT_RATIO = 4 / 3

const ImageCrop = ({ src, closeCrop, setCurrentTab, fileName }) => {
  const [loading, setLoading] = useState(false)
  const [crop, setCrop] = useState()
  const imageRef = useRef(null)
  const canvasRef = useRef(null)
  const dispatch = useAppDispatch()
  const { currentUser, loading: isLoading } = useSelector(state => state.auth)

  const onImageLoad = event => {
    const { width, height } = event.currentTarget
    console.log('onimage load')
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

  function dataURLtoBlob(dataURL) {
    const arr = dataURL.split(',')
    const mime = arr[0].match(/:(.*?);/)[1]
    const bstr = atob(arr[1]) // Decode Base64
    let n = bstr.length
    const u8arr = new Uint8Array(n)
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n)
    }
    return new Blob([u8arr], { type: mime })
  }

  const handleCropSave = async () => {
    setLoading(true)

    setCanvasPreview(
      imageRef.current,
      canvasRef.current,
      convertToPixelCrop(crop, imageRef.current.width, imageRef.current.height),
    )
    console.log('woro')
    const dataURL = canvasRef.current.toDataURL()

    const blob = dataURLtoBlob(dataURL)
    const formData = new FormData()
    formData.append('image', blob, fileName)

    try {
      const response = await dispatch(updateImage(formData))

      if (response.type === 'auth/updateImage/rejected') {
        setCurrentTab('main')
        return toast.error('Could not update image')
      }

      toast.success('Your image has been updated!')
    } catch (error) {
      toast.error('Could not update image')
    }
    setLoading(false)
    setCurrentTab('main')
  }

  return (
    <>
      <div className="loader"></div>
      <div className="p-6 flex flex-col items-center relative">
        {loading && (
          <div className="w-full h-full absolute top-0 left-0 bg-black/70 z-20 flex justify-center items-center">
            <div role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        )}
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
        <ModalButton variant="hollow" onClick={closeCrop} disabled={loading}>
          Cancel
        </ModalButton>
        <ModalButton
          variant="normal"
          onClick={() => {
            setLoading(true)
            handleCropSave()
          }}
          disabled={loading}
        >
          Save Photo
        </ModalButton>
      </div>
      {crop && <canvas className="hidden" ref={canvasRef} />}
    </>
  )
}

export default ImageCrop
