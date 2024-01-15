import { useState } from 'react';
import Player from './Components/Player';
import GameBoard from './Components/GameBoard.jsx';
import Log from './Components/Log.jsx';
import { WINNING_COMBINATIONS } from './winning-combinations';
import GameOver from './Components/GameOver';


// creates board and every position starts at null because at the beginning of the game the board needs to be blank so
// users can select their move
const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];``

function deriveActivePlayer(gameTurns) {
  let currentPlayer = 'X';
  if(gameTurns.length > 0 && gameTurns[0].player === 'X') {
    currentPlayer = 'O';
  }
  return currentPlayer;
}



function App() {
  // const [activePlayer, setActivePlayer] = useState('X'); // game starts will x being player 1(initial state is x)
  const [gameTurns, setGameTurns] = useState([]);
  const [players, setPlayers] = useState({'X': 'Player 1', 'O': 'Player 2'});

  // activePlayer holds result of derviveActicePlayer function and takes in gameTurns so that its available
  const activePlayer = deriveActivePlayer(gameTurns);

  // create deep copy of initial gameboard and go through every inner array and for every inner arr we create a copy that contains existing arr elements spread into it
  // to make sure that we edit a new brand new arr when we derive the game board and not original arr in memory
  let gameBoard = [...initialGameBoard.map(array => [...array])]; 
  for(const turn of gameTurns) { // array destructuring 
    const { square, player } = turn; // get player symbol
    const { row, col } = square; // get player row and column that player selected
    // get the row and column in the gameBoard and update it with the player symbol(deriving state)
    // updates gameBoard to display selected squares
    gameBoard[row][col] = player;
  }

  let winner;

  for(const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column]
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column]
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column]

    if(firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol) {
      winner = players[firstSquareSymbol];
    }
  }

  const hasDraw = gameTurns.length === 9 && !winner;

  // function selects what symbol it will place in the square
  function handleSelectSquare(rowIndex, colIndex) {
    // current player as input if the current player is using the symbol 'X' then update the state to 'O' for next player and vice versa
    // setActivePlayer((curActivePlayer) => curActivePlayer === 'X' ? 'O' : 'X');
    setGameTurns((prevTurns) => {
      // handles result of deriveActivePlayer but has access to prevTurns
      const currentPlayer = deriveActivePlayer(prevTurns); 


      const updatedTurns = [{ square: {row: rowIndex, col: colIndex}, player: currentPlayer}, ...prevTurns];
      return updatedTurns;
    });
  }

  function handleRestart() {
    setGameTurns([]);
  }

  function handlePlayerNameChange(symbol, newName) {
    setPlayers(prevPlayers => {
      return {
        ...prevPlayers,
        [symbol]: newName
      }
    });
  };

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          {/* player 1 inital name is player 1 the symbol is 'X' and is currently active if the current state of activePlayer is 'X' */}
          <Player initialName="Player 1" symbol="X" isActive={activePlayer === 'X'} onChangeName={handlePlayerNameChange} /> 
          <Player initialName="Player 2" symbol="O" isActive={activePlayer === 'O'} onChangeName={handlePlayerNameChange} />
        </ol>
        {(winner || hasDraw) && <GameOver winner={winner} onRestart={handleRestart} />}
        {/* GameBoard needs to know which is active player to know what symbol to place on the board */}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard}/>
      </div>
      <Log turns={gameTurns} />
    </main>
  )
}

export default App
