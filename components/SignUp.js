import '../styles/SignUp.css';

import '../styles/SignUp.css';
import { useState } from 'react';

export default function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (response.ok) {
        const user = await response.json();
        console.log('User created:', user);
        localStorage.setItem('token', user.token);
        alert('Sign up successful!');
      } else {
        const error = await response.json();
        console.error('Sign up failed:', error);
        alert('Sign up failed: ' + error.error);
      }
    } catch (error) {
      console.error('Sign up error:', error);
      alert('Sign up error: ' + error.message);
    }
  };

  return (
    <section className='signup'>
      <div className='signup-container'>
        <h1 className='signup-title'>Create Your Account</h1>
        <form className='signup-form' onSubmit={handleSubmit}>
          <div className='signup-field'>
            <label htmlFor='name' className='signup-label'>Name</label>
            <input
              type='text'
              id='name'
              className='signup-input'
              placeholder='Enter your name'
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className='signup-field'>
            <label htmlFor='email' className='signup-label'>Email</label>
            <input
              type='email'
              id='email'
              className='signup-input'
              placeholder='Enter your email'
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className='signup-field'>
            <label htmlFor='password' className='signup-label'>Password</label>
            <input
              type='password'
              id='password'
              className='signup-input'
              placeholder='Enter your password'
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type='submit' className='signup-button'>Sign Up</button>
        </form>
        <p className='signup-login-link'>
          Already have an account? <a href='/login' className='signup-link'>Login</a>
        </p>
      </div>
    </section>
  );
}
