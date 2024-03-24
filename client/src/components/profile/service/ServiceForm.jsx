import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { toast } from 'react-hot-toast'
import { useAppDispatch } from '../../../store'
import { serviceSchema } from '../../../schema/index.js'
import InputGroup from '../InputGroup.jsx'
import FormButton from '../FormButton.jsx'

const ServiceForm = () => {
  const [errorMessage, setErrorMessage] = useState('')
  const dispatch = useAppDispatch()
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    setFocus,
    reset,
  } = useForm({
    resolver: yupResolver(serviceSchema),
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
        name="serviceName"
        label="Service Name"
        type="text"
        required={true}
        errors={errors}
        register={register}
        setFocus={setFocus}
        tooltip="This is a tooltip for the input"
      />
      <InputGroup
        name="serviceDescription"
        label="Service Description"
        type="textarea"
        errors={errors}
        register={register}
        setFocus={setFocus}
        tooltip="This is a tooltip for the input"
      />
      <InputGroup
        name="serviceUrl"
        label="Link to service page"
        type="text"
        errors={errors}
        register={register}
        setFocus={setFocus}
        tooltip="This is a tooltip for the input"
      />
      <FormButton isDirty={isDirty}>Update Service</FormButton>
    </form>
  )
}

export default ServiceForm
