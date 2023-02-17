import { Card } from "@mui/material";
import React from "react";
import PersonCard from "./PersonCard";
import PointCard from "./PointCard";
import UnrevealedCard from "./UnrevealedCard";

const MemoryCard = (props) => {
  return (
    <div>
      {props.cardType === "unrevealed" ? <UnrevealedCard {...props} /> : ""}
      {props.cardType === "points" ? <PointCard {...props} /> : ""}
      {props.cardType === "person" ? <PersonCard {...props} /> : ""}
    </div>
  );
};

export default MemoryCard;
