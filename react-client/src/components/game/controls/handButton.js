import React, { Component } from 'react';

import { SHAPES_IMG_MAP } from  '../../../globals/shapeImgMapping';

import * as ShapeCode from '../../../globals/shapeCode';

class HandButton extends Component {

  constructor(props) {
    super(props);
    this.onClickHandler = this.onClickHandler.bind(this);
  }

  onClickHandler() {
    const { type, onClickHandler } = this.props;
    if(type.includes('ROCK'))     onClickHandler(ShapeCode.ROCK);
    if(type.includes('PAPER'))    onClickHandler(ShapeCode.PAPER);
    if(type.includes('SCISSORS')) onClickHandler(ShapeCode.SCISSORS);
  }

  render() {

    const { type, onClickHandler } = this.props;

    return (
      <div onClick={this.onClickHandler} className="hand-button">
        <img alt="user-hand-button" className="hand-image" src={SHAPES_IMG_MAP[type]} />
      </div>
    );

  };

}

export default HandButton;
