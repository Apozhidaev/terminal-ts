import './styles.css';
import React from 'react';

type Props = {
  progress: boolean;
  className?: string;
  percent?: number;
};

const ProgressBar = ({ progress, className, percent = 100 }: Props) => (
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
