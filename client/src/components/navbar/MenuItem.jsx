const MenuItem = ({ onClick, label }) => {
  return (
    <div
      onClick={onClick}
      className="
        px-4
        py-3
        hover:bg-primary
        hover:text-white
        transition
        font-semibold
      "
    >
      {label}
    </div>
  )
}

export default MenuItem
