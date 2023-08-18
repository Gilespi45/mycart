import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/deleteUser.css';
import Swal from 'sweetalert2';

const userApiUrl = 'http://localhost:4000/users';

const DeleteUser = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(userApiUrl, { withCredentials: true });
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users', error);
    }
  };

  const deleteUser = async (userId) => {
    try {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: 'You are about to delete this user.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'Cancel',
      });

      if (result.isConfirmed) {
        await axios.delete(`http://localhost:4000/users/${userId}`, { withCredentials: true });
        fetchUsers();
        Swal.fire('Deleted!', 'The user has been deleted.', 'success');
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled', 'The delete operation was cancelled.', 'error');
      }
    } catch (error) {
      console.error('Error deleting user', error);
      Swal.fire('Error', 'Error deleting user.', 'error');
    }
  };

  return (
    <div className="user-list-container">
      <h1>Delete User</h1>
      <div className="user-cards">
        {users.map((user) => (
          <div className="user-card" key={user._id}>
            <p>Name: {user.name}</p>
            <p>Age: {user.age}</p>
            <p>Gender: {user.gender}</p>
            <p>Email: {user.email}</p>
            <p>Address: {user.address.city}, {user.address.street}</p>
            <button onClick={() => deleteUser(user._id)}>Delete User</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DeleteUser;
