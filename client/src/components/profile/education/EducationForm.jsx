import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { toast } from 'react-hot-toast'
import { useAppDispatch } from '../../../store'
import InputGroup from '../InputGroup.jsx'
import FormButton from '../FormButton.jsx'

const EducationForm = () => {
  return (
    <form>
      <InputGroup
        name="course"
        label="Course"
        type="text"
        errors={{ message: 'hello' }}
        tooltip="This is a tooltip for the input"
      />
      <InputGroup
        name="college"
        label="College"
        type="text"
        errors={{ message: 'hello' }}
        tooltip="This is a tooltip for the input"
      />
      <InputGroup
        name="yearGraduated"
        label="Year Graduated"
        type="text"
        errors={{ message: 'hello' }}
        tooltip="This is a tooltip for the input"
      />
      <FormButton>Update Education</FormButton>
    </form>
  )
}

export default EducationForm
