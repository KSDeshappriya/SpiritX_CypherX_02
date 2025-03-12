
import { useState, useEffect } from 'react';
import '../styles/BudgetTracker.css';

export default function BudgetTracker() {
  const totalBudget = 9000000; // Rs 9,000,000 as shown
  const [spentBudget, setSpentBudget] = useState(8600000); // Rs 8,600,000 as shown

  const players = [
    { name: 'Angelo Kumara', category: 'Batsman', value: 800000, percentage: '8.9%' },
    { name: 'Asela Nissanka', category: 'Batsman', value: 750000, percentage: '8.3%' },
    { name: 'Asela Asalanka', category: 'Batsman', value: 780000, percentage: '8.7%' },
    { name: 'Avishka Mendis', category: 'All-Rounder', value: 900000, percentage: '10.0%' },
    { name: 'Asela Vandersay', category: 'Bowler', value: 850000, percentage: '9.4%' },
    { name: 'Bhanuka Rajapaksa', category: 'All-Rounder', value: 850000, percentage: '9.4%' },
    { name: 'Binura Lakmal', category: 'Batsman', value: 750000, percentage: '8.3%' },
    { name: 'Chamika Bandara', category: 'Batsman', value: 800000, percentage: '8.9%' },
    { name: 'Binura Samarawickrama', category: 'Bowler', value: 850000, percentage: '9.4%' },
    { name: 'Chamika Chandimal', category: 'Batsman', value: 800000, percentage: '8.9%' },
    { name: 'Suranga Sandakan', category: 'Batsman', value: 750000, percentage: '8.3%' },
  ];

  const remainingBudget = totalBudget - spentBudget;
  const spentPercentage = (spentBudget / totalBudget) * 100;

  return (
    <section className='budget-tracker'>
      <h1 className='budget-tracker-title'>Budget Tracker</h1>
      <div className='budget-container'>
        <div className='budget-overview'>
          <h2>Budget Overview</h2>
          <p>Your spending and available budget</p>
          <div className='budget-details'>
            <p><strong>Total Budget:</strong> Rs {totalBudget.toLocaleString()}</p>
            <p><strong>Spent:</strong> <span className='spent'>Rs {spentBudget.toLocaleString()}</span></p>
            <p><strong>Remaining:</strong> Rs {remainingBudget.toLocaleString()}</p>
            <div className='progress-bar'>
              <div
                className='progress'
                style={{ width: `${spentPercentage}%` }} // Fixed syntax
              ></div>
              <div className='progress-text'>
                <span>0%</span>
                <span>{spentPercentage.toFixed(1)}% spent</span>
                <span>100%</span>
              </div>
            </div>
          </div>
          <div className='budget-tips'>
            <h3>Budget Management Tips</h3>
            <ul>
              <li>Build a balanced team across categories</li>
              <li>Consider player form and value for money</li>
              <li>Reserve budget for key players in critical roles</li>
            </ul>
          </div>
        </div>
        <div className='expenditure-breakdown'>
          <h2>Expenditure Breakdown</h2>
          <p>See how you have allocated your budget</p>
          <table className='expenditure-table'>
            <thead>
              <tr>
                <th>Player</th>
                <th>Category</th>
                <th>Value</th>
                <th>% of Budget</th>
              </tr>
            </thead>
            <tbody>
              {players.map((player, index) => (
                <tr key={index}>
                  <td>{player.name}</td>
                  <td>{player.category}</td>
                  <td>Rs {player.value.toLocaleString()}</td>
                  <td>{player.percentage}</td>
                </tr>
              ))}
              <tr className='total-row'>
                <td colSpan='2'>Total Spent: Rs {spentBudget.toLocaleString()}</td>
                <td colSpan='2'>{spentPercentage.toFixed(1)}%</td>
              </tr>
            </tbody>
          </table>
          <p className='player-count'>11 players in your team</p>
        </div>
      </div>
    </section>
  );
}
