const ModalButtonWithIcon = ({ children, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center text-gray-800 transition duration-200 hover:text-gray-600"
    >
      {children}
    </button>
  )
}

export default ModalButtonWithIcon
