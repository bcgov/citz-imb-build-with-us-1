import { useState, useEffect } from 'react';

export const useGameEngine = (userList) => {
  const [cardList, setCardList] = useState([]);

  const pickCard = (source, target) => {
    if (source.id === target.id) {
      newCardList[source.index].isFlipped = true;
      newCardList[target.index].isFlipped = true;
    }
    return;
  }
  useEffect(() => {
    const newCardList = userList.map((user) => {
      return {
        id: user.id,
        name: user.name,
        position: user.position,
        profilePicture: user.profilePicture,
        isFlipped: false,
      };
    });

    newCardList.push(...newCardList);

    newCardList.sort(() => Math.random() - 0.5);

    setCardList(newCardList);
  }, []);

  return { cardList, pickCard };
}
