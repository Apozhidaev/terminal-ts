import './styles.css';
import React from 'react';


const ProgressBar = ({ progress, className, percent = 100 }) => (
  <div className={className}>
    {progress && (
      <div className="progress">
        <div
          className="progress-bar progress-bar-striped progress-bar-animated"
          style={{ width: `${percent}%` }}
        />
      </div>
    )}
  </div>
);

export default ProgressBar;
