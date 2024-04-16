import { Outlet } from 'react-router-dom'
import Navbar from './components/navbar/Navbar'
import Footer from './components/Footer.jsx'

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <div className="mt-[100px] flex-grow">
        <Outlet />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  )
}

export default App
