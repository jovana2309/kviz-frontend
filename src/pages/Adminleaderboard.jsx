import Adminsidebar from "../components/Adminsidebar";
import './Adminleaderboard.css';
import axiosInstance from "../services/axios";
import { useState, useEffect, useRef } from "react";
import ErrorMessage from "./Error.jsx";


const Adminleaderboard = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
  
    const fetchLeaderboardAdminData = async () => {
      try {
        const response = await axiosInstance.get("/admin/all-results")
       
        setData(response.data);
      } catch (error) { 
        setError(error.message);  
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboardAdminData();
  }, []); 

  const handleDelete = async (id) => {
    try {
      const promptResult = confirm (
        "Are you sure you want to delete the result?"
      )
      if (promptResult) { 
     const response = await axiosInstance.delete(`/admin/delete-result/${id}`);
     if (response.statusText === "OK") { 
      setData((prevData) => prevData.filter((user) => user.id !== id));
    }  
  } 
   }
   catch (err) {
    console.log(err)
    setError(err.response.data.message ? err.response.data.message : err.message);
    setTimeout(() => {
        setError(false);
    }, 5000);
}
  };
 
  const Rows = data.map((result,index ) => (
    <tr key = {result.id}>
      <td>{index+1}</td>
      <td>{result.name}</td>
      <td>{result.result}</td>
      <td>{result.date}</td>
      <td>
        <button onClick={() => handleDelete(result.id)} className="delete-button">
          Delete
        </button>
      </td> 
    </tr> 
  ));

    return (
        <>
        <div className="flex flexx">
        <Adminsidebar active = "leaderboard" />
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <div className="table-container">
	<table>
		<thead>
			<tr>
        <th>Place</th>
				<th>Name</th>
				<th>Result</th>
				<th>Date</th>
        <th>Action</th>
			</tr>
		</thead>
		<tbody>
    {loading ? (
                <tr><td colSpan="5">Loading...</td></tr>
              )  : (
                Rows
              )}
		</tbody>
	</table>
</div>
    </div>
        </>
       )
   }
   
   export default Adminleaderboard;