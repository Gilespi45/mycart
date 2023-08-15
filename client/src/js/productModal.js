import React, { useState } from 'react';

const ProductModal = ({ product, onUpdate, onClose }) => {
  const [updatedProduct, setUpdatedProduct] = useState({
    _id: product._id,
    name: product.name,
    price: product.price,
  });

  const handleInputChange = (e) => {
    setUpdatedProduct((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(updatedProduct);
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Edit Product</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={updatedProduct.name}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Price:
            <input
              type="number"
              name="price"
              value={updatedProduct.price}
              onChange={handleInputChange}
            />
          </label>
          <button type="submit">Update</button>
          <button onClick={onClose}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default ProductModal;
