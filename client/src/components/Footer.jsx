import { FaFacebookSquare } from 'react-icons/fa'
import Logo from '../assets/logo.jpeg'
import PrivacyPolicy from '../assets/pdf/USTAA_Privacy_Policy.pdf'
import Terms from '../assets/pdf/USTAA_Terms.pdf'

const Footer = () => {
  const year = new Date().getFullYear()

  return (
    <footer className="footer footer-center p-5 bg-white text-primary-content border-t-2 border-primary">
      <aside>
        <img
          src={Logo}
          alt="UST Alumnai Australia Logo"
          className="w-[120px] h-[70px]"
        />
        <p className="font-bold">Connecting Thomasians Down Under</p>
        <p>Copyright © {year} - All rights reserved</p>

        <div>
          <a
            href={PrivacyPolicy}
            className="hover:text-primary hover:underline"
            target="_blank"
          >
            Privacy Policy 2024
          </a>{' '}
          |{' '}
          <a
            href={Terms}
            className="hover:text-primary hover:underline"
            target="_blank"
          >
            Terms 2024
          </a>
        </div>

        <p className="mt-[5px]">
          Web Development by{' '}
          <a
            href="https://www.code.sydney/"
            className="hover:text-primary hover:underline"
            target="_blank"
          >
            Code.Sydney
          </a>
        </p>
      </aside>
      <nav>
        <div className="grid grid-flow-col mt-[-20px]">
          <a
            className="cursor-pointer"
            href="https://www.facebook.com/USTAlumniAustralia"
            target="_blank"
          >
            <FaFacebookSquare size={30} color={'#3b5998'} />
          </a>
        </div>
      </nav>
    </footer>
  )
}

export default Footer
