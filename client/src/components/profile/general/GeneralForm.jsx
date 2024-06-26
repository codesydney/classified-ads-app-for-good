import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { toast } from 'react-hot-toast'
import { useAppDispatch } from '../../../store'
import InputGroup from '../InputGroup.jsx'
import FormButton from '../FormButton.jsx'
import { generalInformationSchema } from '../../../schema/index.js'
import formatDirtyFields from '../../../utils/formatDirtyFields.js'
import { updateGeneral } from '../../../features/auth/authAction.js'

const GeneralForm = () => {
  const [errorMessage, setErrorMessage] = useState('')
  const dispatch = useAppDispatch()
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, dirtyFields },
    setFocus,
    reset,
  } = useForm({
    resolver: yupResolver(generalInformationSchema),
  })
  const {
    currentUser,
    loading: isLoading,
    error,
  } = useSelector(state => state.auth)

  useEffect(() => {
    if (currentUser) {
      const defaultVals = {
        firstName: currentUser?.firstName || '',
        lastName: currentUser?.lastName || '',
        email: currentUser?.email || '',
        phone: currentUser?.phone || '',
        state: currentUser?.state || '',
        suburb: currentUser?.suburb || '',
        postcode: currentUser?.postcode || '',
        facebookName: currentUser?.facebookName || '',
        story: currentUser?.story || '',
      }
      reset(defaultVals)
    }
  }, [currentUser])

  const stateOptions = [
    { value: '', label: 'Please select a state' },
    { value: 'act', label: 'ACT' },
    { value: 'nsw', label: 'NSW' },
    { value: 'nt', label: 'NT' },
    { value: 'qld', label: 'QLD' },
    { value: 'sa', label: 'SA' },
    { value: 'tas', label: 'TAS' },
    { value: 'vic', label: 'VIC' },
    { value: 'wa', label: 'WA' },
  ]

  const onSubmit = async formData => {
    try {
      const fieldsToUpdate = formatDirtyFields(dirtyFields, formData)

      const response = await dispatch(updateGeneral(fieldsToUpdate))

      if (response.type === 'auth/updateGeneral/rejected') {
        return setErrorMessage(response.payload)
      }
      setErrorMessage('')
      toast.success('Your information has been updated!')
    } catch (error) {
      setErrorMessage('Something went wrong!')
    }
  }

  return (
    <>
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
        <div className="sm:grid md:block lg:grid grid-cols-2 gap-10">
          <InputGroup
            name="firstName"
            label="First Name"
            type="text"
            required={true}
            errors={errors}
            setFocus={setFocus}
            register={register}
            // tooltip="This is a tooltip for the input"
          />
          <InputGroup
            name="lastName"
            label="Last Name"
            type="text"
            required={true}
            errors={errors}
            register={register}
            setFocus={setFocus}
            // tooltip="This is a tooltip for the input"
          />
        </div>
        <InputGroup
          name="email"
          label="Email"
          type="email"
          required={true}
          errors={errors}
          register={register}
          setFocus={setFocus}
          // tooltip="This is a tooltip for the input"
        />
        <div className="sm:grid md:block lg:grid grid-cols-2 gap-10">
          <InputGroup
            name="phone"
            label="Phone Number"
            type="text"
            errors={errors}
            register={register}
            setFocus={setFocus}
            // tooltip="This is a tooltip for the input"
          />
          <InputGroup
            name="suburb"
            label="Suburb"
            type="text"
            errors={errors}
            register={register}
            setFocus={setFocus}
            // tooltip="This is a tooltip for the input"
          />
        </div>
        <div className="sm:grid md:block lg:grid grid-cols-2 gap-10">
          <InputGroup
            name="state"
            label="State"
            type="select"
            errors={errors}
            register={register}
            setFocus={setFocus}
            // tooltip="This is a tooltip for the input"
            options={stateOptions}
          />
          <InputGroup
            name="postcode"
            label="Postcode"
            type="text"
            errors={errors}
            register={register}
            setFocus={setFocus}
            // tooltip="This is a tooltip for the input"
          />
        </div>
        <div className="">
          <InputGroup
            name="facebookName"
            label="Facebook Username"
            type="text"
            errors={errors}
            register={register}
            setFocus={setFocus}
            // tooltip="This is a tooltip for the input"
          />
          <InputGroup
            name="story"
            label="Bio"
            type="textarea"
            errors={errors}
            register={register}
            setFocus={setFocus}
            // tooltip="This is a tooltip for the input"
          />
        </div>
        <FormButton isDirty={isDirty} isLoading={isLoading}>
          Update Information
        </FormButton>
      </form>
    </>
  )
}

export default GeneralForm
