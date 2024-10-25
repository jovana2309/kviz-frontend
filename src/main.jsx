import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './pages/App.jsx'
import Leaderboard from './pages/Leaderboard.jsx'
import Login from './pages/Login.jsx'
import SignUp from './pages/SignUp.jsx'
import Game from './pages/Game.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Questions from './pages/Questions.jsx'
import AdminUsers from './pages/AdminUsers.jsx'
import Adminleaderboard from './pages/Adminleaderboard.jsx'


const router = createBrowserRouter ([
  {
    path: "/",
    element: <App />
  },
 
  {
    path: "/leaderboard",
    element: <Leaderboard />
  },

  {path: "/login",
    element: <Login />
  },

  {
    path: "/signup",
    element: <SignUp />
  },

  {
    path: "/play",
    element: <Game />
  },

  {
    path: "/admin/questions",
    element: <Questions />
  },

  {
    path: "/admin/users",
    element: <AdminUsers />
  },
  {
    path: "/admin/leaderboard",
    element: <Adminleaderboard />
  }
])




ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>
)
