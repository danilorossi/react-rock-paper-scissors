import React, { Component } from 'react';

import { SHAPES_IMG_MAP } from  '../../../globals/shapeImgMapping';
import { CODE_TO_SHAPE } from  '../../../globals/shapeCode';

import * as RoundStatus from  '../../../globals/roundStatus';
import * as GameStatus from  '../../../globals/gameStatus';

import PlaygroundOverlay from './playgroundOverlay';

class Playground extends Component {

  state = {
    winner: null
  };

  componentWillReceiveProps(nextProps) {

    // if we are going to play next round, hide result and previous play shapes
    if(nextProps.gameState === RoundStatus.WAITING_PLAYER_CHOICE) {
      this.setState({
        showRoundResult: false,
        leftIconClass: null,
        rightIconClass: null
      });
    } else if(
      nextProps.gameState === RoundStatus.ROUND_FINISHED ||
      nextProps.gameState === RoundStatus.GAME_FINISHED
    ) { // Else, if the game or the round is finished

      // Notify the UI with a consisten emssage
      setTimeout(() => {
        this.setState({
          showRoundResult: true,
          leftIconClass: (nextProps.winner === 'PLAYER' ? 'winner' : 'looser'),
          rightIconClass: (nextProps.winner === 'OPPONENT' ? 'winner' : 'looser')
        })
      }, 1000);
    }

  }

  render() {

    const { winner, playerShapeCode, opponentShapeCode, gameStatus, gameState } = this.props;
    const dimmerVisible = gameState === RoundStatus.WAITING_PLAYER_CHOICE || this.state.showRoundResult;

    let dimmerIcon = '';
    let dimmerMessage = null;

    if(gameState === RoundStatus.WAITING_PLAYER_CHOICE) {
      dimmerIcon = 'wait loading icon';
      dimmerMessage = 'YOUR TURN!';
    }

    if(this.state.showRoundResult && !winner) {
      dimmerMessage = 'TIE!';
    }

    if(this.state.showRoundResult && winner) {
      dimmerIcon = (winner === 'PLAYER' ? 'yellow star icon' : '');
      dimmerMessage = (winner === 'PLAYER' ? 'YOU WIN' : 'OPPONENT WINS');
    }

    return (
      <div className="playground">

        <div>

          { gameStatus === GameStatus.ONGOING && (

            <PlaygroundOverlay
              dimmerVisible={dimmerVisible}
              dimmerMessage={dimmerMessage}
              dimmerIcon={dimmerIcon}
            />

          )}

          {(gameState === RoundStatus.ROUND_FINISHED || gameState === RoundStatus.GAME_FINISHED) && (

            <div className=" ui grid" style={{ marginTop: '40px' }}>

              <div className="left aligned eight wide column">
                <img alt="player shape" className={`${this.state.leftIconClass} player played-shape`} src={SHAPES_IMG_MAP[`LEFT-${CODE_TO_SHAPE[playerShapeCode]}`]} />
              </div>

              <div className="right aligned eight wide column ">
                <img alt="opponent shape" className={`${this.state.rightIconClass} opponent played-shape`} src={SHAPES_IMG_MAP[`RIGHT-${CODE_TO_SHAPE[opponentShapeCode]}`]} />
              </div>

            </div>
          )}

        </div>

      </div>
    );
  }

}

export default Playground;
