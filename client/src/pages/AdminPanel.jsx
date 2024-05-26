import AdminSearchBar from '../components/admin/searchBar/AdminSearchBar.jsx'
import AdminSearchResults from '../components/admin/searchResults/AdminSearchResults.jsx'

const AdminPanel = () => {
  return (
    <div>
      <h1 className="p-4 pb-0 m-auto max-w-[1444px] font-bold md:text-xl lg:text-2xl">
        Admin Panel
      </h1>
      <AdminSearchBar />
      <AdminSearchResults />
    </div>
  )
}

export default AdminPanel
