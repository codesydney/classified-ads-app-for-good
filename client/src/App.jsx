import './App.css'
import { Outlet } from 'react-router-dom'

function App() {
  return (
    <>
      <div>This is the nav</div>
      <Outlet />
      <div>This is the footer</div>
    </>
  )
}

export default App
