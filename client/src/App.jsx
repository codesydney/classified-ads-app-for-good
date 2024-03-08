import { Outlet } from 'react-router-dom'
import Navbar from './components/Navbar'

function App() {
  return (
    <>
      <Navbar />
      <Outlet />
      <div>This is the footer</div>
    </>
  )
}

export default App
