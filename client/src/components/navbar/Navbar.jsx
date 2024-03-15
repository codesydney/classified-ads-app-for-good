import Container from '../Container.jsx'
import Logo from './Logo.jsx'

const Navbar = () => {
  return (
    <div className="fixed w-full bg-white z-10 shadow-sm">
      <div className="py-4 border-b-[1px]">
        <Container>
          <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
            <Logo width={'150px'} height={'150px'} />
          </div>
        </Container>
      </div>
    </div>
  )
}

export default Navbar
