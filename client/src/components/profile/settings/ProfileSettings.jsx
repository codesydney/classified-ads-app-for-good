import SectionHeading from '../ProfileSectionHeading'
import ChangePassword from './ChangePassword'
import SetProfileHidden from './SetProfileHidden.jsx'
import DeleteAccount from './DeleteAccount'
const ProfileSettings = () => {
  return (
    <div className="">
      <SectionHeading>Settings</SectionHeading>
      <ChangePassword />
      <SetProfileHidden />
      <DeleteAccount />
    </div>
  )
}

export default ProfileSettings
