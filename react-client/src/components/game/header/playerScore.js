import React, { Component } from 'react';

class PlayerScore extends Component {
 
    // Activate and update the progress SemanticUI component
    updateEnergy(percent) {
      window.$(this.energyBar).progress({
        percent
      })
    }

    componentDidMount() {
      this.updateEnergy(this.props.player.energy);
    }

    componentWillReceiveProps(nextProps) {
      if(this.props.player.energy !== nextProps.player.energy) {
        this.updateEnergy(nextProps.player.energy);
      }
    }

    render() {

      const { position, player } = this.props;

      return (
        <div className={`${position} score  ui centered`}>

        <div className="label">{player.name}</div>

          <div ref={(energyBar) => this.energyBar = energyBar} className={`ui indicating progress`}>
            <div className="bar"></div>
          </div>

        </div>
      );
    }

}

export default PlayerScore;
