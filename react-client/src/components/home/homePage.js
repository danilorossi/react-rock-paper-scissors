import React, { Component } from 'react';
import { connect } from 'react-redux';

import { startNewGame } from '../../actions/gameActions';

import * as GameType from '../../globals/gameType';

import PlayButton from './playButton';
import GameStatsItem from './gameStatsItem';
import GamesList from './gamesList';

class HomePage extends Component {

  constructor(props) {
    super(props);
    this.playLocalGame = this.playLocalGame.bind(this);
    this.playRemoteGame = this.playRemoteGame.bind(this);
  }
  playLocalGame() {
    this.props.startGame(GameType.LOCAL);
    this.props.history.push('/game/local');
  }
  playRemoteGame() {
    this.props.startGame(GameType.REMOTE);
    this.props.history.push('/game/remote');
  }

  render() {

    const { games, stats } = this.props;
    
    return (

      <div className="homescreen-background">

        <div className="home-stats-left">

          <div className="games-table">

            <GamesList games={games} />

          </div>

        </div>


        <div className="home-stats-right">

          <div className="win-loss">

            <GameStatsItem iconClass="yellow star" color="yellow" label="WINS IN A ROW" value={stats.row} />

            <GameStatsItem iconClass="trophy" color="violet" label="Games won" value={stats.win} />

            <GameStatsItem iconClass="frown" color="blue" label="Games lost" value={stats.loss} />

          </div>

        </div>

        <div className="home-buttons">

          <PlayButton onClickHandler={this.playLocalGame} label="Local Game" />

          <PlayButton onClickHandler={this.playRemoteGame} label="Remote Game" />

        </div>

      </div>
    );
  };

}

function mapStateToProps(state, ownProps) {
  return {
    games: state.stats.games,
    stats: {
      win: state.stats.win,
      loss: state.stats.loss,
      row: state.stats.row
    }
  }
}

function mapDispatchToProps (dispatch) {
  return {
    startGame: (gameType) => dispatch(startNewGame(gameType)),
  }
}

export default connect (
  mapStateToProps,
  mapDispatchToProps
)(HomePage);
