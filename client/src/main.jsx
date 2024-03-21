import React from 'react'
import ReactDOM from 'react-dom/client'
import { store } from './store'
import { Provider } from 'react-redux'
import Router from './router/Router.jsx'
import ToasterProvider from './providers/ToasterProvider.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <ToasterProvider />
      <Router />
    </Provider>
  </React.StrictMode>,
)
