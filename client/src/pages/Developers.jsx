import devs from '../assets/developers/developers.json'
import { Link } from 'react-router-dom'
import { FaLinkedin, FaGithub } from 'react-icons/fa'

const Developers = () => {
  const linkedinUrl = 'https://www.linkedin.com/in/'
  const githubUrl = 'https://www.github.com/'

  return (
    <div>
      <h1 className="text-4xl text-bold text-primary text-center mb-5 md:text-5xl">
        Code.Sydney Developers
      </h1>
      <div className="container mx-auto">
        {devs.map(dev => (
          <div className="flex">
            <div className="flex-auto w-1/3">
              <img
                src={dev.photoSrc}
                alt={`${dev.name} photo`}
                className="w-[320px] h-[320px]"
              />
            </div>
            <div className="flex-auto w-2/3">
              <div className="flex">
                <div>{dev.name}</div>
                <Link to={linkedinUrl + dev.linkedin} target="_blank">
                  <FaLinkedin size="1.5em" />
                </Link>
                <Link to={githubUrl + dev.github} target="_blank">
                  <FaGithub size="1.5em" />
                </Link>
              </div>
              <div>{dev.role}</div>
              {dev.skills.map(skill => (
                <div className="px-4 py-2 font-semibold text-sm bg-cyan-500 text-white rounded-full shadow-sm">
                  {skill}
                </div>
              ))}
              <div>{dev.blurb}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Developers
