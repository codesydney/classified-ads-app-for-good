import { Link } from 'react-router-dom'
const About = () => {
  return (
    <div>
      <h1>About</h1>
      <Link to="/account">go to account</Link>
      <p>This is the about page.</p>
    </div>
  )
}

export default About
