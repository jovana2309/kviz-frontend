import { useEffect, useState } from 'react'
import './App.css'
import { Link } from 'react-router-dom'
import {jwtDecode} from 'jwt-decode'
function App() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const token =localStorage.getItem("authToken");
    if(token) {
      const user = jwtDecode(token);
      if(user.exp > Date.now() / 1000) {
        setUser(user);
      } else {
        localStorage.removeItem("authToken");
      }
    }
  }, [])

  const Plays = user ? "Play" : "Login"; 
  return (
   <>
    <h2 className="title mt-50">Main Menu</h2>
    <ul className="main-menu">
      {user && user.isAdmin ? (
        <li>
          <Link to = "/admin/users">Admin</Link>
        </li>
      ) : ""}
      <li className="login"><Link to={Plays.toLowerCase()}>{Plays}</Link></li>
      <li><Link to={"/leaderboard"}>Leaderboard</Link></li>
   </ul>

 </>
  )
}

export default App
