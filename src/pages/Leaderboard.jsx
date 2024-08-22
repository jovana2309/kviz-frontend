import {useState, useEffect} from 'react'
import axiosInstance from '../services/axios';

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
  console.log(data)
    return (
      <div>
        <h1>Leaderboard</h1>
        <ul>
          {data.map((item, index) => (
            <li key={index}>
              {index + 1}. {item.name} - {item.score}
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default Leaderboard;