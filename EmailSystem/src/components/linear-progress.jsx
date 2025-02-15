import React from "react";
import "../styles/batch-manager-styles.css";

const LinearProgressBar = ({ totalProgress, currentProgress }) => {
  const progressPercentage = (currentProgress / totalProgress) * 100;

  return (
    <div className="progress-bar-container">
      <div
        className="progress-bar"
        style={{ width: `${progressPercentage}%` }}
      ></div>
      <span className="progress-text">{`${Math.round(
        progressPercentage
      )}%`}</span>
    </div>
  );
};

export default LinearProgressBar;
