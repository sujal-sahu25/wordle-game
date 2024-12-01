import React, { useState, useEffect } from 'react';
import "../App.css"

const Square = ({ value, onClick, isWinning }) => {
  return (
    <button className={`square ${isWinning ? 'winning' : ''}`} onClick={onClick}>
      {value}
    </button>
  );
};

const TickTacToe = () => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [winningLine, setWinningLine] = useState(null); // Track winning line

  useEffect(() => {
    const savedGame = localStorage.getItem('ticTacToe');
    if (savedGame) {
      const data = JSON.parse(savedGame);
      setSquares(data.squares);
      setXIsNext(data.xIsNext);
      setWinner(data.winner);
      setWinningLine(data.winningLine); // Restore the winning line
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('ticTacToe', JSON.stringify({ squares, xIsNext, winner, winningLine }));
  }, [squares, xIsNext, winner, winningLine]);

  const handleClick = (i) => {
    if (squares[i] || winner) {
      return;
    }
    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? 'X' : 'O';
    const winInfo = calculateWinner(nextSquares);
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
    setWinner(winInfo ? winInfo.winner : null);
    setWinningLine(winInfo ? winInfo.line : null);
  };

  const handleRefresh = () => {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
    setWinner(null);
    setWinningLine(null); // Reset winning line
  };

  const renderSquare = (i) => {
    return (
      <Square
        value={squares[i]}
        onClick={() => handleClick(i)}
        isWinning={winningLine && winningLine.includes(i)}
      />
    );
  };

  const renderBoard = () => {
    return (
      <div className='BigBox'>
        <div className="board-row">
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </div>
        <div className="board-row">
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </div>
        <div className="board-row">
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </div>
      </div>
    );
  };

  const status = winner ? `Winner: ${winner}` : squares.every(square => square !== null) ? 'Draw' : `Next player: ${xIsNext ? 'X' : 'O'}`;

  return (
    <div className='tictactoe-container'>
      <div className="status">
        {status}
        <button className='refresh-tictactoe' onClick={handleRefresh}>{"\u27f3"}</button>
      </div>
      {renderBoard()}
    </div>
  );
};

const calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line: lines[i] }; // Return winner and winning line
    }
  }
  return null; // No winner
};

export default TickTacToe;
