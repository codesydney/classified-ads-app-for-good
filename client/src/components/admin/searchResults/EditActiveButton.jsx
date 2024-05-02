const EditActiveButton = ({ children, type, primary, handleClick }) => {
  return (
    <button
      className={`rounded border-[1px] text-xs px-2 py-1 hover:ring-4  hover:ring-gray-300 ${primary ? 'bg-primary text-white border-primary' : 'border-gray-500 bg-white'}`}
      onClick={handleClick}
      type={type}
    >
      {children}
    </button>
  )
}

export default EditActiveButton
