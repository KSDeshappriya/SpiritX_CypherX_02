import { useState, useEffect } from 'react';
import '../styles/SelectTeam.css';

export default function SelectTeam() {
  const [filter, setFilter] = useState('All');
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [budget, setBudget] = useState(400000); // Initial budget: Rs 400,000
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