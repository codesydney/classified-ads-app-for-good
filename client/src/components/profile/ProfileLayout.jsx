import ProfileNav from './ProfileNav'
import { Outlet } from 'react-router-dom'

const ProfileLayout = () => {
  return (
    <div className="bg-[#f9fafb]/70 flex-grow py-4 md:py-8">
      <div className="px-4 mx-auto max-w-[1200px]  md:grid md:grid-cols-3 gap-20">
        <div className="bg-white shadow-md rounded-md md:col-span-1">
          <ProfileNav />
        </div>
        <div className="md:col-span-2">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default ProfileLayout
