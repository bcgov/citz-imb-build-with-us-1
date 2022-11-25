import { Card, CardContent } from "@mui/material";
import React from "react";
import "./MemoryCard.css";
import treasure_chest from "../../assets/treasure_chest.svg";

const UnrevealedCard = () => {
  return (
    <div className="memory-card memory-card__unrevealed">
      <img src={treasure_chest} />
    </div>
  );
};

export default UnrevealedCard;
