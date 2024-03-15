import { Outlet } from 'react-router-dom'
import Navbar from './components/navbar/Navbar'

function App() {
  return (
    <>
      <Navbar />

      <div className="mt-[150px]">
        <Outlet />
      </div>

      <div>This is the footer</div>
    </>
  )
}

export default App
