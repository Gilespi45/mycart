import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/userlist.css'

function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);
  const userApiUrl = 'https://mycart-vercel-api.vercel.app/users';

  const fetchUsers = async () => {
    try {
      const response = await axios.get(userApiUrl,{withCredentials: true});
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  return (
    <div className="users-container">
      <h1>Users</h1>
      <div className="user-cards">
        {users.map((user) => (
          <div className="user-card" key={user._id}>
            <h3>{user.name}</h3>
            <p>Age: {user.age}</p>
            <p>Email: {user.email}</p>
            <p>Address: {user.address.street}, {user.address.city}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Users;
