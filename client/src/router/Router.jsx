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
import ProfileLayout from '../components/profile/ProfileLayout.jsx'
import ProfileGeneral from '../components/profile/general/ProfileGeneral.jsx'
import ProfileService from '../components/profile/service/ProfileService.jsx'
import ProfileEducation from '../components/profile/education/ProfileEducation.jsx'
import ProfileSettings from '../components/profile/settings/ProfileSettings.jsx'
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
        // {
        //   path: '/profile/me',
        //   element: <ProtectedRoute />,
        //   children: [
        //     {
        //       index: true,
        //       element: <MyProfile />,
        //     },
        //   ],
        // },
        {
          path: '/profile/me',
          element: (
            <ProtectedRoute>
              <MyProfile />
            </ProtectedRoute>
          ),
        },
        {
          path: '/profile',
          element: (
            <ProtectedRoute>
              <ProfileLayout />
            </ProtectedRoute>
          ),
          children: [
            {
              index: true,
              element: <ProfileGeneral />,
            },
            {
              path: '/profile/service',
              element: <ProfileService />,
            },
            {
              path: '/profile/education',
              element: <ProfileEducation />,
            },
            {
              path: '/profile/settings',
              element: <ProfileSettings />,
            },
          ],
        },
      ],
    },
  ])

  return <RouterProvider router={router} />
}

export default Router
