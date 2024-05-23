const ModalButtonWithIcon = ({ children, onClick, extraClasses }) => {
  return (
    <button
      onClick={onClick}
      className={`${extraClasses} flex flex-col sm:flex-row gap-2 items-center text-gray-800 transition duration-200 hover:text-primary`}
    >
      {children}
    </button>
  )
}

export default ModalButtonWithIcon
