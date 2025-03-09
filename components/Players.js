
import { useState } from 'react';
import '../styles/Players.css';

export default function Players() {
  const [filter, setFilter] = useState('All');
  const [selectedPlayer, setSelectedPlayer] = useState(null);

  const players = [
    { name: 'Angelo Kumara', university: 'Eastern University', role: 'Batsman', value: 800000, batting: { runs: 500, innings: 10, average: 50.00, strikeRate: 80.00 }, bowling: null },
    { name: 'Angelo Samarawickrama', university: 'University of Kelaniya', role: 'Batsman', value: 1550000, batting: { runs: 1000, innings: 15, average: 66.67, strikeRate: 90.00 }, bowling: null },
    { name: 'Asela Asalanka', university: 'South Eastern University', role: 'Batsman', value: 900000, batting: { runs: 750, innings: 12, average: 62.50, strikeRate: 85.00 }, bowling: null },
    { name: 'Asela Nissanka', university: 'University of Sri Jayewardenepura', role: 'Batsman', value: 650000, batting: { runs: 400, innings: 8, average: 50.00, strikeRate: 75.00 }, bowling: null },
    { name: 'Asela Vandersay', university: 'University of the Visual & Performing Arts', role: 'Bowler', value: 850000, batting: { runs: 184, innings: 14, average: 11.00, strikeRate: 50.00 }, bowling: { wickets: 37, overs: 112, runsConceded: 448, economy: 4.00, strikeRate: 18.16 } },
    { name: 'Avishka Mendis', university: 'Eastern University', role: 'All-Rounder', value: 900000, batting: { runs: 600, innings: 10, average: 60.00, strikeRate: 80.00 }, bowling: { wickets: 20, overs: 50, runsConceded: 250, economy: 5.00, strikeRate: 15.00 } },
    { name: 'Bhanuka Rajapaksa', university: 'University of Moratuwa', role: 'All-Rounder', value: 850000, batting: { runs: 700, innings: 12, average: 58.33, strikeRate: 85.00 }, bowling: { wickets: 15, overs: 40, runsConceded: 200, economy: 5.00, strikeRate: 16.00 } },
    { name: 'Binura Lakmal', university: 'University of Kelaniya', role: 'Batsman', value: 750000, batting: { runs: 450, innings: 9, average: 50.00, strikeRate: 70.00 }, bowling: null },
    { name: 'Binura Samarawickrama', university: 'University of the Visual & Performing Arts', role: 'Bowler', value: 850000, batting: { runs: 100, innings: 5, average: 20.00, strikeRate: 40.00 }, bowling: { wickets: 25, overs: 60, runsConceded: 300, economy: 5.00, strikeRate: 14.40 } },
    { name: 'Chamika Bandara', university: 'Eastern University', role: 'Batsman', value: 900000, batting: { runs: 800, innings: 13, average: 61.54, strikeRate: 88.00 }, bowling: null },
    { name: 'Chamika Chandimal', university: 'South Eastern University', role: 'Batsman', value: 750000, batting: { runs: 550, innings: 11, average: 50.00, strikeRate: 78.00 }, bowling: null },
    { name: 'Chamika Rajapaksa', university: 'University of Moratuwa', role: 'Batsman', value: 850000, batting: { runs: 650, innings: 10, average: 65.00, strikeRate: 82.00 }, bowling: null },
  ];

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
