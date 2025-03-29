import { useState, useEffect } from 'react';
import '../styles/UserProfile.css';

export default function UserProfile() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [token, setToken] = useState('');

  useEffect(() => {
    // Get token from local storage
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await fetch('/api/user/profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Profile update failed');
      }

      const userData = await response.json();
      setSuccess('Profile updated successfully!');
      setName(userData.name);
      setEmail(userData.email);
      setPassword(''); // Clear password field after successful update
      console.log('User data:', userData);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <section className='user-profile'>
      <div className='user-profile-container'>
        <h1 className='user-profile-title'>Update Your Profile</h1>
        <form className='user-profile-form' onSubmit={handleSubmit}>
          <div className='user-profile-field'>
            <label htmlFor='name' className='user-profile-label'>Name</label>
            <input
              type='text'
              id='name'
              className='user-profile-input'
              placeholder='Enter your name'
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className='user-profile-field'>
            <label htmlFor='email' className='user-profile-label'>Email</label>
            <input
              type='email'
              id='email'
              className='user-profile-input'
              placeholder='Enter your email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className='user-profile-field'>
            <label htmlFor='password' className='user-profile-label'>Password</label>
            <input
              type='password'
              id='password'
              className='user-profile-input'
              placeholder='Enter your new password (optional)'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type='submit' className='user-profile-button'>Update Profile</button>
        </form>
        <div style={{ color: 'red', fontSize: '14px', marginTop: '10px' }}>
          {error && <p className='user-profile-error'>{error}</p>}
          {success && <p className='user-profile-success'>{success}</p>}
        </div>
      </div>
    </section>
  );
}
