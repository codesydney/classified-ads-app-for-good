const ModalButton = ({ children, variant, onClick, disabled }) => {
  return (
    <button
      onClick={event => onClick(event)}
      className={`px-6 py-2 border-[1px] border-primary rounded-full font-semibold w-fit transition duration-200 ${variant === 'hollow' ? 'text-primary hover:text-white hover:bg-primary' : 'text-white bg-primary hover:bg-primary/70'}`}
      disabled={disabled}
    >
      {children}
    </button>
  )
}

export default ModalButton
