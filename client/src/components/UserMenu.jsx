import { useState, useCallback } from 'react'

const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(false)
  const route = useRouter()

  const toggleOpen = useCallback(() => {
    setIsOpen(prev => !prev)
  }, [])

  const navigateToLink = link => {
    route.push(link)
    setIsOpen(false)
  }

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3 cursor-pointer">
        <div
          onClick={toggleOpen}
          className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar src={user?.photoURL} />
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm z-[99999]">
          <div className="flex flex-col cursor-pointer">
            {user ? (
              <>
                <MenuItem onClick={() => navigateToLink('/')} label="Home" />
                <MenuItem
                  onClick={() => navigateToLink('/profit')}
                  label="Profit"
                />
                <MenuItem
                  onClick={() => navigateToLink('/transactions')}
                  label="Transactions"
                />
                <MenuItem
                  onClick={() => navigateToLink('/bank-details')}
                  label="Bank Details"
                />
                <MenuItem
                  onClick={async () => {
                    await logOut()
                    setIsOpen(false)
                  }}
                  label="Logout"
                />
              </>
            ) : (
              <>
                <MenuItem
                  onClick={async () => {
                    await handleLogin()
                    setIsOpen(false)
                  }}
                  label="Login"
                />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
export default UserMenu
