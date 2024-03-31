import UserImg from './UserImg'
import { Link } from 'react-router-dom'

const User = ({ user }) => {
  return (
    <div className="self-stretch justify-center flex flex-col max-w-[450px] shadow-lg">
      <UserImg
        fullName={user.fullName}
        alumniProfilePicture={user?.alumniProfilePicture}
      />
      <div className="p-2 px-4 flex flex-col flex-grow">
        <h2 className="font-semibold text-xl mt-2">{user.fullName}</h2>
        {user?.suburb && <h2>{user.suburb}</h2>}

        {user?.education && (
          <div className="mt-[10px]">
            <h2>{user.education.college}</h2>
            <h2>{user.education.course}</h2>
            <h2>{user.education.yearGraduated}</h2>
          </div>
        )}

        {user.service && (
          <div className="mt-[10px] w-[100%] flex flex-wrap mb-[10px]">
            <div
              style={{
                overflowWrap: 'break-word',
                wordWrap: 'break-word',
                hyphens: 'auto',
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-all',
              }}
            >
              <a
                href={`${user.service.serviceUrl}`}
                target="_blank"
                className="hover:underline hover:text-blue-500 flex-wrap text-[12px]"
              >
                {user.service.serviceName}
              </a>
            </div>
          </div>
        )}

        <div className="mt-auto flex gap-4 justify-between w-[100%] md:w-[50%]">
          <Link
            className="py-2 px-4 bg-primary text-white rounded flex-grow text-center border-primary border-2 hover:bg-primary/70 hover:border-transparent]"
            to={`/profile/${user.id}`}
          >
            View Profile
          </Link>
        </div>
      </div>
    </div>
  )
}

export default User
