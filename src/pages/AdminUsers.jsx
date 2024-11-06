import Adminsidebar from "../components/Adminsidebar";
import './AdminUsers.css';
import axiosInstance from "../services/axios";
import { useState, useEffect, useRef } from "react";
import AddUserModal from './AddUserModal';
import ErrorMessage from "./Error.jsx";


const AdminUsers = () => {

  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
  
    const fetchAllUsers = async () => {
      try {
        const response = await axiosInstance.get("/admin/users")
        setData(response.data);
      } catch (error) { 
        setError(error.message);  
      } finally {
        setLoading(false);
      }  
    };

    fetchAllUsers();
  }, []); 

  const deleteUser = async (id) => {
    try {
      const promptUser = confirm (
        "Are you sure you want to delete the user?"
      )
      if (promptUser) { 
     const response = await axiosInstance.delete(`/admin/deleteUser/${id}`);
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

  const addUser = async (newUser) => {
    try {
      const response = await axiosInstance.post('/admin/addUser', newUser);
      console.log(response.status)
      if (response.status === 201) {
        setData((prevData) => [...prevData, response.data]); 
      }
    } catch (err) {
      console.log(err)
      setError(err.response.data.message ? err.response.data.message : err.message);
      setTimeout(() => {
          setError(false);
      }, 5000);
  }
  };


  const editUser = async (editingUser) => {
    try {
      const response = await axiosInstance.put(`/admin/editUser/${editingUser.id}`, editingUser);
      if (response.status === 200) {
        setData((prevData) => prevData.map(user => (user.id === editingUser.id ? {id:editingUser.id, ime: editingUser.name, prezime: editingUser.surname, email:editingUser.email,  administrator: editingUser.isAdmin} : user )));
      }
    } catch (err) {
      console.log(err)
      setError(err.response.data.message ? err.response.data.message : err.message);
      setTimeout(() => {
          setError(false);
      }, 5000);
  }
  };

  const handleEditClick = (user) => {
    setEditingUser(user);
    setIsModalOpen(true);
  }

  
  const Rows =   (data.map(user => (
    <tr key = {user.id}>
      <td> {user.administrator ? 'Yes' : 'No'} </td>
      <td> {user.email} </td>
      <td> {user.ime} {user.prezime}</td>
      <td>  
        <button className = "e-button" onClick={() => handleEditClick(user)}>Edit</button>
        <button onClick={() => deleteUser(user.id)} className = "e-button">Delete</button>
      </td>
    </tr>
  ) 

  ) );

    return (
        <>
        <div className="flex flexx">
        <Adminsidebar active = "users" />
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <div className="table-container">
        <button className = "ev" onClick={() => { setEditingUser(null); setIsModalOpen(true); }}>Add User</button>
        <AddUserModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} 
            onAddUser={editingUser ? editUser : addUser} 
            existingUser={editingUser}/>
        <table>
		<thead>
			<tr>
        <th>Admin</th>
				<th>Email</th>
				<th>Name</th>
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
   
   export default AdminUsers;