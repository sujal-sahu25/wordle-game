import React from 'react';
import "../App.css"
const Choose = ({ game, setGame }) => {
  return (
    <div className="choose-container">
      <button className="choose-button" onClick={() => setGame('Wordle')}>Wordle</button>
      <button className="choose-button" onClick={() => setGame('TickTacToe')}>TickTacToe</button>
    </div>
  );
};

export default Choose;
