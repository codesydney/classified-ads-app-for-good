import React from 'react'
import ReactDOM from 'react-dom/client'
import Router from './router/Router.jsx'
import ToasterProvider from './providers/ToasterProvider.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ToasterProvider />
    <Router />
  </React.StrictMode>,
)
