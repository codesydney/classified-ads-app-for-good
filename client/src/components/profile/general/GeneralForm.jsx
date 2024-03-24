import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { toast } from 'react-hot-toast'
import { useAppDispatch } from '../../../store'
import InputGroup from '../InputGroup.jsx'
import FormButton from '../FormButton.jsx'
import { generalInformationSchema } from '../../../schema/index.js'
const GeneralForm = () => {
  const [errorMessage, setErrorMessage] = useState('')
  const dispatch = useAppDispatch()
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    setFocus,
    reset,
  } = useForm({
    resolver: yupResolver(generalInformationSchema),
  })
  const { currentUser } = useSelector(state => state.auth)

  useEffect(() => {
    if (currentUser) {
      const defaultVals = {
        firstName: currentUser?.firstName || '',
        lastName: currentUser?.lastName || '',
        email: currentUser?.email || '',
        phone: currentUser?.phone || '',
        suburb: currentUser?.suburb || '',
        postcode: currentUser?.postcode || '',
        facebookName: currentUser?.facebookName || '',
        story: currentUser?.story || '',
      }
      reset(defaultVals)
    }
  }, [currentUser])

  const onSubmit = async formData => {
    try {
      console.log('wooohooo')
    } catch (error) {
      console.log('error')
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
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
            tooltip="This is a tooltip for the input"
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
          tooltip="This is a tooltip for the input"
        />
        <InputGroup
          name="phone"
          label="Phone Number"
          type="text"
          errors={errors}
          register={register}
          setFocus={setFocus}
          tooltip="This is a tooltip for the input"
        />
        <div className="sm:grid md:block lg:grid grid-cols-2 gap-10">
          <InputGroup
            name="suburb"
            label="Suburb"
            type="text"
            errors={errors}
            register={register}
            setFocus={setFocus}
            tooltip="This is a tooltip for the input"
          />
          <InputGroup
            name="postcode"
            label="Postcode"
            type="text"
            errors={errors}
            register={register}
            setFocus={setFocus}
            tooltip="This is a tooltip for the input"
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
            tooltip="This is a tooltip for the input"
          />
          <InputGroup
            name="story"
            label="Bio"
            type="textarea"
            errors={errors}
            register={register}
            setFocus={setFocus}
            tooltip="This is a tooltip for the input"
          />
        </div>
        <FormButton>Update Information</FormButton>
      </form>
    </>
  )
}

export default GeneralForm
