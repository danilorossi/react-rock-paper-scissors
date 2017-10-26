import React from 'react';

const GameOverlay = ({ dimmerClass, winner, onRetryClick }) => {
  return (

    <div className={`ui inverted page dimmer ${dimmerClass}`}>

      <div className="content">

        <div className="center">

          <div className="ui huge icon header">

            {winner === 'PLAYER' &&
              <div>
                <i className="yellow loading trophy icon"></i>
                You won the game!
              </div>
            }
            {winner === 'OPPONENT' &&
              <div>
                <i className="yellow frown trophy icon"></i>
                You. Just. Lost.
              </div>
            }
          </div>

          <div className="center">

            <button onClick={onRetryClick} className="ui vertical blue animated button" tabIndex="0">
              <div className="hidden content">RETRY</div>
              <div className="visible content">
                <i className="checkmark icon"></i>
              </div>
            </button>

          </div>

        </div>

      </div>

    </div>


  );
}

export default GameOverlay;
