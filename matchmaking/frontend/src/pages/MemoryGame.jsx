import React from "react";
import PageLayout from "../../../../frontend/src/Layout/PageLayout";
import MemoryCard from "../components/MemoryCard";
import profile_picture from "../assets/profile_picture.svg";

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
      <MemoryCard
        cardType="person"
        name="Mary Kim"
        position="UX Designer"
        profilePicture={profile_picture}
      />
    </PageLayout>
  );
};

export default MemoryGame;
