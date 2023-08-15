import React, { useState } from 'react';
import axios from 'axios';
import '../css/addUser.css';
import Swal from 'sweetalert2';

const AddUser = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [email, setEmail] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = {
      name,
      age,
      gender,
      email,
      address: {
        street,
        city,
      },
    };

    try {
      await axios.post('http://localhost:4000/users', user);
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'User added successfully',
      });
     
        console.log('User added successfully');
       
        // Clear form fields after successful submission
        setName('');
        setAge('');
        setGender('');
        setEmail('');
        setStreet('');
        setCity('');
     
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Error adding user',
      });
     
    }
  };

  return (
    <div className='container'>
      <h1>Add User</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input type="text" name="name" id="name" value={name} onChange={(e) => setName(e.target.value)} required /><br /><br />

        <label htmlFor="age">Age:</label>
        <input type="number" name="age" id="age" value={age} onChange={(e) => setAge(e.target.value)} required /><br /><br />

        <label htmlFor="gender">Gender:</label>
        <select name="gender" id="gender" value={gender} onChange={(e) => setGender(e.target.value)} required>
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select><br /><br />

        <label htmlFor="email">Email:</label>
        <input type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required /><br /><br />

        <label htmlFor="street">Street:</label>
        <input type="text" name="street" id="street" value={street} onChange={(e) => setStreet(e.target.value)} required /><br /><br />

        <label htmlFor="city">City:</label>
        <input type="text" name="city" id="city" value={city} onChange={(e) => setCity(e.target.value)} required /><br /><br />

        <button type="submit">Add User</button>
      </form>
    </div>
  );
};

export default AddUser;
