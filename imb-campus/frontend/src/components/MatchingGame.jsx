import React, { useEffect, useMemo, useState } from "react";
import MemoryCard from "./MemoryCard";
import { Grid } from "@mui/material";
import { useGameEngine, useUndiscoveredUsers } from "../hooks";

const MatchingGame = () => {
  const unDiscoveredUsers = useUndiscoveredUsers();
  const { cardList, pickCard } = useGameEngine(unDiscoveredUsers);

  const [sourceId, setSourceId] = useState(-1);

  const handleBoxClick = (cardIndex) => {
    console.log(sourceId, cardIndex);
    if (sourceId >= 0) {
      pickCard(sourceId, cardIndex);
      setSourceId(-1);
    } else {
      setSourceId(cardIndex);
    }
  };

  return (
    <div className="matching-game">
      <Grid container spacing={1}>
        <Grid item xs={12} textAlign="center">
          <h2>Matching Game will go here</h2>
        </Grid>
        {cardList.map((element, index) => {
          const cardType = element.isFlipped ? "person" : "unrevealed";

          return (
            <Grid
              item
              xs={3}
              key={`cardid-${index}`}
              onClick={() => handleBoxClick(index)}
            >
              <MemoryCard
                cardType={cardType}
                name={element.name}
                position={element.position}
                profilePicture={element.profilePicture}
              />
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};

export default MatchingGame;
