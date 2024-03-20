const NavigationButton = ({ children, handleClick, isActive }) => {
  return (
    <button
      className={`flex  justify-center items-center w-8 h-8 mx-1 rounded
        ${isActive ? 'bg-primary hover:bg-primary/80 text-white' : 'bg-neutral/10 hover:bg-neutral/20'}
        `}
      onClick={() => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
        handleClick()
      }}
    >
      {children}
    </button>
  )
}

export default NavigationButton
