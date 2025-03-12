import { useState, useEffect } from 'react';
import '../styles/AdminDashboard.css';

export default function AdminDashboard() {
  const [players, setPlayers] = useState([
    { id: 'AK', name: 'Angelo Kumara', role: 'Batsman', value: 80000 },
    { id: 'AS', name: 'Angelo Samarawickrama', role: 'Batsman', value: 1550000 },
    { id: 'AA', name: 'Asela Asalanka', role: 'Batsman', value: 90000 },
  ]);
  const [newPlayer, setNewPlayer] = useState({ id: '', name: '', role: '', value: '' });
  const [editPlayer, setEditPlayer] = useState(null);
  const [editedPlayer, setEditedPlayer] = useState({ id: '', name: '', role: '', value: '' });

  // Create
  const handleCreate = (e) => {
    e.preventDefault();
    if (newPlayer.id && newPlayer.name && newPlayer.role && newPlayer.value) {
      setPlayers([...players, { ...newPlayer, value: parseInt(newPlayer.value) }]);
      setNewPlayer({ id: '', name: '', role: '', value: '' });
    }
  };

  // Update
  const handleEdit = (player) => {
    setEditPlayer(player);
    setEditedPlayer({ ...player });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    if (editedPlayer.id && editedPlayer.name && editedPlayer.role && editedPlayer.value) {
      setPlayers(players.map(p => p.id === editedPlayer.id ? { ...editedPlayer, value: parseInt(editedPlayer.value) } : p));
      setEditPlayer(null);
      setEditedPlayer({ id: '', name: '', role: '', value: '' });
    }
  };

  // Delete
  const handleDelete = (id) => {
    setPlayers(players.filter(p => p.id !== id));
  };

  return (
    <section className='admin-dashboard'>
      <h1 className='admin-title'>Admin Dashboard</h1>
      <div className='admin-container'>
        {/* Create Form */}
        <div className='admin-form'>
          <h2>Add New Player</h2>
          <form onSubmit={handleCreate}>
            <input
              type='text'
              placeholder='ID'
              value={newPlayer.id}
              onChange={(e) => setNewPlayer({ ...newPlayer, id: e.target.value })}
              required
            />
            <input
              type='text'
              placeholder='Name'
              value={newPlayer.name}
              onChange={(e) => setNewPlayer({ ...newPlayer, name: e.target.value })}
              required
            />
            <input
              type='text'
              placeholder='Role'
              value={newPlayer.role}
              onChange={(e) => setNewPlayer({ ...newPlayer, role: e.target.value })}
              required
            />
            <input
              type='number'
              placeholder='Value (Rs)'
              value={newPlayer.value}
              onChange={(e) => setNewPlayer({ ...newPlayer, value: e.target.value })}
              required
            />
            <button type='submit' className='admin-button'>Add Player</button>
          </form>
        </div>

        {/* Update Form */}
        {editPlayer && (
          <div className='admin-form'>
            <h2>Edit Player</h2>
            <form onSubmit={handleUpdate}>
              <input
                type='text'
                placeholder='ID'
                value={editedPlayer.id}
                onChange={(e) => setEditedPlayer({ ...editedPlayer, id: e.target.value })}
                required
              />
              <input
                type='text'
                placeholder='Name'
                value={editedPlayer.name}
                onChange={(e) => setEditedPlayer({ ...editedPlayer, name: e.target.value })}
                required
              />
              <input
                type='text'
                placeholder='Role'
                value={editedPlayer.role}
                onChange={(e) => setEditedPlayer({ ...editedPlayer, role: e.target.value })}
                required
              />
              <input
                type='number'
                placeholder='Value (Rs)'
                value={editedPlayer.value}
                onChange={(e) => setEditedPlayer({ ...editedPlayer, value: e.target.value })}
                required
              />
              <button type='submit' className='admin-button'>Update Player</button>
              <button type='button' className='admin-cancel' onClick={() => setEditPlayer(null)}>Cancel</button>
            </form>
          </div>
        )}

        {/* Player List */}
        <div className='admin-table-container'>
          <h2>Player List</h2>
          <table className='admin-table'>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Role</th>
                <th>Value (Rs)</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {players.map((player) => (
                <tr key={player.id}>
                  <td>{player.id}</td>
                  <td>{player.name}</td>
                  <td>{player.role}</td>
                  <td>{player.value.toLocaleString()}</td>
                  <td>
                    <button className='admin-button edit' onClick={() => handleEdit(player)}>Edit</button>
                    <button className='admin-button delete' onClick={() => handleDelete(player.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
