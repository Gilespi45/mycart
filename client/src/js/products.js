import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/buyproduct.css';
import Swal from 'sweetalert2';

const productApiUrl = 'https://mycart-vercel-api.vercel.app/products';
const userApiUrl = 'https://mycart-vercel-api.vercel.app/users';
const purchaseApiUrl = 'https://mycart-vercel-api.vercel.app/purchases';

function Products() {
  const [products, setProducts] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState('');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchProducts();
    fetchUsers();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(productApiUrl);
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get(userApiUrl);
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleBuyNow = async (productId) => {
    if (!selectedUserId) {
      Swal.fire('Error', 'Please select a user before buying.', 'error');
      return;
    }

    try {
      await axios.post(purchaseApiUrl, {
        user_id: selectedUserId,
        product_id: productId,
      });
      Swal.fire('Success', 'Product purchased successfully.', 'success');
    } catch (error) {
      console.error('Error purchasing product:', error);
      Swal.fire('Error', 'Error purchasing product.', 'error');
    }
  };

  return (
    <div>
      <h1>Buy Products</h1>
      <div className="cards">
        {products.map((product) => (
          <div className='card' key={product._id}>
            <div>
              <img src={`https://mycart-vercel-api.vercel.app/static/img/${product.image}`} alt={product.name} />
              <h3>{product.name}</h3>
              <p>Price: {product.price}</p>
              <select
                value={selectedUserId}
                onChange={(e) => setSelectedUserId(e.target.value)}
              >
                <option value="">Select User</option>
                {users.map((user) => (
                  <option key={user._id} value={user._id}>
                    {user.name}
                  </option>
                ))}
              </select>
              <button type="submit" onClick={() => handleBuyNow(product._id)}>
                Buy Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;
