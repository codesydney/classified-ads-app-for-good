const NavigationButton = ({ children, handleClick, isActive }) => {
  return (
    <button
      className={`flex  justify-center items-center w-8 h-8 mx-1 rounded
        ${isActive ? ' bg-primary text-white border-2 border-primary' : 'text-primary hover:text-white bg-transparent hover:bg-primary border-2 border-primary'}
        ease-in-out duration-300`}
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
