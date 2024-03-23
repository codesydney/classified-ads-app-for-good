import {
  createBrowserRouter,
  RouterProvider,
  useRouteError,
} from 'react-router-dom'
import App from '../App'
import ProtectedRoute from './ProtectedRoute.jsx'
import Home from '../pages/Home'
import About from '../pages/About'
import Contact from '../pages/Contact'
import Login from '../pages/Login.jsx'
import Signup from '../pages/Signup'
import RequestPasswordReset from '../pages/RequestPasswordReset'
import ErrorComponent from '../components/errors/ErrorComponent.jsx'
import ResetPassword from '../pages/ResetPassword'
import MyProfile from '../pages/MyProfile.jsx'
import UserProfile from '../pages/UserProfile.jsx'

const Router = () => {
  // const error = useRouteError()
  const router = createBrowserRouter([
    {
      path: '/',
      element: <App />,
      errorElement: <ErrorComponent />,
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
        {
          path: '/profile/me',
          element: <ProtectedRoute />,
          children: [
            {
              index: true,
              element: <MyProfile />,
            },
          ],
        },
        {
          path: '/profile/:userId',
          element: <UserProfile />,
        },
      ],
    },
  ])

  return <RouterProvider router={router} />
}

export default Router
