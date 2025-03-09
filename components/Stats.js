import '../styles/Stats.css';

export default function Stats() {
  const stats = [
    { icon: '??', value: '50K+', label: 'Players' },
    { icon: '??', value: '100+', label: 'Matches' },
    { icon: '??', value: '10K+', label: 'Winners' },
    { icon: '??', value: '?1Cr+', label: 'Prizes' },
  ];

  return (
    <section className='stats'>
      <h2 className='stats-title'>Why Choose Us?</h2>
      <div className='stats-grid'>
        {stats.map((stat, index) => (
          <div key={index} className='stats-card'>
            <span className='stats-icon'>{stat.icon}</span>
            <h3 className='stats-value'>{stat.value}</h3>
            <p className='stats-label'>{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
