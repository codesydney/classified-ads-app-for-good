import { Link, useRouteError } from 'react-router-dom'
import pageNotFound from '../../assets/pageNotFound.svg'
import unknownError from '../../assets/unknownError.svg'

const ErrorComponent = ({ error }) => {
  const errorRouter = useRouteError()
  const is404Error = errorRouter?.status === 404 ? true : false

  return (
    <div className="flex items-center justify-center flex-col h-screen p-4 max-w-2xl mx-auto">
      <img
        src={is404Error ? pageNotFound : unknownError}
        alt="error illustration"
        className="mb-8 w-full"
      />
      <h1 className="text-primary text-4xl text-bold mb-16">
        {is404Error ? 'Page Not Found' : 'Ooops! An Error has occured'}
      </h1>
      <Link
        to="/"
        className="py-2 px-4 bg-primary text-white rounded text-center border-primary border-2 hover:bg-primary/70 hover:border-transparent"
      >
        Go Home
      </Link>
    </div>
  )
}

export default ErrorComponent
