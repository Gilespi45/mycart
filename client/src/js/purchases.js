import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/purchase.css'

const productApiUrl = 'https://mycart-api.vercel.app/products';
const userApiUrl = 'https://mycart-api.vercel.app/users';
const purchaseApiUrl = 'https://mycart-api.vercel.app/purchases';

function Purchases() {
  const [purchases, setPurchases] = useState([]);
  const [users, setUsers] = useState({});
  const [products, setProducts] = useState({});

  useEffect(() => {
    fetchPurchases();
  }, []);

  const fetchPurchases = async () => {
    try {
      const response = await axios.get(purchaseApiUrl);
      setPurchases(response.data);
    } catch (error) {
      console.error('Error fetching purchases:', error);
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const userIds = purchases.map((purchase) => purchase.user_id);
      try {
        const response = await axios.get(userApiUrl, {
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
        const response = await axios.get(productApiUrl, {
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
