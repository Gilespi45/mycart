import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AddUser from './addUser';
import AddProduct from './addProduct';
import Users from './users';
import Navbar from './navbar';
import UpdateProduct from './updateProduct';
import Purchases from './purchases';
import Products from './products';
import DeleteProduct from './DeleteProduct';
import DeleteUser from './deleteUser.js';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<Navbar />}>
            <Route path="add_user" element={<AddUser />} />
            <Route path="add_product" element={<AddProduct />} />
            <Route path="delete_product" element={<DeleteProduct />} />
            <Route path="delete_user" element={<DeleteUser />} />
            <Route path="purchases" element={<Purchases />} />
            <Route path="products" element={<Products />} />
            <Route path="update_product" element={<UpdateProduct />} />
            <Route path="users" element={<Users />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
