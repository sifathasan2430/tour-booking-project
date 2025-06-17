import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RouterProvider } from 'react-router'
import router from './routes/router.jsx'
import AuthContextProvider from './Context/AuthContextProvider.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
   <AuthContextProvider>
     <RouterProvider router={router}></RouterProvider>
   </AuthContextProvider>
  </StrictMode>,
)
