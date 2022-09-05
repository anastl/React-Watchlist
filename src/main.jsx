import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import ReactDOM from 'react-dom/client'
import App from './App'
import { ContextProvider } from './Context/watchlistContext'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <ContextProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ContextProvider>
)
