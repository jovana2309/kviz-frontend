import {useState, useEffect} from 'react'
import axiosInstance from '../services/axios';
import "./Leaderboard.css";
import TitleWithBackButton from '../components/TitleWithBackButton';

const Leaderboard = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
    
      const fetchLeaderboardData = async () => {
        try {
          const response = await axiosInstance.get("/top-results")
         
          setData(response.data);
        } catch (error) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };
  
      fetchLeaderboardData();
    }, []); // 
  
    if (loading) {
      return <div>Loading...</div>;
    }
  
    if (error) {
      return <div>Error: {error}</div>;
    }
  const rows = data.map((object,index) =>(
    <tr key = {object.id}>
      <td>{index+1}</td>
      <td>{object.ime} {object.prezime} </td>
      <td>{new Date(object.datum).toLocaleDateString("sr-SR")}</td>
      <td>{object.rezultat}</td>
    </tr>
  ))
    return (
       
      <div style={{height:"100vh"}}>
        <TitleWithBackButton title="Leaderboard" />
        <div style = {{height: "70%"}} className = "flex-column justify-center">
        <nav className = "st">
          <div className = "sta">   
        <h2> Standings </h2>
        </div>
        
        </nav>
        <table className = "tab">
  <thead>
    <tr>
      <th>Rank</th>
      <th>Name</th>
      <th>Date</th>
      <th>Correct Answers</th>
    </tr>
    </thead>
    <tbody>
    {rows}
   
    </tbody>
</table>
</div>
      </div>
    );
  };


  
  export default Leaderboard;