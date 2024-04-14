import { useRef } from 'react'
import { Link } from 'react-router-dom'
import Breadcrumbs from './Breadcrumbs.jsx'
import { useSelector } from 'react-redux'
import Tooltip from '../../components/profile/Tooltip.jsx'

const Header = () => {
  const { currentUser } = useSelector(state => state.auth)
  const tooltipRef = useRef(null)
  const requiredFields = {
    firstName: currentUser?.firstName,
    lastName: currentUser?.lastName,
    email: currentUser?.email,
    state: currentUser?.state,
    postcode: currentUser?.postcode,
    story: currentUser?.story,
    alumniProfilePicture: currentUser?.alumniProfilePicture,
    college: currentUser?.education?.college,
    course: currentUser?.education?.course,
    yearGraduated: currentUser?.education?.yearGraduated,
  }
  const totalRequiredFields = Object.keys(requiredFields).length
  const incompleteRequiredFields = objectIterator(requiredFields)
  const percentCompleted = completedPercentage(
    incompleteRequiredFields.length,
    totalRequiredFields,
  )

  function objectIterator(object, array) {
    array = array || []
    Object.keys(object).map(key => {
      if (
        object.hasOwnProperty(key) &&
        typeof object[key] === 'object' &&
        object[key] !== null
      ) {
        objectIterator(object[key], array)
      } else {
        if (typeof object[key] === 'undefined' || object[key] === null) {
          array.push(key)
        }
      }
    })
    return array
  }

  function completedPercentage(incomplete, total) {
    // Flipping the logic to found out how many fields are complete
    const completedFields = total - incomplete
    return (completedFields / total).toPrecision(2) * 100
  }

  return (
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 py-6 md:py-2 md:flex-wrap md:gap-2">
      <Breadcrumbs />
      <div className="">
        {currentUser?.isProfileComplete && (
          <Link
            to={`/profile/${currentUser.id}`}
            className=" py-2 px-4 block border-2 mt-4 sm:mt-0 w-full sm:w-fit border-primary rounded-md text-primary text-center bg-transparent hover:bg-primary hover:text-white hover:font-semibold ease-in-out duration-300"
          >
            <button>View Public Profile</button>
          </Link>
        )}
        {!currentUser?.isProfileComplete && (
          <span className=" flex gap-2 py-2 px-4 border-2 mt-4 sm:mt-0 w-full sm:w-fit border-red-500 rounded-md text-red-500 text-center bg-red-200/50">
            {`Your profile is ${percentCompleted}% complete! Click for info`}
            <Tooltip tooltipRef={tooltipRef} extraClasses={'-bottom-52'}>
              <div className="flex flex-col justify-start items-start gap-2">
                <span className=" text-left text-primary">
                  Please complete those fields!
                </span>
                {incompleteRequiredFields.map((fields, index) => {
                  return (
                    <span key={index} className=" capitalize">
                      {fields}
                    </span>
                  )
                })}
              </div>
            </Tooltip>
          </span>
        )}
      </div>
    </div>
  )
}

export default Header
