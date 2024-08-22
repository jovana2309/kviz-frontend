import { useState } from 'react'
import './App.css'
import { Link } from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)

  return (
   <>
    <h2 className="title">Main Menu</h2>

    <ul className="main-menu">
      <li className="admin">Admin</li>
      <li><Link to={"/leaderboard"}>Leaderboard</Link></li>
   </ul>

 </>
  )
}

export default App
