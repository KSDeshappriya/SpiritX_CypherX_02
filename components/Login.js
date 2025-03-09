
import '../styles/Login.css';

export default function Login() {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login submitted');
  };

  return (
    <section className='login'>
      <div className='login-container'>
        <h1 className='login-title'>Login to Your Account</h1>
        <form className='login-form' onSubmit={handleSubmit}>
          <div className='login-field'>
            <label htmlFor='email' className='login-label'>Email</label>
            <input type='email' id='email' className='login-input' placeholder='Enter your email' required />
          </div>
          <div className='login-field'>
            <label htmlFor='password' className='login-label'>Password</label>
            <input type='password' id='password' className='login-input' placeholder='Enter your password' required />
          </div>
          <button type='submit' className='login-button'>Login</button>
        </form>
        <p className='login-signup-link'>
          Don't have an account? <a href='/signup' className='login-link'>Sign Up</a>
        </p>
      </div>
    </section>
  );
}
