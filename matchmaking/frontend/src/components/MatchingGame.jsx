import React, { useEffect, useMemo, useState } from "react";
import MemoryCard from "./MemoryCard";
import { Grid } from "@mui/material";
import computer_man from "../assets/computer_man.svg";

const MatchingGame = () => {
  const isClickedCardsAPair = () => {
    // TODO
  };

  const resetClickedCards = () => {
    // TODO
  };

  useEffect(() => {
    // TODO
  }, []);

  const handleBoxClick = (x, y) => {
    // TODO
  };

  return (
    <div className="matching-game">
      <Grid container spacing={1}>
        {/* 
            TODO
        */}
        <Grid item xs={12} textAlign="center">
          <h2>Matching Game will go here</h2>
        </Grid>
        <Grid item xs={4}>
          <MemoryCard cardType="unrevealed" />
        </Grid>
        <Grid item xs={4}>
          <MemoryCard
            cardType="person"
            name="John Doe"
            position="Developer"
            profilePicture="https://api.dicebear.com/5.x/micah/svg"
          />
        </Grid>
        <Grid item xs={4}>
          <MemoryCard cardType="points" points={60} />
        </Grid>
      </Grid>
    </div>
  );
};

export default MatchingGame;
