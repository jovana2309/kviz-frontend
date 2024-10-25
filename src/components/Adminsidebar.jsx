import '../pages/Admin.css';
import { Link } from 'react-router-dom'
import TitleWithBackButton from './TitleWithBackButton.jsx';

const Adminsidebar = ({active}) => {
 return (
    <> 
   
    <nav className = "sidebar">
    <TitleWithBackButton title = "Admin" additionalStyles = {{marginTop: 0,marginBottom: "60px"}}  />
            <ul>
                <li><Link className={active==="questions" ? "active": ""} to="/admin/questions">Questions</Link></li>
                <li><Link className={active==="users" ? "active": ""} to="/admin/users">Users</Link></li>
                <li><Link className={active==="leaderboard" ? "active": ""} to="/admin/leaderboard">Leaderboard</Link></li>
            </ul>
    </nav>
    </>
    )
}

export default Adminsidebar;