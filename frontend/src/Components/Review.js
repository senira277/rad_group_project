import React, { useState } from 'react';
import '../Styles/Review.css';

const Review = () => {
  const [name, setName] = useState('');
  const [rating, setRating] = useState('');
  const [review, setReview] = useState('');
  const [error, setError] = useState('');

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (!name || !rating || !review) {
      setError('Please fill out all fields.');
      return;
    }

    setError(''); // Clear any previous errors

    const reviewData = {
      name,
      rating,
      review,
    };

    // Here you can send the reviewData to a backend server
    console.log('Review submitted:', reviewData);

    // Clear the form fields after submission
    setName('');
    setRating('');
    setReview('');
  };

  return (
    <div className='review-form'>
      <h2>Submit Your Review</h2>
      <form onSubmit={handleFormSubmit}>
        <div className='form-group'>
          <label htmlFor='name'>Name:</label>
          <input 
            type='text' 
            id='name' 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
          />
        </div>
        <div className='form-group'>
          <label htmlFor='rating'>Rating:</label>
          <select 
            id='rating' 
            value={rating} 
            onChange={(e) => setRating(e.target.value)}
          >
            <option value=''>Select Rating</option>
            <option value='5'>5 - Excellent</option>
            <option value='4'>4 - Very Good</option>
            <option value='3'>3 - Good</option>
            <option value='2'>2 - Fair</option>
            <option value='1'>1 - Poor</option>
          </select>
        </div>
        <div className='form-group'>
          <label htmlFor='review'>Review:</label>
          <textarea 
            id='review' 
            rows='4' 
            value={review} 
            onChange={(e) => setReview(e.target.value)} 
          />
        </div>
        {error && <p className="error">{error}</p>}
        <button type='submit'>Submit Review</button>
      </form>
    </div>
  );
};

export default Review;
