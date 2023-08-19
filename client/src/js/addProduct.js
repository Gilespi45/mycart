import React, { useState } from 'react';
import axios from 'axios';
import '../css/addproduct.css'
import Swal from 'sweetalert2';


const productApiUrl = 'https://mycart-api.vercel.app/products';

const AddProduct = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price);
    formData.append('image', image);

    try {
      await axios.post(productApiUrl, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }, { withCredentials: true });

      // Clear form fields
      setName('');
      setPrice('');
      setImage(null);
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Product added successfully',
      });
      console.log('Product added successfully');
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Error adding product',
      });
      console.error('Error adding product:', error);
    }
  };

  return (
   
    <div className='add-pro-container'>
      <h1>Add Product</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" value={name} onChange={handleNameChange} />
        </label>
        <br /><br/>
        <label>
          Price:
          <input type="number" value={price} onChange={handlePriceChange} />
        </label>
        <br /><br/>
        <label>
          Image:        <br /><br/>
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </label>
        <br />        <br /><br/>
        <button type="submit" id='adduserbtn'>Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;
