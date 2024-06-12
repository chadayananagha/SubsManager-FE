import React from "react";

const ProfileCompletionScore = ({ completionScore }) => {
  console.log(completionScore);
  return (
    <div
      className="radial-progress"
      style={{
        "--value": completionScore,
        "--size": "12rem",
        "--thickness": "2rem",
      }}
      role="progressbar"
    >
      {completionScore}%
    </div>
  );
};

export default ProfileCompletionScore;
