import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './pages/Cotizador'
import Historial from './pages/Historial'

// NO SE USA createBrowserRouter, PORQUE GIT HUB PAGES TIENE PROBLEMAS A LA HORA DE DEPLOYAR EL PROYECTO
import {
  createHashRouter,
  RouterProvider,
} from "react-router-dom";

const router = createHashRouter([
  {
    path: "/",
    element: <App />, // Muestra el cotizador en la página principal
  },
  {
    path: "/historial",
    element: <Historial />, // Muestra el historial
  },
]); 

// , {
//   basename: "/proyectoFinalReact" 
// }

// Usa el RouterProvider
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)

