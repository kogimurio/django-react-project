import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './my-style.module.css';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: '', price: '' });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const res = await axios.get('http://localhost:8000/products/products/');
    setProducts(res.data);
  };

  const addProduct = async () => {
    if (newProduct.name && newProduct.price) {
      try {
        await axios.post('http://localhost:8000/products/products/', newProduct);
        fetchProducts();
        setNewProduct({ name: '', price: '' }); // Reset form
      } catch (error) {
        console.error('Error adding product:', error.response.data);
      }
    } else {
      console.error('Please fill in both the name and price fields');
    }
  };

  const deleteProduct = async (id) => {
    await axios.delete(`http://localhost:8000/products/products/${id}/`);
    fetchProducts();
  };

  const handleInputChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Product List</h1>
      <ul className="list-group mb-4">
        {products.map(product => (
          <li key={product.id} className="list-group-item d-flex justify-content-between align-items-center">
            <span>
              {product.name} - ${product.price}
            </span>
            <div>
              <button onClick={() => deleteProduct(product.id)} className="btn btn-danger btn-sm mx-1">Delete</button>
              <button className="btn btn-warning btn-sm mx-1">Edit</button>
            </div>
          </li>
        ))}
      </ul>
      
      <h3 className="text-center">Add New Product</h3>
      <div className="row g-3">
        <div className="col-md-6">
          <input 
            type="text" 
            name="name" 
            value={newProduct.name} 
            onChange={handleInputChange} 
            className="form-control" 
            placeholder="Product Name" 
          />
        </div>
        <div className="col-md-4">
          <input 
            type="number" 
            name="price" 
            value={newProduct.price} 
            onChange={handleInputChange} 
            className="form-control" 
            placeholder="Product Price" 
          />
        </div>
        <div className="col-md-2">
          <button onClick={addProduct} className="btn btn-primary w-100">Add Product</button>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
