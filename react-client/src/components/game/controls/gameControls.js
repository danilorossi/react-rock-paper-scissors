import React from 'react';

import * as RoundStatus from '../../../globals/roundStatus';
import * as GameStatus from '../../../globals/gameStatus';

import HandButton from './handButton';

const GameControls = ({ gameStatus, gameState, onPlayerMove }) => {

  const controlsOverlayClass = (gameState !== RoundStatus.WAITING_PLAYER_CHOICE && gameStatus !== GameStatus.FINISHED ? 'active':'');
  return (

    <div className="game-controls ui grid">

      <div className={`controls-dimmer ui inverted dimmer ${controlsOverlayClass}`} />

        <div className="two wide column "></div>

        <div className="four wide column ">
          <HandButton onClickHandler={onPlayerMove} type="LEFT-ROCK"/>
        </div>

        <div className="four wide column ">
          <HandButton onClickHandler={onPlayerMove} type="LEFT-PAPER" />
        </div>

        <div className="four wide column ">
          <HandButton onClickHandler={onPlayerMove} type="LEFT-SCISSORS" />
        </div>

        <div className="two wide column "></div>

    </div>
  );
}

export default GameControls;
