import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { toast } from 'react-hot-toast'
import { useAppDispatch } from '../../../store'
import InputGroup from '../InputGroup.jsx'
import FormButton from '../FormButton.jsx'
import { educationSchema } from '../../../schema/index.js'
import formatDirtyFields from '../../../utils/formatDirtyFields.js'
import { updateEducation } from '../../../features/auth/authAction.js'

const EducationForm = () => {
  const [errorMessage, setErrorMessage] = useState('')
  const dispatch = useAppDispatch()
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, dirtyFields },
    setFocus,
    reset,
  } = useForm({
    resolver: yupResolver(educationSchema),
  })
  const { currentUser, loading: isLoading } = useSelector(state => state.auth)
  console.log(currentUser)
  useEffect(() => {
    if (currentUser) {
      const defaultVals = {
        course: currentUser?.education?.course || '',
        college: currentUser?.education?.college || '',
        yearGraduated: currentUser?.education?.yearGraduated || '',
      }
      reset(defaultVals)
    }
  }, [currentUser])

  const onSubmit = async formData => {
    try {
      const fieldsToUpdate = formatDirtyFields(dirtyFields, formData)

      const response = await dispatch(updateEducation(fieldsToUpdate))

      if (response.type === 'auth/updateEducation/rejected') {
        return setErrorMessage(response.payload)
      }
      setErrorMessage('')
      toast.success('Your information has been updated!')
    } catch (error) {
      setErrorMessage('Something went wrong!')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {errorMessage && (
        <div role="alert" className="alert alert-error my-[12px] text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-6 cursor-pointer"
            fill="none"
            viewBox="0 0 24 24"
            onClick={() => setErrorMessage('')}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{errorMessage}</span>
        </div>
      )}
      <InputGroup
        name="course"
        label="Course"
        type="text"
        errors={errors}
        register={register}
        setFocus={setFocus}
        tooltip="This is a tooltip for the input"
      />
      <InputGroup
        name="college"
        label="College"
        type="text"
        errors={errors}
        register={register}
        setFocus={setFocus}
        tooltip="This is a tooltip for the input"
      />
      <InputGroup
        name="yearGraduated"
        label="Year Graduated"
        type="text"
        errors={errors}
        register={register}
        setFocus={setFocus}
        tooltip="This is a tooltip for the input"
      />
      <FormButton isDirty={isDirty} isLoading={isLoading}>
        Update Education
      </FormButton>
    </form>
  )
}

export default EducationForm
