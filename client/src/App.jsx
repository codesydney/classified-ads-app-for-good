import { Outlet } from 'react-router-dom'
import Navbar from './components/navbar/Navbar'
import Footer from './components/Footer.jsx'

function App() {
  return (
    <>
      <Navbar />

      <div className="flex flex-col min-h-screen">
        <div className="mt-[120px] flex-grow flex flex-col">
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
