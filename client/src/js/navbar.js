import React from 'react';
import '../css/navbar.css'
import { Link, Outlet } from 'react-router-dom';

const Navbar = () => {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link  to="/add_user" style={{textDecoration:"none"}}>Add User</Link>
          </li>
          <li>
            <Link to="/add_product" style={{textDecoration:"none"}}>Add Product</Link>
          </li>
          <li>
            <Link to="/products" style={{textDecoration:"none"}}>Show Products</Link>
          </li>
          
          <li>
            <Link to="/delete_product" style={{textDecoration:"none"}}>Delete Product</Link>
          </li>
          <li>
            <Link to="/delete_user" style={{textDecoration:"none"}}>Delete User</Link>
          </li>
          <li>
            <Link to="/purchases" style={{textDecoration:"none"}}>Purchases</Link>
          </li>
         
          <li>
            <Link to="/update_product" style={{textDecoration:"none"}}>Update Product</Link>
          </li>
          <li>
            <Link to="/users" style={{textDecoration:"none"}}>User List</Link>
          </li>
        </ul>
      </nav>
      <Outlet />
    </>
  );
};

export default Navbar;
