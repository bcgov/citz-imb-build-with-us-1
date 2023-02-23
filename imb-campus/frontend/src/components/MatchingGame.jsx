import React, { useEffect, useMemo, useState } from "react";
import MemoryCard from "./MemoryCard";
import { Grid } from "@mui/material";
import { useUndiscoveredUsers } from "../hooks";

const MatchingGame = () => {
  const isClickedCardsAPair = () => {
    // TODO
  };

  const resetClickedCards = () => {
    // TODO
  };

  useEffect(
    () => {
      // TODO
    },
    [
      /* Need to add dependency(ies) */
    ]
  );

  const handleBoxClick = (x, y) => {
    // TODO
  };
  const unDiscoveredUsers = useUndiscoveredUsers();
  return (
    <div className="matching-game">
      <Grid container spacing={1}>
        <Grid item xs={12} textAlign="center">
          <h2>Matching Game will go here</h2>
        </Grid>
        {unDiscoveredUsers.map((element) => (
          <Grid item xs={3}>
            <MemoryCard
              cardType="person"
              name={element.name}
              position={element.position}
              profilePicture={element.profilePicture}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default MatchingGame;
