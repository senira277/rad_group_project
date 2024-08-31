import React, { useState } from 'react';
import '../Styles/NewsLetter.css';

const NewsLetter = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubscribe = () => {
    if (!email) {
      setError('Email is required');
      return;
    }
    
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setError(''); // Clear any existing error

    // Here, you would typically send the email to your backend for processing.
    console.log('Subscribed with:', email);

    // Reset the email input after submission
    setEmail('');
  };

  return (
    <div className='newsletter'>
        <h1>Get Exclusive Offers On Your Email</h1>
        <p>Subscribe to our newsletter and stay updated</p>
        <div>
            <input 
              type="email" 
              placeholder='Your Email id' 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
            />
            <button onClick={handleSubscribe}>Subscribe</button>
        </div>
        {error && <p className="error">{error}</p>}
    </div>
  );
}

export default NewsLetter;
