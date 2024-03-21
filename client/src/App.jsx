import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useAppDispatch } from './store.js'
import { me } from './features/auth/authAction.js'
import Navbar from './components/navbar/Navbar'
import Footer from './components/Footer.jsx'

function App() {
  const dispatch = useAppDispatch()
  const { isAuthenticated } = useSelector(state => state.auth)

  useEffect(() => {
    if (!isAuthenticated) return

    dispatch(me())
  }, [])

  return (
    <>
      <Navbar />

      <div className="flex flex-col min-h-screen">
        <div className="mt-[100px] flex-grow">
          <Outlet />
        </div>
        <div>
          <Footer />
        </div>
      </div>
    </>
  )
}

export default App
