import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from '../App'
import Home from '../pages/Home'
import About from '../pages/About'
import Contact from '../pages/Contact'
import Login from '../pages/Login.jsx'
import Signup from '../pages/Signup'
import RequestPasswordReset from '../pages/RequestPasswordReset'
import ErrorPage from '../pages/Error'
import ResetPassword from '../pages/ResetPassword'

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
          path: '/login',
          element: <Login />,
        },
        {
          path: '/signup',
          element: <Signup />,
        },
        {
          path: '/request-reset-password',
          element: <RequestPasswordReset />,
        },
        {
          path: '/reset-password',
          element: <ResetPassword />,
        },
      ],
    },
  ])

  return <RouterProvider router={router} />
}

export default Router
