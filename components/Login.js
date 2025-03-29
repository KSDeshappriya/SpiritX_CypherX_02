import '../styles/Login.css';
import { useState } from 'react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Login failed');
      }

      const userData = await response.json();
      setSuccess('Login successful!');
      console.log('User data:', userData);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <section className='login'>
      <div className='login-container'>
        <h1 className='login-title'>Login to Your Account</h1>
        <form className='login-form' onSubmit={handleSubmit}>
          <div className='login-field'>
            <label htmlFor='email' className='login-label'>Email</label>
            <input
              type='email'
              id='email'
              className='login-input'
              placeholder='Enter your email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className='login-field'>
            <label htmlFor='password' className='login-label'>Password</label>
            <input
              type='password'
              id='password'
              className='login-input'
              placeholder='Enter your password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type='submit' className='login-button'>Login</button>
        </form>
        <div style={{ color: 'red', fontSize: '14px', marginTop: '10px' }}>
          {error && <p className='login-error'>{error}</p>}
          {success && <p className='login-success'>{success}</p>}
        </div>
        <p className='login-signup-link'>
          Don't have an account? <a href='/signup' className='login-link'>Sign Up</a>
        </p>
      </div>
    </section>
  );
}
