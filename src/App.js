import React, { useState } from 'react';
import Choose from './components/Choose';
import TickTacToe from './components/TickTacToe';
import Wordle from './components/Wordle';

const App = () => {
  const [game, setGame] = useState('Choose');
  return (
        <div>
          {game === "Choose" ? (
             <Choose game={game} setGame={setGame} />
          ) : game === "Wordle" ? (
            <Wordle />
          ) : (
            <TickTacToe />
          )}
        </div>
        );
};

export default App;


