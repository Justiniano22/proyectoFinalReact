import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './pages/Cotizador' // Esto está bien, 'App' es tu componente cotizador
import Historial from './pages/Historial'

// NO SE USA createBrowserRouter, PORQUE GIT HUB PAGES TIENE PROBLEMAS A LA HORA DE DEPLOYAR EL PROYECTO
import {
  createHashRouter,
  RouterProvider,
} from "react-router-dom";

// --- CORRECCIÓN DE RUTAS ---
const router = createHashRouter([
  {
    // 1. La ruta raíz (la principal) debe ser "/"
    path: "/",
    element: <App />, // Muestra el cotizador en la página principal
  },
  {
    // 2. La ruta de historial debe ser "/historial"
    path: "/historial",
    element: <Historial />, // Muestra el historial
  },
]); 

// , {
//   basename: "/proyectoFinalReact" 
// }

// 3. Usa el RouterProvider
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)

