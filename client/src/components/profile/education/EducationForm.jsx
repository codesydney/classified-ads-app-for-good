import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { toast } from 'react-hot-toast'
import { useAppDispatch } from '../../../store'
import InputGroup from '../InputGroup.jsx'
import FormButton from '../FormButton.jsx'
import { educationSchema } from '../../../schema/index.js'

const EducationForm = () => {
  const [errorMessage, setErrorMessage] = useState('')
  const dispatch = useAppDispatch()
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    setFocus,
    reset,
  } = useForm({
    resolver: yupResolver(educationSchema),
  })
  const { currentUser } = useSelector(state => state.auth)

  useEffect(() => {
    if (currentUser) {
      const defaultVals = {
        serviceName: currentUser?.service?.serviceName || '',
        serviceUrl: currentUser?.service?.serviceUrl || '',
        serviceDescription: currentUser?.service?.serviceDescription || '',
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
    <form onSubmit={handleSubmit(onSubmit)}>
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
      <FormButton isDirty={isDirty}>Update Education</FormButton>
    </form>
  )
}

export default EducationForm
