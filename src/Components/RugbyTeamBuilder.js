// src/components/RugbyTeamBuilder.js
import React, { useState, useCallback } from 'react';
import Card, { CardContent, CardHeader } from './ui/Card';
import Select from './ui/Select';
import Input from './ui/Input';
import Button from './ui/Button';

const RugbyTeamBuilder = () => {
  console.log('RugbyTeamBuilder rendered');
  const [team, setTeam] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPosition, setSelectedPosition] = useState('');
  const [budget, setBudget] = useState(25.0);

  const positions = [
    { id: 1, name: 'Fullback', x: 50, y: 90 },
    { id: 2, name: 'Wing', x: 20, y: 80 },
    { id: 3, name: 'Wing', x: 80, y: 80 },
    { id: 4, name: 'Center', x: 35, y: 70 },
    { id: 5, name: 'Center', x: 65, y: 70 },
    { id: 6, name: 'Fly-half', x: 50, y: 60 },
    { id: 7, name: 'Scrum-half', x: 50, y: 50 },
    { id: 8, name: 'Number 8', x: 50, y: 40 },
    { id: 9, name: 'Flanker', x: 35, y: 35 },
    { id: 10, name: 'Flanker', x: 65, y: 35 },
    { id: 11, name: 'Lock', x: 45, y: 30 },
    { id: 12, name: 'Lock', x: 55, y: 30 },
    { id: 13, name: 'Prop', x: 40, y: 20 },
    { id: 14, name: 'Hooker', x: 50, y: 20 },
    { id: 15, name: 'Prop', x: 60, y: 20 },
  ];

  const players = [
    { id: 1, name: 'Frino', position: 'Fullback', value: 5.0, points: 0 },
    { id: 2, name: 'Cuervo', position: '2 Linea', value: 6.0, points: 0 },
    { id: 2, name: 'Tu vieja', position: 'Pilar', value: 6.5, points: 0 },
    // Agrega más jugadores aquí...
  ];

  const addPlayer = useCallback((player) => {
    if (team.length < 15) {
      if (budget - player.value >= 0) {
        setTeam((prevTeam) => [...prevTeam, player]);
        setBudget((prevBudget) => prevBudget - player.value);
      } else {
        alert('No tienes suficiente presupuesto para agregar este jugador');
      }
    } else {
      alert('El equipo ya está completo (15 jugadores)');
    }
  }, [team, budget]);

  const removePlayer = useCallback((playerId) => {
    const player = team.find(p => p.id === playerId);
    if (player) {
      setTeam((prevTeam) => prevTeam.filter(p => p.id !== playerId));
      setBudget((prevBudget) => prevBudget + player.value);
    }
  }, [team]);

  const handleSearchChange = useCallback((e) => {
    setSearchTerm(e.target.value);
  }, []);

  const handlePositionChange = useCallback((e) => {
    setSelectedPosition(e.target.value);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-blue-900 text-white p-4">
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Mi Equipo de Rugby</h1>
        <div className="flex items-center space-x-4">
          <span>Puntos: {team.reduce((sum, player) => sum + player.points, 0)}</span>
          <span>Presupuesto: ${budget.toFixed(2)}M</span>
        </div>
      </header>

      <main className="flex flex-1">
        <div className="flex-1 mr-4">
          <div className="relative w-full h-[600px] bg-green-600 rounded-lg overflow-hidden">
            {/* Campo de rugby */}
            <div className="absolute inset-0 flex flex-col">
              <div className="flex-1 border-b-2 border-white"></div>
              <div className="flex-1"></div>
            </div>
            {/* Líneas verticales */}
            <div className="absolute inset-y-0 left-1/4 border-l-2 border-white"></div>
            <div className="absolute inset-y-0 right-1/4 border-r-2 border-white"></div>
            
            {/* Jugadores en el campo */}
            {team.map((player, index) => {
              const position = positions.find(pos => pos.name === player.position);
              return (
                <div
                  key={player.id}
                  className="absolute w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-xs"
                  style={{ left: `${position.x}%`, top: `${position.y}%`, transform: 'translate(-50%, -50%)' }}
                >
                  {player.name.split(' ')[0]}
                </div>
              );
            })}
          </div>
        </div>

        <aside className="w-1/3">
          <Card className="bg-blue-800">
            <CardHeader>
              <h2 className="text-xl">Buscar Jugadores</h2>
            </CardHeader>
            <CardContent>
              <Input
                placeholder="Buscar jugador"
                value={searchTerm}
                onChange={handleSearchChange}
                className="mb-4"
              />
              <Select className="mb-4" onChange={handlePositionChange}>
                <option value="">Todas las Posiciones</option>
                {positions.map((pos) => (
                  <option key={pos.id} value={pos.name}>{pos.name}</option>
                ))}
              </Select>
              <ul className="space-y-2 max-h-[400px] overflow-y-auto">
                {players
                  .filter((player) =>
                    player.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
                    (selectedPosition === '' || player.position === selectedPosition)
                  )
                  .map((player) => (
                    <li key={player.id} className="flex justify-between items-center">
                      <span>{player.name} - {player.position}</span>
                      <Button onClick={() => addPlayer(player)}>Agregar</Button>
                    </li>
                  ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-blue-800 mt-4">
            <CardHeader>
              <h2 className="text-xl">Mi Equipo</h2>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 max-h-[400px] overflow-y-auto">
                {team.map((player) => (
                  <li key={player.id} className="flex justify-between items-center">
                    <span>{player.name} - {player.position}</span>
                    <Button onClick={() => removePlayer(player.id)}>Eliminar</Button>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </aside>
      </main>
    </div>
  );
};

export default RugbyTeamBuilder;
