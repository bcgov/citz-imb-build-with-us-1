import { useMemo } from "react";

export const useGameEngine = (userList) => {
  console.log({ userList });

  const cardList = useMemo(() => {
    let newCardList = [];
    const newUserList = userList.map((user) => {
      return {
        id: user.id,
        name: user.name,
        position: user.position,
        profilePicture: user.profilePicture,
        isFlipped: false,
      };
    });

    newCardList = [...newUserList, ...newUserList];
    console.log({ newCardList });
    newCardList.sort(() => Math.random() - 0.5);

    return newCardList;
  }, []);

  const pickCard = (source, target) => {
    if (cardList[source].id === cardList[target].id) {
      cardList[source].isFlipped = true;
      cardList[target].isFlipped = true;
    }
    return;
  };

  return { cardList, pickCard };
};
