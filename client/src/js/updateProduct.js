import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import '../css/updateProduct.css';

const UpdateProduct = () => {
  const [products, setProducts] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [updatedName, setUpdatedName] = useState('');
  const [updatedPrice, setUpdatedPrice] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);
  const productApiUrl = 'https://mycart-vercel-api.vercel.app/products';

  const fetchProducts = async () => {
    try {
      const response = await axios.get(productApiUrl);
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const openModal = (product) => {
    setSelectedProduct(product);
    setUpdatedName(product.name);
    setUpdatedPrice(product.price);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedProduct(null);
    setUpdatedName('');
    setUpdatedPrice('');
    setModalOpen(false);
  };

  const handleUpdateProduct = async () => {
    try {
      const { _id } = selectedProduct;
      const updatedProduct = {
        name: updatedName,
        price: updatedPrice,
      };
      await axios.put(`https://mycart-vercel-api.vercel.app/products/${_id}`, updatedProduct);
      closeModal();
      fetchProducts();
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Product updated successfully',
      });
    } catch (error) {
      console.error('Error updating product:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Error updating product',
      });
    }
  };

  return (
    <>
      <h1>Update Product</h1>
      <div className="update-product-container">
        <table className="product-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product.name}</td>
                <td>${product.price}</td>
                <td>
                  <button onClick={() => openModal(product)}>Update</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {modalOpen && selectedProduct && (
          <div className="modal">
            <div className="modal-content">
              <h2>Update Product</h2>
              <label>
                Name:
                <input
                  type="text"
                  value={updatedName}
                  onChange={(e) => setUpdatedName(e.target.value)}
                />
              </label>
              <label>
                Price:
                <input
                  type="number"
                  value={updatedPrice}
                  onChange={(e) => setUpdatedPrice(e.target.value)}
                />
              </label>
              <button onClick={handleUpdateProduct}>Update</button>
              <button onClick={closeModal}>Cancel</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default UpdateProduct;
