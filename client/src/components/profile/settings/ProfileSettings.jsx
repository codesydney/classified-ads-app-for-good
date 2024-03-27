import SectionHeading from '../ProfileSectionHeading'
import ChangePassword from './ChangePassword'
import DeleteAccount from './DeleteAccount'
const ProfileSettings = () => {
  return (
    <div className="">
      <SectionHeading>Settings</SectionHeading>
      <ChangePassword />
      <DeleteAccount />
    </div>
  )
}

export default ProfileSettings
