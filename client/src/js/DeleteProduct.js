import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/deleteproduct.css'
import Swal from 'sweetalert2';

const productApiUrl = 'https://mycart-api.vercel.app/products';

const DeleteProduct = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(productApiUrl);
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      await axios.delete(`http://localhost:4000/products/${productId}`);
      fetchProducts();
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Product deleted successfully',
      });
      console.log('Product deleted successfully');
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Error deleting product',
      });
      console.error('Error deleting product:', error);
    }
  };

  return (
    <>
      <h1>Delete Product </h1>
    <div className='product-list-container '>
   
      
      {products.map((product) => (
        <div className='card'>
        <div key={product._id}>
          <p>Name: {product.name}</p>
          <p>Price: ${product.price}</p>
          <button onClick={() => handleDeleteProduct(product._id)}>
            Delete Product
          </button>
    
        </div>
        </div>
      ))}
    </div>
    </>
  );
};

export default DeleteProduct;
