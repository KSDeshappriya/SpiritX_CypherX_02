import { useState, useEffect } from 'react';
import '../styles/Players.css';

export default function Players() {
  const [filter, setFilter] = useState('All');
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    fetch('/api/players')
      .then((res) => res.json())
      .then((data) => setPlayers(data));
  }, []);

  const filteredPlayers = filter === 'All' ? players : players.filter(player => player.role === filter);

  const closePopup = () => setSelectedPlayer(null);

  return (
    <section className='players'>
      <h1 className='players-title'>Players</h1>
      <div className='players-filter'>
        <button
          className={`filter-button ${filter === 'All' ? 'active' : ''}`}
          onClick={() => setFilter('All')}
        >
          All Players
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
      <div className='players-grid'>
        {filteredPlayers.map((player, index) => (
          <div key={index} className='player-card'>
            <div className='player-initials'>{player.name.split(' ').map(n => n[0]).join('')}</div>
            <h3 className='player-name'>{player.name}</h3>
            <p className='player-university'>{player.university}</p>
            <p className='player-role'>{player.role}</p>
            <p className='player-value'>Value: Rs {player.value.toLocaleString()}</p>
            <a href='#' className='player-details-link' onClick={(e) => { e.preventDefault(); setSelectedPlayer(player); }}>
              View Details
            </a>
          </div>
        ))}
      </div>
      {selectedPlayer && (
        <div className='player-popup-overlay' onClick={closePopup}>
          <div className='player-popup' onClick={(e) => e.stopPropagation()}>
            <button className='popup-close' onClick={closePopup}>x</button>
            <h2 className='popup-title'>Player Details for {selectedPlayer.name}</h2>
            <div className='popup-content'>
              <div className='player-initials'>{selectedPlayer.name.split(' ').map(n => n[0]).join('')}</div>
              <h3 className='player-name'>{selectedPlayer.name}</h3>
              <p className='player-university'>{selectedPlayer.university}</p>
              <p className='player-role'>{selectedPlayer.role}</p>
              {selectedPlayer.batting && (
                <div className='stats-section'>
                  <h4>Batting Statistics</h4>
                  <p>Total Runs: {selectedPlayer.batting.runs}</p>
                  <p>Innings Played: {selectedPlayer.batting.innings}</p>
                  <p>Batting Average: {selectedPlayer.batting.average}</p>
                  <p>Batting Strike Rate: {selectedPlayer.batting.strikeRate}%</p>
                </div>
              )}
              {selectedPlayer.bowling && (
                <div className='stats-section'>
                  <h4>Bowling Statistics</h4>
                  <p>Wickets: {selectedPlayer.bowling.wickets}</p>
                  <p>Overs Bowled: {selectedPlayer.bowling.overs}</p>
                  <p>Runs Conceded: {selectedPlayer.bowling.runsConceded}</p>
                  <p>Economy Rate: {selectedPlayer.bowling.economy}</p>
                  <p>Bowling Strike Rate: {selectedPlayer.bowling.strikeRate}</p>
                </div>
              )}
              <p className='player-value'>Player Value: Rs {selectedPlayer.value.toLocaleString()}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}