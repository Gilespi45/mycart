import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/purchase.css'

function Purchases() {
  const [purchases, setPurchases] = useState([]);
  const [users, setUsers] = useState({});
  const [products, setProducts] = useState({});

  useEffect(() => {
    fetchPurchases();
  }, []);

  const fetchPurchases = async () => {
    try {
      const response = await axios.get('http://localhost:4000/purchases');
      setPurchases(response.data);
    } catch (error) {
      console.error('Error fetching purchases:', error);
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const userIds = purchases.map((purchase) => purchase.user_id);
      try {
        const response = await axios.get('http://localhost:4000/users', {
          params: { ids: userIds },
        });
        const userMap = response.data.reduce((map, user) => {
          map[user._id] = user.name;
          return map;
        }, {});
        setUsers(userMap);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    const fetchProductData = async () => {
      const productIds = purchases.map((purchase) => purchase.product_id);
      try {
        const response = await axios.get('http://localhost:4000/products', {
          params: { ids: productIds },
        });
        const productMap = response.data.reduce((map, product) => {
          map[product._id] = product.name;
          return map;
        }, {});
        setProducts(productMap);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchUserData();
    fetchProductData();
  }, [purchases]);

  return (
    <div className="purchases-container">
      <h1>Purchases list</h1>
      <div className="purchases-list">
        {purchases.map((purchase) => (
          <div className="purchase-card" key={purchase._id}>
            <h3>Name: {users[purchase.user_id]}</h3>   
                   
            <p>Product: {products[purchase.product_id]}</p>
            <p>Purchase Date: {new Date(purchase.purchase_date).toDateString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Purchases;
