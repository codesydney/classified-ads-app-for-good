import ContactForm from '../components/contact/ContactForm'
import contactIllustration from '../assets/contactIllustration.svg'

const Contact = () => {
  return (
    <div className="my-10 flex-grow flex items-center max-w-[1200px] mx-auto">
      <div className="px-4 md:grid md:grid-cols-2 gap-10 lg:gap-20">
        <div className="mb-5">
          <h1 className="text-4xl text-bold text-primary text-center mb-5 md:text-5xl">
            Contact Us
          </h1>
          <p className="text-center mb-10">
            Fill out the form to get in touch with us or email us at
            info@ustaa.org.au.
          </p>
          <img
            src={contactIllustration}
            alt=""
            aria-hidden="true"
            className="md:relative z-[-1]"
          />
        </div>
        <ContactForm />
      </div>
    </div>
  )
}

export default Contact
