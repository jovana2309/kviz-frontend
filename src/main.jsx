import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './pages/App.jsx'
import Leaderboard from './pages/Leaderboard.jsx'
// import Login from './pages/Login.jsx'
// import Register from './pages/Register.jsx'
// import Game from './pages/Game.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter ([
  {
    path: "/",
    element: <App />
  },
 
  {
    path: "/leaderboard",
    element: <Leaderboard />
  },

  // {path: "/login",
  //   element: <Login />
  // },

  // {
  //   path: "/register",
  //   element: <Register />
  // },

  // {
  //   path: "/play",
  //   element: <Game />
  // }

])




ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>
)
