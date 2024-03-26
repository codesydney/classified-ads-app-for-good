import { IoMdClose } from 'react-icons/io'
import { toast } from 'react-hot-toast'
import { useSelector } from 'react-redux'
import { useAppDispatch } from '../../../store.js'
import { logout } from '../../../features/auth/authSlice.js'
import { deleteAccount } from '../../../features/auth/authAction.js'
import { useNavigate } from 'react-router-dom'

const DeleteAccountModal = ({ setModalOpen }) => {
  const { loading: isLoading } = useSelector(state => state.auth)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleClick = async () => {
    try {
      const response = await dispatch(deleteAccount())

      if (response.type === 'auth/deleteAccount/rejected') {
        return toast.error("We couldn't Delete you account right now")
      }

      toast.success('Your account has been deleted.')
      dispatch(logout())
      navigate('/signup')
    } catch (error) {
      console.log(error)
      toast.error("We couldn't Delete you account right now")
    }
  }

  return (
    <div className="fixed w-screen h-screen bg-black/40 top-0 left-0 z-50 flex items-center justify-center p-4">
      <div className="w-full max-w-[500px] mx-auto bg-white p-10 rounded relative">
        <button
          className="absolute top-5 right-5"
          onClick={() => setModalOpen(false)}
          disabled={isLoading}
        >
          <IoMdClose className="w-[20px] h-[20px]" />
        </button>
        <h2 className="font-extrabold text-3xl mb-4">Are you sure?</h2>
        <p className="">
          All your information will be deleted if you proceed with this action.
          You will not be able to retrieve your information or account once it
          is deleted.
        </p>
        <div className="flex flex-wrap gap-4 mt-4">
          <button
            className="btn btn-squre w-fit py-2 bg-white hover:bg-red-500 hover:text-white text-red-500 border-red-500 mt-[15px]"
            onClick={handleClick}
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="loading loading-spinner"></span>
            ) : (
              'Delete'
            )}
          </button>
          <button
            className="btn btn-squre w-fit py-2 bg-primary hover:bg-primary text-white mt-[15px]"
            onClick={() => setModalOpen(false)}
            disabled={isLoading}
          >
            Just kidding
          </button>
        </div>
      </div>
    </div>
  )
}

export default DeleteAccountModal
