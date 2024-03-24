import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { toast } from 'react-hot-toast'
import { useAppDispatch } from '../../../store'
import InputGroup from '../InputGroup.jsx'
import FormButton from '../FormButton.jsx'

const GeneralForm = () => {
  return (
    <form>
      <div className="sm:grid md:block lg:grid grid-cols-2 gap-10">
        <InputGroup
          name="firstName"
          label="First Name"
          type="text"
          required={true}
          errors={{ message: 'hello' }}
          // tooltip="This is a tooltip for the input"
        />
        <InputGroup
          name="lastName"
          label="Last Name"
          type="text"
          required={true}
          errors={{ message: 'hello' }}
          tooltip="This is a tooltip for the input"
        />
      </div>
      <InputGroup
        name="email"
        label="Email"
        type="email"
        required={true}
        errors={{ message: 'hello' }}
        tooltip="This is a tooltip for the input"
      />
      <InputGroup
        name="phone"
        label="Phone Number"
        type="text"
        errors={{ message: 'hello' }}
        tooltip="This is a tooltip for the input"
      />
      <div className="sm:grid md:block lg:grid grid-cols-2 gap-10">
        <InputGroup
          name="suburb"
          label="Suburb"
          type="text"
          errors={{ message: 'hello' }}
          tooltip="This is a tooltip for the input"
        />
        <InputGroup
          name="postcode"
          label="Postcode"
          type="text"
          errors={{ message: 'hello' }}
          tooltip="This is a tooltip for the input"
        />
      </div>
      <div className="">
        <InputGroup
          name="facebookName"
          label="Facebook Username"
          type="text"
          errors={{ message: 'hello' }}
          tooltip="This is a tooltip for the input"
        />
        <InputGroup
          name="story"
          label="Bio"
          type="textarea"
          errors={{ message: 'hello' }}
          tooltip="This is a tooltip for the input"
        />
      </div>
      <FormButton>Update Information</FormButton>
    </form>
  )
}

export default GeneralForm
