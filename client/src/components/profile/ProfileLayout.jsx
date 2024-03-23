import ProfileNav from './ProfileNav'
import { Outlet } from 'react-router-dom'

const ProfileLayout = () => {
  return (
    <div className="my-8">
      <div className="">
        <h1>Hello profile</h1>
        <ProfileNav />
      </div>
      <div className="">
        <Outlet />
      </div>
    </div>
  )
}

export default ProfileLayout
