import Header from '../components/Header';
import Hero from '../components/Hero';
import Stats from '../components/Stats';
import '../styles/Index.css';

export default function Home() {
  return (
    <div className='main-container'>
      <Header />
      <Hero />
      <Stats />
    </div>
  );
}
