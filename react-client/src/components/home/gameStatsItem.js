import React from 'react';

const GameStatsItem = ({ color, iconClass, label, value }) => {
  return (
    <div className="ui statistics">
      <div className={`${color || ''} statistic`}>
        <div className="value">
          <i className={`${iconClass} icon`}></i>  {value}
        </div>
        <div className="label">
          {label}
        </div>
      </div>
    </div>
  );
}

export default GameStatsItem;
