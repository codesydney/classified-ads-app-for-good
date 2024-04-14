import { IoIosClose } from 'react-icons/io'
import ModalButton from './ModalButton'
import { useAppDispatch } from '../../../store'
import { useSelector } from 'react-redux'
import { deleteProfileImage } from '../../../features/auth/authAction'
import { toast } from 'react-hot-toast'

const DeleteSubModal = ({ setDeleteSubModalOpen }) => {
  const dispatch = useAppDispatch()
  const { loading: isLoading } = useSelector(state => state.auth)

  const handleDeleteImage = async () => {
    try {
      const response = await dispatch(deleteProfileImage())

      if (response.type === 'auth/deleteProfileImage/rejected') {
        toast.error('Error! Could not delete profile image')
        return setDeleteSubModalOpen(false)
      }

      toast.success('Success! Profile image deleted')
      setDeleteSubModalOpen(false)
    } catch (error) {
      toast.error('Error! Could not delete profile image')
      setDeleteSubModalOpen(false)
    }
  }

  return (
    <>
      <div
        className="w-full h-full fixed top-0 left-0 z-10 bg-black/70 rounded"
        onClick={() => setDeleteSubModalOpen(false)}
      ></div>
      <div
        className="max-w-[350px] w-full shadow-md absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] height-[30px] bg-white rounded z-20"
        onClick={event => event.stopPropagation()}
      >
        <button
          onClick={() => setDeleteSubModalOpen(false)}
          className=" absolute top-2 right-2 w-fit h-fit rounded-full border-[1px] transition duration-200 hover:bg-gray-200 hover:text-red-500"
        >
          <IoIosClose className="w-6 h-6 md:w-8 md:h-8" />
        </button>
        <h2 className="p-6 border-b-[1px] text-lg font-bold">
          Delete profile photo
        </h2>
        <p className="px-6 py-4 border-b-[1px]">
          Are you sure? Having a profile picture helps others recognize you.
        </p>
        <div className="p-6 flex justify-end gap-4">
          <ModalButton
            onClick={() => setDeleteSubModalOpen(false)}
            extraClasses={'border-red-500 text-red-500 hover:bg-red-500'}
            variant="hollow"
            disabled={isLoading}
          >
            Cancel
          </ModalButton>
          <ModalButton
            variant="hollow"
            onClick={handleDeleteImage}
            disabled={isLoading}
          >
            Delete
          </ModalButton>
        </div>
      </div>
    </>
  )
}

export default DeleteSubModal
