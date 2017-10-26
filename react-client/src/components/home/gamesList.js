import React from 'react';

const GamesList = ({ games }) => {
  return (

    <div className="ui list">

      {games && games.map((game, index) => (

        <div key={index} className="item">
          <i className={`${(game.winner === 'PLAYER' ? 'yellow trophy' : 'red remove')} icon`}></i>
          <div className="content">
            <div style={{
              color: (game.winner === 'PLAYER' ? '#92dcfc' : 'rgb(62, 142, 181)')
            }} className="header">YOU vs {game.opponentName}</div>
          </div>
        </div>
      ))}

    </div>

  );
}

export default GamesList;
