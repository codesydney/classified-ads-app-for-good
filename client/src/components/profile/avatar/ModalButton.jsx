const ModalButton = ({ children, variant, onClick }) => {
  return (
    <button
      onClick={event => onClick(event)}
      className={`px-6 py-2 border-[1px] border-primary rounded-full font-semibold transition duration-200 ${variant === 'normal' ? 'text-primary hover:text-white hover:bg-primary' : 'text-white bg-primary hover:bg-primary/70'}`}
    >
      {children}
    </button>
  )
}

export default ModalButton
