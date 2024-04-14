export default function MenuButton({ label, navigate, extraClasses }) {
  return (
    <div
      className={`hidden md:block text-md font-semibold py-2 px-2 rounded-md  hover:bg-neutral-100 transition cursor-pointer hover:shadow-sm border-2 border-transparent ${extraClasses}`}
      onClick={navigate}
    >
      {label}
    </div>
  )
}
