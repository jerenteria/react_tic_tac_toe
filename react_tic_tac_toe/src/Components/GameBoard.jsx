import { useState } from 'react';
 
// creates board and every position starts at null because at the beginning of the game the board needs to be blank so 
// users can select their move
const initialGameBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
];

export default function GameBoard({ onSelectSquare, activePlayerSymbol }) {
    const [gameBoard, setGameBoard] = useState(initialGameBoard);

    function handleSelectSquare(rowIndex, colIndex) {
        setGameBoard((prevGameBoard) => {
            // new object arr memory that contains old arr elements and child elements
            // basically new array of nested arrays(game board) with the old stored data 
            const updatedBoard = [...prevGameBoard.map(innerArray => [...innerArray])]; 
            updatedBoard[rowIndex][colIndex] = activePlayerSymbol;
            return updatedBoard;
        });

        onSelectSquare();
    };

    return (
        <ol id="game-board">
            {/* render grid by mapping through every item in arr 
            take in a function that has row and rowIndex as parameters
            set a key so that it can be identified in a unique way and use the rowIndex as they unique key
            */}
            {gameBoard.map((row, rowIndex) => <li key={rowIndex}>
                <ol>
                    {row.map((playerSymbol, colIndex) => (
                    <li key={colIndex}>
                        <button onClick={() => handleSelectSquare(rowIndex, colIndex)}>{playerSymbol}</button></li>))}
                </ol>
            </li>)}
        </ol>
    );
}