import { useState, useEffect } from 'react';
import '../styles/BudgetTracker.css';

export default function BudgetTracker() {
  const totalBudget = 9000000; // Rs 9,000,000 as shown
  const [spentBudget, setSpentBudget] = useState(8600000);

  