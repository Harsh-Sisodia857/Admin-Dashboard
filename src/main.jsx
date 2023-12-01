import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import AdminState from './context/adminState.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <AdminState>
    <App />
  </AdminState>,
)
