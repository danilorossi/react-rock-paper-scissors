import React, { Component } from 'react';
import 'semantic-ui/dist/components/progress.min.js';
import 'semantic-ui/dist/components/dimmer.min.js';
import { connect } from 'react-redux';

import * as GameStatus from '../../globals/gameStatus';

import GameOverlay from './gameOverlay';

import PlayerScore from './header/playerScore';
import Playground from './playground/playground';
import GameControls from './controls/gameControls';

import { saveGameResult } from '../../actions/statsActions';

import {
  playerMoves
} from '../../actions/gameActions';

class GamePage extends Component {

  state = {
    dimmerClass: ''
  }

  constructor(props) {
    super(props);
    // When reloading the game URL, redirect to home page
    if(this.props.gameStatus === GameStatus.UNDEFINED) {
      this.props.history.push('/');
      return;
    }
    this.goHomeClick = this.goHomeClick.bind(this);
  }

  goHomeClick() {
    this.props.saveGame(this.props.opponent.name, this.props.winner);
    this.props.history.push('/');
  }

  componentWillReceiveProps(nextProps) {

    // If the game is finished
    if(nextProps.gameStatus === GameStatus.FINISHED) {
      setTimeout(() => {

        // Show the overlay in 1 second
        this.setState({
          dimmerClass: 'active'
        })
      }, 1000);
    }
  }
  render() {

    const { winner } = this.props;

    return (
      <div>

        <GameOverlay
          dimmerClass={this.state.dimmerClass}
          winner={winner}
          onRetryClick={this.goHomeClick}
        />

        <div className="ui grid">

          <div className="seven wide column ">

            <PlayerScore position="left" player={this.props.player}/>

          </div>

          <div className="two wide column versus-image">

            <img alt="versus-image" src="/assets/images/vs.png" />

          </div>

          <div className="seven wide column ">

            <PlayerScore position="right" player={this.props.opponent}/>

          </div>

          <div className="sixteen wide column">

            <Playground
              winner={this.props.winner}
              playerShapeCode={this.props.player.shapeCode}
              opponentShapeCode={this.props.opponent.shapeCode}
              gameStatus={this.props.gameStatus}
              gameState={this.props.gameState}/>

          </div>

          <GameControls
            gameStatus={this.props.gameStatus}
            gameState={this.props.gameState}
            onPlayerMove={this.props.playerMoves}
          />

        </div>

      </div>
    );
  };

}


function mapStateToProps(state, ownProps) {
  return {
      player: {
        name: state.currentGame.playerName,
        energy: state.currentGame.playerEnergy,
        shapeCode:  state.currentGame.playerShapeCode
      },
      opponent: {
        name: state.currentGame.opponentName,
        energy: state.currentGame.opponentEnergy,
        shapeCode:  state.currentGame.opponentShapeCode
      },
      gameStatus: state.currentGame.status,
      gameState: state.currentGame.roundState,
      winner: state.currentGame.winner
  };
}

function mapDispatchToProps (dispatch) {
  return {
    playerMoves: (playerShapeCode) => dispatch(playerMoves(playerShapeCode)),
    saveGame: (playerScore, opponentScore) => dispatch(saveGameResult(playerScore, opponentScore))
  }
}

export default connect (
  mapStateToProps,
  mapDispatchToProps
)(GamePage);
// export default GamePage;
