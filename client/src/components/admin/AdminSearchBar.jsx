import SearchField from './SearchField'
import FilterField from './FilterField'
import SortField from './SortField'
import ButtonGroup from './ButtonGroup'
import { useState } from 'react'
const AdminSearchBar = () => {
  const [searchState, setSearchState] = useState({
    search: {
      fieldName: '',
      fieldValue: '',
    },
    filter: {
      fieldName: '',
      fieldValue: '',
    },
    sort: {
      sortby: '',
      sortValue: '',
    },
  })
  return (
    <div className="flex flex-col gap-4 p-4 max-w-[1444px] m-auto lg:flex-row">
      <div className="md:flex gap-2 lg:flex-grow">
        <SearchField
          setSearchState={setSearchState}
          searchState={searchState}
        />
        <FilterField
          setSearchState={setSearchState}
          searchState={searchState}
        />
        <SortField setSearchState={setSearchState} searchState={searchState} />
      </div>
      <ButtonGroup setSearchState={setSearchState} searchState={searchState} />
    </div>
  )
}

export default AdminSearchBar
