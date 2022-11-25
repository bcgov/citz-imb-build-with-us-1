import { Typography } from "@mui/material";
import React from "react";
import point_icon from "../../assets/heart_face.svg";

const PointCard = (props) => {
  return (
    <div className="memory-card memory-card__points">
      <img src={point_icon} className="memory-card__points-icon" />
      <strong className="memory-card__points--text">
        {props.points} points
      </strong>
    </div>
  );
};

export default PointCard;
