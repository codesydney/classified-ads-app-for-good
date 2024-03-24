import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { toast } from 'react-hot-toast'
import { useAppDispatch } from '../../../store'
import InputGroup from '../InputGroup.jsx'
import FormButton from '../FormButton.jsx'

const ServiceForm = () => {
  return (
    <form>
      <InputGroup
        name="serviceName"
        label="Service Name"
        type="text"
        required={true}
        errors={{ message: 'hello' }}
        tooltip="This is a tooltip for the input"
      />
      <InputGroup
        name="serviceDescription"
        label="Service Description"
        type="textarea"
        errors={{ message: 'hello' }}
        tooltip="This is a tooltip for the input"
      />
      <InputGroup
        name="serviceUrl"
        label="Link to service page"
        type="text"
        errors={{ message: 'hello' }}
        tooltip="This is a tooltip for the input"
      />
      <FormButton>Update Service</FormButton>
    </form>
  )
}

export default ServiceForm
