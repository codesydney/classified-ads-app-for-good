import React from 'react'
import ReactDOM from 'react-dom/client'
import { store } from './store'
import { Provider } from 'react-redux'
import Router from './router/Router.jsx'
import ToasterProvider from './providers/ToasterProvider.jsx'
import AuthProvider from './providers/AuthProvider.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <Provider store={store}>
      <ToasterProvider />
      <AuthProvider>
        <Router />
      </AuthProvider>
    </Provider>
  </>,
)
