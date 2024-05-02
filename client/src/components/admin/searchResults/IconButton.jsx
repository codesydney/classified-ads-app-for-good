const IconButton = ({ children, handleClick }) => {
  return (
    <button
      className="border-gray-500 rounded border-[1px] px-2 py-1 hover:ring-gray-300 hover:ring-4"
      onClick={handleClick}
    >
      {children}
    </button>
  )
}

export default IconButton
