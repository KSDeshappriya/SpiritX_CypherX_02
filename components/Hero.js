import '../styles/Hero.css';

export default function Hero() {
  return (
    <section className='hero'>
      <div className='hero-content'>
        <h1 className='hero-title'>
          Build Your <span className='hero-title-highlight'>Dream Team</span>
        </h1>
        <p className='hero-description'>
          Join the ultimate fantasy cricket experience with real-time stats and epic rewards.
        </p>
        <button className='hero-button'>Start Playing Now</button>
      </div>
      <div className='hero-image-container'>
        <img src='/cricket-ball.jpg' alt='Cricket Ball' className='hero-image' />
      </div>
    </section>
  );
}
