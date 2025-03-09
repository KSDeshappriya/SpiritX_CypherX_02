import { useState, useEffect } from 'react';
import '../styles/SelectTeam.css';

export default function SelectTeam() {
  const [filter, setFilter] = useState('All');
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [budget, setBudget] = useState(400000); // Initial budget: Rs 400,000
  const maxPlayers = 11;