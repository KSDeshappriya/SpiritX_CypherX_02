import '../styles/SignUp.css';

export default function SignUp() {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Sign Up submitted');
  }; 

  return (
    <section className='signup'>
      <div className='signup-container'>
        <h1 className='signup-title'>Create Your Account</h1>
        <form className='signup-form' onSubmit={handleSubmit}>
          <div className='signup-field'>
            <label htmlFor='name' className='signup-label'>Name</label>
            <input type='text' id='name' className='signup-input' placeholder='Enter your name' required />
          </div>
          <div className='signup-field'>
            <label htmlFor='email' className='signup-label'>Email</label>
            <input type='email' id='email' className='signup-input' placeholder='Enter your email' required />
          </div>
          <div className='signup-field'>
            <label htmlFor='password' className='signup-label'>Password</label>
            <input type='password' id='password' className='signup-input' placeholder='Enter your password' required />
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