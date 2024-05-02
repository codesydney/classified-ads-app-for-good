import AdminSearchBar from '../components/admin/searchBar/AdminSearchBar.jsx'
import AdminSearchResults from '../components/admin/searchResults/AdminSearchResults.jsx'

const AdminPanel = () => {
  return (
    <div>
      <h1>Admin Panel</h1>
      <AdminSearchBar />
      <AdminSearchResults />
    </div>
  )
}

export default AdminPanel
