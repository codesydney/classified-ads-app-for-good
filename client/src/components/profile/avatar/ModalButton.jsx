const ModalButton = ({
  children,
  variant,
  onClick,
  disabled,
  extraClasses,
}) => {
  return (
    <button
      onClick={event => onClick(event)}
      className={`${extraClasses} px-6 py-2 border-2 border-primary rounded-md font-semibold w-fit transition duration-300 ease-in-out ${variant === 'hollow' ? 'text-primary hover:text-white hover:bg-primary' : 'text-white bg-primary hover:bg-primary/70'}`}
      disabled={disabled}
    >
      {children}
    </button>
  )
}

export default ModalButton
