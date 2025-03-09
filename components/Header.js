import Link from 'next/link';
import '../styles/Header.css';

export default function Header() {
  return (
    <header className='header'>
      <div className='header-logo'>
        <span className='header-logo-text'>Fantasy Cricket</span>
      </div>
      <nav className='header-nav'>
        <Link href='#' className='header-nav-link'>Features</Link>
        <Link href='#' className='header-nav-link'>How It Works</Link>
        <Link href='#' className='header-nav-link'>Leaderboard</Link>
      </nav>
      <div className='header-buttons'>
        <Link href='/login'><button className='header-login'>Login</button></Link>
        <Link href='/signup'><button className='header-signup'>Sign Up</button></Link>
      </div>
    </header>
  );
}
