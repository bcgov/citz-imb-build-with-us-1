import React from "react";

const image_url = "../../assets/profile_picture.svg";
const PersonCard = (props) => {
  return (
    <div
      className="memory-card memory-card__person"
      style={{
        background: `linear-gradient( rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4) ), url(${props.profilePicture})`,
      }}
    >
      <strong>{props.name}</strong>
      <div>{props.position}</div>
    </div>
  );
};

export default PersonCard;
