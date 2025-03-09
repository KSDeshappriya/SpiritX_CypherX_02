import { useState, useEffect } from 'react';
import '../styles/BudgetTracker.css';

export default function BudgetTracker() {
  const totalBudget = 9000000; // Rs 9,000,000 as shown
  const [spentBudget, setSpentBudget] = useState(8600000);

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