import { useState } from 'react';
import './App.css';
import spade from './spade.png'
import diamond from './diamond.png'
import Heart from './heard.png'
import clove from './club.png'
import noTrump from './no_trump.png'
function App() {

  const [message, setMessage] = useState('')
  const [players, setPlayers] = useState([])
  const [finalStanding, setFinalStanding] = useState([])
  const fullGame = [8,7,6,5,4,3,2,1,2,3,4,5,6,7,8]
  const trump = ['Spade', 'Heart', 'Diamond', 'Club', 'No Trump']
  const logos = [spade, Heart, diamond, clove, noTrump]
  const handleSort = (event) => {
    event.preventDefault()
    const sortedPlayers = [...players]
    sortedPlayers.sort(function(a, b) {return b.score - a.score})
    setFinalStanding(sortedPlayers)   
  };

  const removeBlind = (event, p) => {
    event.preventDefault()
    const newState = players.map(player => {
      if (player.name === p.name) {
        return {...player, change: player.change / 2};
      }
      return player;
    });
    setPlayers(newState)
  }

  const handleBlind = (event, p) => {
    event.preventDefault()
    const newState = players.map(player => {
      if (player.name === p.name) {
        return {...player, change: 2 * player.change};
      }
      return player;
    });
    setPlayers(newState);
  }

  const handleChange = (event, p) => {
    event.preventDefault()
    const newValue = Math.max(10, 10 * event.target.value)
    const newState = players.map(player => {
      if (player.name === p.name) {
        return {...player, change: newValue};
      }
      return player;
    });
    setPlayers(newState);
  }

  const handleNewPlayer = (event) => {
    event.preventDefault()
    let copy = false;
    for (let i = 0; i < players.length; i++) {
      if(message === players[i].name){
        copy = true;
        break;
      }
    }
    if(!copy){
      setPlayers([...players, {name: message, score: 0, change: 10}])
    }
  }
  
  const handleRemovePlayer = (e) => {
    e.preventDefault()
    setPlayers(players.filter(player => player.name !== e.target.value))
  }

  const updateScore = (event, p, increase) => {  
    event.preventDefault()  
    const newState = players.map(player => {
      if (player.name === p.name) {
        return {...player, score: player.score + parseInt(increase)};
      }
      return player;
    });
    setPlayers(newState);
  };  


  return (
    <div className="App">

    <form onSubmit={handleNewPlayer}>
      <label>Enter new player name:{'\t'}
        <input 
          type="text" 
          onChange={(e) => setMessage(e.target.value)}
        />
      </label>
      <input type="submit" />
    </form>

    <form onChange={handleRemovePlayer}>
      Select player to remove:{'\t'}             
      <select>
        <option> </option>
        {players.map(player => {
          return (
            <option> {player.name} </option>
          )
        })}
      </select>
    </form>
      

    <table className='Table'>
      <thead>
        <tr style={{ backgroundColor: '#f4f4f4' }}>
          <th style={{ border: '3px solid black' }}>Number </th>
          <th style={{ border: '3px solid blue' }}> Trump Card </th>          
          {players.map(player => (
            <th style={{ border: '4px solid pink' }} key={player.name}>{player.name}</th>
          ))}          
        </tr>
      </thead>
      <tbody>
        {fullGame.map((number, index) => (
          <tr key={index}>
            <td style={{ border: '1px solid black', backgroundColor: '#FFFFFF' }}>{number}</td>

            <td style={{ border: '1px solid black', backgroundColor: '#FFFFFF' }}>
               {trump[index % trump.length]}
               <img src={logos[index % trump.length]} height={30} width={30}/>
            </td>

            {players.map(player => (
              <>
                <td className='tbody' style={{ border: '1px solid green', backgroundColor: '#FFFFFF' }} key={player.name}>
                    <select className='select' onChange={(event)=> handleChange(event, player)}> 
                      <option></option>
                      {
                        (fullGame.filter((i, idx) => i <= number && fullGame.indexOf(i) === idx)).map(x =>
                          <option>
                              {x}
                          </option>
                        )               
                      }                      
                      <option> 0</option>     
                      </select>
                    
                    <button className='glow-on-hover' style={{color: '#39FF14'}} onClick={(event) => {updateScore(event, player, player.change)}}>
                      +
                    </button>
                    <button className='glow-on-hover' style={{color: '#FF3131'}} onClick={(event) => {updateScore(event, player, -1 * player.change)}}>
                      -
                    </button>
                    <button className='glow-on-hover' onClick={(event) => {handleBlind(event, player)}}>
                      x2
                    </button>
                    <button className='glow-on-hover' onClick={(event) => {removeBlind(event, player)}}>
                      /2
                    </button>
                    <br/>
                    <p>
                      Total: {player.score}
                    </p>
                    
                </td>
              </>
           
          ))} 
          </tr>
        ))}       
      </tbody>
    </table>
    
    <h1 className=''>
      Final Standings!
    </h1>
    <button onClick={handleSort}> Click to generate </button>
    <table className='FinalStandings'>
      <thead>
        <tr style={ {backgroundColor: '#FFFFFF'} }>
          <th> Rank </th>
          <th> Name </th>
          <th> Score </th>
        </tr>
      </thead>
      <tbody className='EntriesInFinalStandings'>
      {
        finalStanding.map((item, idx) => (
          <tr key={idx}>
            <td> {idx + 1} </td>
            <td>{item.name}</td>
            <td>{item.score}</td>
          </tr>
        ))
      }    

      </tbody>
    </table>
      

    </div>
  );
}

export default App;
