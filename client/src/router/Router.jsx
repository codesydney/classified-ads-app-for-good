import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from '../App'
import Home from '../pages/Home'
import About from '../pages/About'
import Contact from '../pages/Contact'
import Signin from '../pages/Signin'
import Signup from '../pages/Signup'
import RequestPasswordReset from '../pages/RequestPasswordReset'
import ErrorPage from '../pages/Error'

const Router = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <App />,
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: '/about',
          element: <About />,
        },
        {
          path: '/contact',
          element: <Contact />,
        },
        {
          path: '/signin',
          element: <Signin />,
        },
        {
          path: '/signup',
          element: <Signup />,
        },
        {
          path: '/request-reset-password',
          element: <RequestPasswordReset />,
        },
      ],
    },
  ])

  return <RouterProvider router={router} />
}

export default Router
