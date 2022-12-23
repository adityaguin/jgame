import React, { useState } from 'react';

function NewPlayerForm() {
  const [playerName, setPlayerName] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    // add the new player to the list of players here
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Enter a new player:
        <input type="text" value={playerName} onChange={e => setPlayerName(e.target.value)} />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}

export default NewPlayerForm;
