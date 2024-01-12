import React, { useState } from 'react';


export default function Player({ name, symbol }) {
    const [isEditing, setIsEditing] = useState(false);

    function handleEditClick() {
        setIsEditing(true);
    };

    return (
        <li>
            <span>
                {!isEditing && <span className="player-name">{name}</span>}
                {isEditing && <input type="text" />}
                <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={handleEditClick}>Edit</button>
        </li>
    );
}