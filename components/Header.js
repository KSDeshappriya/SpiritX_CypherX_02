'use client';
import Link from 'next/link';
import { useState } from 'react';
import '../styles/Header.css';

export default function Header() {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <header className='header'>
      <div className='header-logo'>
        <span className='header-logo-text'>Fantasy Cricket</span>
      </div>
      <button className='hamburger' onClick={toggleNav}>
        =
      </button>
      <nav className={`header-nav ${isNavOpen ? 'active' : ''}`}>
        <Link href='/players' className='header-nav-link'>Players</Link>
        <Link href='/select-team' className='header-nav-link'>Select Your Team</Link>
        <Link href='/budget' className='header-nav-link'>Budget</Link>
        <Link href='/leaderboard' className='header-nav-link'>Leaderboard</Link>
        <Link href='/profile' className='header-nav-link'>Profile</Link>
        <Link href='/admin' className='header-nav-link'>Admin</Link>
      </nav>
      <div className='header-buttons'>
        <Link href='/login'><button className='header-login'>Login</button></Link>
        <Link href='/signup'><button className='header-signup'>Sign Up</button></Link>
      </div>
    </header>
  );
}
