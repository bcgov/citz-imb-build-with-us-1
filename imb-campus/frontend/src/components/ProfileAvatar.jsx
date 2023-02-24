import * as React from "react";
import { Avatar } from "@mui/material";
import useAuthService from "../services/auth/useAuthService";

const stringToColor = (string) => {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
};

const stringAvatar = (name, size, fontSize) => ({
  sx: {
    bgcolor: stringToColor(name),
    height: size ?? "35px",
    width: size ?? "35px",
    fontSize: fontSize ?? "1.25rem",
  },
  children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
});

const ProfileAvatar = (props) => {
  const { state: authState } = useAuthService();
  const { size } = props;
  const user = authState.userInfo;

  switch (size) {
    case "large":
      // LARGE AVATAR
      return (
        <Avatar
          alt="Profile Photo"
          {...stringAvatar(
            user?.given_name + " " + user?.family_name,
            "100px",
            "3rem"
          )}
        />
      );
    default:
      // SMALL AVATAR (DEFAULT)
      return (
        <Avatar
          alt="Profile Photo"
          {...stringAvatar(
            user?.given_name + " " + user?.family_name,
            "35px",
            "1.25rem"
          )}
        />
      );
  }
};

export default ProfileAvatar;

