import React from 'react'
import ReactDOM from 'react-dom/client'
import Router from './router/Router.jsx'
import './index.css'
import '@fontsource/comfortaa/300.css'
import '@fontsource/comfortaa/400.css'
import '@fontsource/comfortaa/500.css'
import '@fontsource/comfortaa/700.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>,
)
