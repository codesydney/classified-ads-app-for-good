import ProfileNav from './ProfileNav'
import Header from './Header'
import { Outlet } from 'react-router-dom'

const ProfileLayout = () => {
  return (
    <div className="bg-[#f9fafb]/70 flex-grow py-4 md:py-8">
      <div className="px-4 mx-auto max-w-[1200px]  md:grid md:grid-cols-3 md:gap-10 lg:gap-20">
        <div className="bg-white shadow-md rounded-md md:col-span-1 self-start">
          <ProfileNav />
        </div>
        <div className="md:col-span-2">
          <Header />
          <div className="bg-white shadow-md rounded-md p-4">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileLayout
