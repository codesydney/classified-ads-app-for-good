import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { updateProfile, me } from '../features/auth/authAction.js'
import { useAppDispatch } from '../store.js'

// @TODO - revamp this page. only used to test the profile update endpoint
const MyProfile = () => {
  const { currentUser } = useSelector(state => state.auth)
  const dispatch = useAppDispatch()
  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    suburb: '',
    postcode: '',
    facebookName: '',
    story: '',
    alumniProfilePicture: '',
    education: { course: '', college: '', yearGraduated: '' },
    service: { serviceName: '', serviceLogo: '', serviceUrl: '' },
  })

  useEffect(() => {
    if (currentUser) {
      setProfile({
        ...profile,
        firstName: currentUser.firstName || '',
        lastName: currentUser.lastName || '',
        email: currentUser.email || '',
        phone: currentUser.phone || '',
        suburb: currentUser.suburb || '',
        postcode: currentUser.postcode || '',
        facebookName: currentUser.facebookName || '',
        story: currentUser.story || '',
        alumniProfilePicture: currentUser.alumniProfilePicture || '',
        education: currentUser.education || {
          course: '',
          college: '',
          yearGraduated: '',
        },
        service: currentUser.service || {
          serviceName: '',
          serviceLogo: '',
          serviceUrl: '',
        },
      })
    }
  }, [currentUser])

  const handleChange = event => {
    const { name, value } = event.target
    if (name.includes('.')) {
      const [parentKey, childKey] = name.split('.')
      setProfile(prevState => ({
        ...prevState,
        [parentKey]: {
          ...prevState[parentKey],
          [childKey]: value,
        },
      }))
    } else {
      setProfile(prevState => ({
        ...prevState,
        [name]: value,
      }))
    }
  }

  const handleSubmit = async event => {
    event.preventDefault()
    const response = await dispatch(updateProfile(profile))

    console.log('response', response)

    if (response.type === 'auth/updateProfile/fulfilled') {
      dispatch(me())
    }
  }

  return (
    <div className="mt-[30px] flex">
      <div className="mr-[50px]">
        <pre>{JSON.stringify(currentUser, null, 4)}</pre>
      </div>
      <div className="w-[500px]">
        <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
          <label className="block">
            <span className="text-gray-700">First name</span>
            <input
              type="text"
              name="firstName"
              value={profile.firstName}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </label>
          <label className="block">
            <span className="text-gray-700">Last name</span>
            <input
              type="text"
              name="lastName"
              value={profile.lastName}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </label>
          <label className="block">
            <span className="text-gray-700">Email</span>
            <input
              type="text"
              name="email"
              value={profile.email}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </label>
          <label className="block">
            <span className="text-gray-700">Phone Number</span>
            <input
              type="text"
              name="phone"
              value={profile.phone}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </label>
          <label className="block">
            <span className="text-gray-700">Suburb</span>
            <input
              type="text"
              name="suburb"
              value={profile.suburb}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </label>
          <label className="block">
            <span className="text-gray-700">Postcode</span>
            <input
              type="text"
              name="postcode"
              value={profile.postcode}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </label>
          <label className="block">
            <span className="text-gray-700">Facebook Name</span>
            <input
              type="text"
              name="facebookName"
              value={profile.facebookName}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </label>
          <label className="block">
            <span className="text-gray-700">Bio</span>
            <input
              type="text"
              name="story"
              value={profile.story}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </label>
          <label className="block">
            <span className="text-gray-700">
              Alumni Profile Pic (to be replaced with real image drop and upload
              to S3 to get url)
            </span>
            <input
              type="text"
              name="alumniProfilePicture"
              value={profile.alumniProfilePicture}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </label>

          <h1 className="font-bold">EDUCATION SECTION</h1>
          <label className="block">
            <span className="text-gray-700">Course</span>
            <input
              type="text"
              name="course"
              value={profile.education.course}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </label>
          <label className="block">
            <span className="text-gray-700">College</span>
            <input
              type="text"
              name="college"
              value={profile.education.college}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </label>
          <label className="block">
            <span className="text-gray-700">Year Graduated</span>
            <input
              type="text"
              name="yearGraudated"
              value={profile.education.yearGraduated}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </label>

          <h1 className="font-bold">SERVICE SECTION</h1>
          <label className="block">
            <span className="text-gray-700">Service Name</span>
            <input
              type="text"
              name="serviceName"
              value={profile.service.serviceName}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </label>
          <label className="block">
            <span className="text-gray-700">
              Service Logo (to be replaced with real image drop and upload to S3
              to get url)
            </span>
            <input
              type="text"
              name="serviceLogo"
              value={profile.service.serviceLogo}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </label>
          <label className="block">
            <span className="text-gray-700">Service URL</span>
            <input
              type="text"
              name="serviceURL"
              value={profile.education.serviceUrl}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </label>

          <button type="submit" className="btn btn-primary">
            Update Profile
          </button>
        </form>
      </div>{' '}
    </div>
  )
}

export default MyProfile
