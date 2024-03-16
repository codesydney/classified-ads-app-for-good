import { FaFacebookSquare } from 'react-icons/fa'
import Logo from '../assets/logo.jpeg'

const Footer = () => {
  const year = new Date().getFullYear()

  return (
    <footer className="footer footer-center p-5 bg-white text-primary-content border-t-2 border-primary">
      <aside>
        <img
          src={Logo}
          alt="UST Alumnai Australia Logo"
          width="180"
          height="180"
        />
        <p className="font-bold">Connecting Thomasians Down Under</p>
        <p>Copyright © {year} - All right reserved</p>
        <p className="mt-[5px]">
          Web Development by{' '}
          <a href="https://www.code.sydney/" className="hover:text-primary">
            Code.Sydney
          </a>
        </p>
      </aside>
      <nav>
        <div className="grid grid-flow-col gap-4">
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
