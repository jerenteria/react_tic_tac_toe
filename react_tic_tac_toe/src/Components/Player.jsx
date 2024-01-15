import React, { useState } from "react";

export default function Player({
  initialName,
  symbol,
  isActive,
  onChangeName,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [playerName, setPlayerName] = useState(initialName);

  function handleEditClick() {
    // takes in wether its your editing or not first and switches to the opposite to switch back and forth from
    // editing and not editing
    setIsEditing((editing) => !editing);

    if (isEditing) {
      onChangeName(symbol, playerName);
    }
  }

  function handleChange(event) {
    setPlayerName(event.target.value);
  }

  return (
    // check if the player is active then switch to active class in css
    <li className={isActive ? "active" : undefined}>
      <span>
        {!isEditing && <span className="player-name">{playerName}</span>}
        {/* 2 way binding because we are getting something out of the user input and feeding back into the input,
                like handling the input change getting that value and setting that value back into the input
                */}
        {isEditing && (
          <input
            type="text"
            required
            value={playerName}
            onChange={handleChange}
          />
        )}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleEditClick}>{isEditing ? "Save" : "Edit"}</button>
    </li>
  );
}
