import React from "react";
import PageLayout from "../layout/PageLayout";
import MemoryCard from "../components/MemoryCard";
import profile_picture from "../assets/profile_picture.svg";
import MatchingGame from "../components/MatchingGame";

const MatchingGamePage = () => {
  return (
    <PageLayout>
      <MatchingGame />
    </PageLayout>
  );
};

export default MatchingGamePage;
