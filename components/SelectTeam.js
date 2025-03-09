import { useState, useEffect } from 'react';
import '../styles/SelectTeam.css';

export default function SelectTeam() {
  const [filter, setFilter] = useState('All');
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [budget, setBudget] = useState(400000); 
  const maxPlayers = 11;

  const players = [
    { id: 'AK', name: 'Angelo Kumara', university: 'Eastern University', role: 'Batsman', value: 80000 },
    { id: 'AS', name: 'Angelo Samarawickrama', university: 'University of Kelaniya', role: 'Batsman', value: 1550000 },
    { id: 'AA', name: 'Asela Asalanka', university: 'South Eastern University', role: 'Batsman', value: 90000 },
    { id: 'AN', name: 'Asela Nissanka', university: 'University of Sri Jayewardenepura', role: 'Batsman', value: 65000 },
    { id: 'AV', name: 'Asela Vandersay', university: 'University of the Visual & Performing Arts', role: 'Bowler', value: 85000 },
    { id: 'AM', name: 'Avishka Mendis', university: 'Eastern University', role: 'All-Rounder', value: 90000 },
    { id: 'BR', name: 'Bhanuka Rajapaksa', university: 'University of Moratuwa', role: 'All-Rounder', value: 85000 },
    { id: 'BL', name: 'Binura Lakmal', university: 'University of Kelaniya', role: 'Batsman', value: 75000 },
    { id: 'BS', name: 'Binura Samarawickrama', university: 'University of the Visual & Performing Arts', role: 'Bowler', value: 85000 },
    { id: 'CB', name: 'Chamika Bandara', university: 'Eastern University', role: 'Batsman', value: 80000 },
    { id: 'CC', name: 'Chamika Chandimal', university: 'South Eastern University', role: 'Batsman', value: 80000 },
    { id: 'CR', name: 'Chamika Rajapaksa', university: 'University of Moratuwa', role: 'Batsman', value: 80000 },
    { id: 'CS', name: 'Charith Shanaka', university: 'University of Colombo', role: 'Batsman', value: 80000 },
    { id: 'CG', name: 'Chathuranga Gunathilaka', university: 'University of Ruhuna', role: 'Batsman', value: 80000 },
  ]; 

  const filteredPlayers = filter === 'All' ? players : players.filter(player => player.role === filter);

  const handleAddPlayer = (player) => {
    if (selectedPlayers.length < maxPlayers && budget >= player.value) {
      setSelectedPlayers([...selectedPlayers, player]);
      setBudget(budget - player.value);
    }
  };

  const handleRemovePlayer = (player) => {
    setSelectedPlayers(selectedPlayers.filter(p => p.id !== player.id));
    setBudget(budget + player.value);
  };

  useEffect(() => {
    
    if (budget < 0) setBudget(0);
  }, [budget]);

  return (
    <section className='select-team'>
      <h1 className='select-team-title'>Select Your Team</h1>
      <div className='select-team-info'>
        <p>{selectedPlayers.length}/11 players in your team</p>
        <p>Budget: Rs {budget.toLocaleString()}</p>
      </div>
      <div className='select-team-filter'>
        <button
          className={`filter-button ${filter === 'All' ? 'active' : ''}`}
          onClick={() => setFilter('All')}
        >
          All
        </button>
        <button
          className={`filter-button ${filter === 'Batsman' ? 'active' : ''}`}
          onClick={() => setFilter('Batsman')}
        >
          Batsmen
        </button>
        <button
          className={`filter-button ${filter === 'Bowler' ? 'active' : ''}`}
          onClick={() => setFilter('Bowler')}
        >
          Bowlers
        </button>
        <button
          className={`filter-button ${filter === 'All-Rounder' ? 'active' : ''}`}
          onClick={() => setFilter('All-Rounder')}
        >
          All-Rounders
        </button>
      </div>
      <div className='select-team-grid'>
        {filteredPlayers.map((player) => (
          <div key={player.id} className='player-card'>
            <div className='player-initials'>{player.id}</div>
            <h3 className='player-name'>{player.name}</h3>
            <p className='player-university'>{player.university}</p>
            <p className='player-role'>{player.role}</p>
            <p className='player-value'>Value: Rs {player.value.toLocaleString()}</p>
            {selectedPlayers.some(p => p.id === player.id) ? (
              <button className='remove-button' onClick={() => handleRemovePlayer(player)}>
                Remove
              </button>
            ) : (
              <button
                className='add-button'
                onClick={() => handleAddPlayer(player)}
                disabled={selectedPlayers.length >= maxPlayers || budget < player.value}
              >
                Add
              </button>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}