import Logo from './Logo'

const Navbar = () => {
  return (
    <div className="max-w-[2520px] mx-auto xl:pg-20 md:px-10 sm:px-2 px-4 border-b-[1px] md:hidden">
      <div className="flex flex-row items-center justify-between gap-2 md:gap-0">
        <div className="p-[10px]">
          <Logo height={165} width={165} />
        </div>
        <div>
          <UserMenu />
        </div>
      </div>
    </div>
  )
}

export default Navbar
