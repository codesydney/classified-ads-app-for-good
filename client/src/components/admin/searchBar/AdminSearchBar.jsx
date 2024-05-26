import SearchField from './SearchField'
import FilterField from './FilterField'
import SortField from './SortField'
import ButtonGroup from './ButtonGroup'

const AdminSearchBar = () => {
  return (
    <div className="flex flex-col gap-4 xl:px-20 md:px-10 sm:px-2 p-4 max-w-[1444px] m-auto lg:flex-row">
      <div className="flex flex-col md:flex-row gap-2 lg:flex-grow">
        <SearchField />
        <FilterField />
        <SortField />
      </div>
      <ButtonGroup />
    </div>
  )
}

export default AdminSearchBar
