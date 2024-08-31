import React, { useEffect, useState } from 'react';
import '../styles/ListProduct.css';
import cross_icon from '../assets/cross_icon.png';

const ListProduct = () => {
  const [allproducts, setAllProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchInfo = async () => {
    try {
      const response = await fetch('http://localhost:5000/allproducts');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log('Fetched products:', data); // Log fetched data
      setAllProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  const removeProduct = async (id) => {
    try {
      const response = await fetch('http://localhost:5000/removeproduct', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });

      const result = await response.json();

      if (result.success) {
        setAllProducts(allproducts.filter((product) => product.id !== id));
        alert('Product removed successfully');
      } else {
        alert('Failed to remove product');
      }
    } catch (error) {
      console.error('Error removing product:', error);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredProducts = allproducts.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className='list-product'>
      <h1>All Product List</h1>
      <div className='search-bar'>
        <input
          type='text'
          placeholder='Search by title...'
          value={searchQuery}
          onChange={handleSearchChange}
          className='search-input'
        />
      </div>
      <div className='listproduct-format-main'>
        <p>Products</p>
        <p>Title</p>
        <p>Old Price</p>
        <p>New Price</p>
        <p>Category</p>
        <p>Remove</p>
      </div>
      <div className='listproduct-allproducts'>
        <hr />
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product, index) => (
            <div key={index} className='listproduct-format-main listproduct-format'>
              <img src={product.image} alt='' className='listproduct-product-icon' />
              <p>{product.name}</p>
              <p>${product.old_price || 'N/A'}</p>
              <p>${product.new_price || 'N/A'}</p>
              <p>{product.category || 'N/A'}</p>
              <img
                className='listproduct-remove-icon'
                src={cross_icon}
                alt='Remove'
                onClick={() => removeProduct(product.id)}
              />
            </div>
          ))
        ) : (
          <p>No products available</p>
        )}
      </div>
    </div>
  );
};

export default ListProduct;
