import React, { useState, useEffect } from 'react';
import './AddUserModal.css'; 



const AddUserModal = ({ isOpen, onClose, onAddUser, existingUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [id, setId] = useState(false);


  useEffect (() => {
    if (existingUser) {
      setId(existingUser.id);
      setEmail(existingUser.email);
      setName(existingUser.ime);
      setSurname(existingUser.prezime);
      setIsAdmin(existingUser.administrator);
      setPassword('');
    }
     else {
      setEmail('');
      setName('');
      setSurname('');
      setIsAdmin(false);
      setPassword('');
      }
  },
      [existingUser,isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = {id, email, password, name, surname, isAdmin };
    onAddUser(newUser);
    setEmail('');
    setPassword('');
    setName('');
    setSurname('');
    setIsAdmin(false);
    onClose(); 
  };
  

  if (!isOpen) return null;

  return (  
    <div className="modal-overlay">
      <div className="modal">
      <h2>{existingUser ? 'Edit User' : 'Add User'}</h2>
        <form onSubmit={handleSubmit}>
          <div className = "flex justify-between">
            <label>Email: </label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className = "flex justify-between">
            <label>Password: </label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required={!existingUser} />
          </div>
          <div className = "flex justify-between">
            <label>Name: </label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div className = "flex justify-between">
            <label>Surname: </label>
            <input type="text" value={surname} onChange={(e) => setSurname(e.target.value)} required />
          </div>
          <div className = "flex justify-between">
            <label>
            Administrator
            </label>
              <input type="checkbox" checked={isAdmin} onChange={() => setIsAdmin(!isAdmin)} />
             
          </div>
          <button type="submit">{existingUser ? 'Update User' : 'Add User'}</button>
          <button type="button" onClick={onClose}>Close</button>
        </form>
      </div>
    </div>
  );
};

export default AddUserModal;
