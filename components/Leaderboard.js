import { useState, useEffect } from 'react';
import '../styles/Leaderboard.css';

export default function Leaderboard() {
  const [leaderboardData, setLeaderboardData] = useState([]);

  useEffect(() => {
    // Fetch leaderboard data from the backend API
    fetch('/api/leaderboard')
      .then((res) => res.json())
      .then((data) => setLeaderboardData(data))
      .catch((error) => console.error('Error fetching leaderboard:', error));
  }, []);

  return (
    <section className='leaderboard'>
      <h1 className='leaderboard-title'>Leaderboard</h1>
      <div className='leaderboard-container'>
        <table className='leaderboard-table'>
          <thead>
            <tr>
              <th>Rank</th>
              <th>Username</th>
              <th>Points</th>
            </tr>
          </thead>
          <tbody>
            {leaderboardData.map((user, index) => (
              <tr key={index} className={index < 3 ? 'top-rank' : ''}>
                <td>{user.rank}</td>
                <td>{user.username}</td>
                <td>{user.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}