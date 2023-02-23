//create a hook called useUndiscoveredUsers that will return the undiscovered users mock data
import { useMemo } from "react";

export const useUndiscoveredUsers = () => {
  const mockData = {
    data: [
      {
        id: "1",
        name: "Scott Toews",
        position: "Developer",
        profilePicture: "airplane.png",
      },
      {
        id: "2",
        name: "Chris McGlone",
        position: "Team Lead",
        profilePicture: "airplane.png",
      },
      {
        id: "3",
        name: "Sharala Perumal",
        position: "Developer",
        profilePicture: "airplane.png",
      },
      {
        id: "4",
        name: "Lawrence Lau",
        position: "Developer",
        profilePicture: "airplane.png",
      },
      {
        id: "5",
        name: "Matt Morris",
        position: "Technical Architect",
        profilePicture: "airplane.png",
      },
      {
        id: "6",
        name: "Brandon Bouchard",
        position: "Developer",
        profilePicture: "airplane.png",
      },
      {
        id: "7",
        name: "Zach Bourque",
        position: "Technical Architect",
        profilePicture: "airplane.png",
      },
      {
        id: "8",
        name: "Molly Pilchar",
        position: "Archivist",
        profilePicture: "airplane.png",
      },
    ],
  };

  const undiscoveredUsers = useMemo(() => mockData, []);
  console.log(undiscoveredUsers);
  return undiscoveredUsers.data;
};
