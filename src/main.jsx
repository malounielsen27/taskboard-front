import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import ContextProvider from '../Context/AppContext.jsx'
import AuthProvider from '../Context/AuthContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
     <AuthProvider>
    <ContextProvider>
    <App />
    </ContextProvider>
    </AuthProvider>
 
  </StrictMode>,
)
