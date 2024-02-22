import './App.css'
import { Outlet } from 'react-router-dom'
import SearchBar from './components/SearchBar'

function App() {
  return (
    <>
      <div>This is the nav</div>
      <Outlet />
      <SearchBar />
      <div>This is the footer</div>
    </>
  )
}

export default App
