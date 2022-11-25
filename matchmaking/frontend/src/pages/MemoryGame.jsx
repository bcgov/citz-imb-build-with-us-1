import React from "react";
import PageLayout from "../../../../frontend/src/Layout/PageLayout";
import MemoryCard from "../components/MemoryCard";

const MemoryGame = () => {
  const characters = [
    [{}, {}, {}, {}],
    [{}, {}, {}, {}],
    [{}, {}, {}, {}],
    [{}, {}, {}, {}],
  ];
  return (
    <PageLayout>
      <MemoryCard cardType="unrevealed" />
      <MemoryCard cardType="points" points={60} />
      <MemoryCard cardType="person" />
    </PageLayout>
  );
};

export default MemoryGame;
