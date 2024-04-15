import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { contactFormSchema } from '../../schema'
import InputGroup from '../profile/InputGroup'
import FormButton from '../profile/FormButton'
import emailjs from '@emailjs/browser'

const ContactForm = () => {
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const {
    register,
    handleSubmit,
    reset,
    setFocus,
    formState: { errors },
  } = useForm({ resolver: yupResolver(contactFormSchema) })

  // Email js required 3rd param to be html form el
  const onSubmit = async (formData, event) => {
    const formEl = event.target
    try {
      setIsLoading(true)

      await emailjs.sendForm('service_yyexm0g', 'template_rl4e2gy', formEl, {
        publicKey: 'user_nEmQ6yi4aBPvlCKCkUAfK',
      })

      setErrorMessage('')
      setSuccessMessage('You will hear from our team shortly.')
    } catch (error) {
      console.error(error)
      setErrorMessage('Oops! We could not send you message. Try again later')
      setSuccessMessage('')
    } finally {
      setIsLoading(false)
      reset()
    }
  }
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-[8px] w-full max-width-[600px] max-auto"
    >
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
      {successMessage && (
        <div role="alert" className="alert alert-success my-[12px] text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-6 cursor-pointer"
            fill="none"
            viewBox="0 0 24 24"
            onClick={() => setSuccessMessage('')}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{successMessage}</span>
        </div>
      )}
      <InputGroup
        name="name"
        label="Name"
        type="text"
        errors={errors}
        register={register}
        setFocus={setFocus}
        // tooltip="A first name will be sufficient"
      />
      <InputGroup
        name="email"
        label="Email"
        type="email"
        errors={errors}
        register={register}
        setFocus={setFocus}
        tooltip="Provide your email so we can get back to you."
      />
      <InputGroup
        name="message"
        label="Message"
        type="textarea"
        errors={errors}
        register={register}
        tooltip=""
        setFocus={setFocus}
      />
      <FormButton isLoading={isLoading} isDirty={true}>
        Contact Us
      </FormButton>
    </form>
  )
}

export default ContactForm
