import ContactForm from '../components/contact/ContactForm'
import contactIllustration from '../assets/contactIllustration.svg'

const Contact = () => {
  return (
    <div className="my-10 flex-grow flex items-center">
      <div className="px-4 max-w-{1200px] mx-auto md:grid md:grid-cols-2">
        <div className="mb-5">
          <h1 className="text-4xl text-bold text-primary text-center mb-5">
            Contact Us
          </h1>
          <p className="text-center mb-10">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores
            omnis cum harum aliquid qui perspiciatis. Dolor voluptate odit
            mollitia nostrum aliquid dignissimos officia at et.
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
