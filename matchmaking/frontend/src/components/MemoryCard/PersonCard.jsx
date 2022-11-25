import React from "react";
import profile_picture from "../../assets/profile_picture.svg";

const image_url = "../../assets/profile_picture.svg";
const PersonCard = (props) => {
  return (
    <div
      className="memory-card memory-card__person"
      style={{ backgroundImage: `url(${profile_picture})` }}
    ></div>
  );
};

export default PersonCard;
