import React from 'react'
import ReactDOM from 'react-dom/client'
import Login from './pages/login';
import './styles/index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Registration from './pages/registration';

const router = createBrowserRouter([
  {
    path: "/registration",
    element: <Registration />
  },
  {
    path: "/",
    element: <Login />
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />
)
