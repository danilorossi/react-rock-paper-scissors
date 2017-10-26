import React from 'react';

const PlaygroundOverlay = ({ dimmerMessage, dimmerIcon, dimmerVisible }) => {

  return (
    
    <div className={`${dimmerVisible ? 'active' : ''} ui dimmer playground-dimmer`}>
      <div className="content">
        <div className="center">
          <h2 className="inverted ui icon header">
            <i className={dimmerIcon}></i>
            {dimmerMessage}
          </h2>
        </div>
      </div>
    </div>

  );
}

export default PlaygroundOverlay;
