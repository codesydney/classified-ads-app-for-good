import SettingsForm from './SettingsForm'
import SectionHeading from '../ProfileSectionHeading'
import ChangePassword from './ChangePassword'
const ProfileSettings = () => {
  return (
    <div className="">
      <SectionHeading>Settings</SectionHeading>
      <ChangePassword />
      <SettingsForm />
    </div>
  )
}

export default ProfileSettings
