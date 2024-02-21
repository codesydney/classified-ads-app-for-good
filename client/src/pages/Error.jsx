import { useRouteError, Link } from 'react-router-dom'

const ErrorPage = () => {
  const error = useRouteError()
  console.error(error)
  return (
    <div>
      <h1>Ooops! An Error has occured</h1>
      <p>
        {error.status}: {error.statusText || error.message}
      </p>
      <Link to="/">Go Home</Link>
    </div>
  )
}

export default ErrorPage
