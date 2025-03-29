import '../styles/Leaderboard.css';

export default function Leaderboard() {
  const leaderboardData = [
    { rank: 1, username: 'CricketKing', points: 1250 },
    { rank: 2, username: 'FantasyPro', points: 1180 },
    { rank: 3, username: 'WicketWizard', points: 1100 },
    { rank: 4, username: 'BattingStar', points: 1050 },
    { rank: 5, username: 'AllRounderAce', points: 1020 },
    { rank: 6, username: 'BowlingBeast', points: 980 },
    { rank: 7, username: 'FieldingFlash', points: 950 },
    { rank: 8, username: 'RunMachine', points: 920 },
    { rank: 9, username: 'SpinMaster', points: 890 },
    { rank: 10, username: 'PowerHitter', points: 860 },
  ];

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
