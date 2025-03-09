import { useState, useEffect } from 'react';
import '../styles/SelectTeam.css';

export default function SelectTeam() {
  const [filter, setFilter] = useState('All');
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [budget, setBudget] = useState(400000); // Initial budget: Rs 400,000
  const [players, setPlayers] = useState([]);
  const maxPlayers = 11;

  useEffect(() => {
    // Fetch players from the backend API
    fetch('/api/players')
      .then((res) => res.json())
      .then((data) => setPlayers(data))
      .catch((error) => console.error('Error fetching players:', error));
  }, []);

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
    // Ensure budget doesn't go negative (though logic above prevents it)
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