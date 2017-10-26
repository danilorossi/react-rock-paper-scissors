import React from 'react';

const PlayButton = ({ onClickHandler, label }) => {
  return (
    <div onClick={onClickHandler} className="ui vertical big blue animated button" tabIndex="0">
      <div className="visible content">{label}</div>
      <div className="hidden content">
        PLAY
      </div>
    </div>
  );
}

export default PlayButton;
