import React, { useState } from 'react';
import '../styles/Addproducts.css';
import upload_area from '../assets/upload_area.svg';

const Addproduct = () => {
  const [image, setImage] = useState(false);

  const [productDetails, setProductDetails] = useState({
    name: "",
    image: "",
    category: "women",
    new_price: "", // Updated field name
    old_price: ""  // Updated field name
  });

  const imageHandler = (e) => {
    setImage(e.target.files[0]);
  };

  const changeHandler = (e) => {
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
  };

  const Add_Product = async () => {
    console.log(productDetails);
    let responseData;
    let product = productDetails;

    let formData = new FormData();
    formData.append('product', image);

    try {
      // Upload the image
      const response = await fetch('http://localhost:5000/upload', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
        body: formData,
      });

      responseData = await response.json();

      if (responseData.success) {
        product.image = responseData.image_url;
        console.log(product);

        // Add the product with the uploaded image URL
        const productResponse = await fetch('http://localhost:5000/addproduct', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(product),
        });

        const productData = await productResponse.json();

        if (productData.success) {
          alert("Product Added Successfully!");
        } else {
          alert("Failed to Add Product");
        }
      } else {
        alert("Image Upload Failed");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while adding the product.");
    }
  };

  return (
    <div className='add-products'>
      <div className='addproduct-itemfield'>
        <p>Product Title</p>
        <input
          value={productDetails.name}
          onChange={changeHandler}
          type="text"
          name='name'
          placeholder='Type here'
        />
      </div>
      <div className='addproduct-price'>
        <div className='addproduct-itemfield'>
          <p>Price</p>
          <input
            value={productDetails.old_price}  // Updated field name
            onChange={changeHandler}
            type="text"
            name='old_price'  // Updated field name
            placeholder='Type here'
          />
        </div>
        <div className='addproduct-itemfield'>
          <p>Offer Price</p>
          <input
            value={productDetails.new_price}  // Updated field name
            onChange={changeHandler}
            type="text"
            name='new_price'  // Updated field name
            placeholder='Type here'
          />
        </div>
        <div className='addproduct-itemfield'>
          <p>Product Category</p>
          <select
            value={productDetails.category}
            onChange={changeHandler}
            name="category"
            className='add-product-selector'
          >
            <option value="women">Women</option>
            <option value="men">Men</option>
            <option value="kid">Kid</option>
          </select>
        </div>
        <div className='addproduct-itemfield'>
          <label htmlFor='file-input'>
            <img
              src={image ? URL.createObjectURL(image) : upload_area}
              className='addproduct_thumnail-img'
              alt=""
            />
          </label>
          <input onChange={imageHandler} type='file' name='image' id='file-input' hidden />
        </div>
        <button onClick={Add_Product} className='addproduct-btn'>ADD</button>
      </div>
    </div>
  );
}

export default Addproduct;
