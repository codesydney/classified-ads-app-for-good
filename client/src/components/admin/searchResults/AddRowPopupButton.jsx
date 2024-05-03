const AddRowPopupButton = ({ children, handleClick }) => {
  return (
    <button
      className="py-2 px-6 text-xs text-white flex gap-2 items-center; hover:bg-slate-700 hover:text-white"
      onClick={handleClick}
      type="button"
    >
      {children}
    </button>
  )
}

export default AddRowPopupButton
