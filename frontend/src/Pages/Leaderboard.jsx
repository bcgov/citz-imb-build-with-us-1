import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import maestroIcon from "../../public/icon1.jpg";
import kramerIcon from "../../public/icon2.jpg";
import elaineIcon from "../../public/icon3.jpg";
import georgeIcon from "../../public/icon4.jpg";
import burgerIcon from "../../public/burgerIcon.png";
import goldBadgeIcon from "../../public/goldBadge.png";
import spaceshipIcon from "../../public/spaceshipIcon.png";
import { Avatar, CardHeader, Tooltip } from "@mui/material";
import { Stack } from "@mui/system";

function createData(rank, name, points, timesHelped, badges, profilePicture) {
  return { rank, name, points, timesHelped, badges, profilePicture };
}

const burgerBadge = {
  name: "Hungry For More!",
  description: "Ate a lot of burgers.",
  src: burgerIcon,
};

const goldBadge = {
  name: "Gold Badge!",
  description: "All that glitter.",
  src: goldBadgeIcon,
};
const spaceshipBadge = {
  name: "To The Moon!",
  description: "Helped a new user with initiation.",
  src: spaceshipIcon,
};

// Row Headers: Rank, Name, Points, TimesHelped, Badges
const rows = [
  createData(
    1,
    "Maestro",
    745,
    54,
    [burgerBadge, goldBadge, spaceshipBadge],
    maestroIcon
  ),
  createData(2, "Kramer", 521, 37, [goldBadge, spaceshipBadge], kramerIcon),
  createData(3, "Elaine", 507, 24, [spaceshipBadge], elaineIcon),
  createData(4, "George", 322, 10, [], georgeIcon),
];

export default function Leaderboard() {
  return (
    <TableContainer
      component={Paper}
      sx={{ height: "fit-content", marginTop: "20px" }}
    >
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center" sx={{ fontWeight: "bold" }}>
              Rank
            </TableCell>
            <TableCell align="left" sx={{ fontWeight: "bold" }}>
              Name&nbsp;
            </TableCell>
            <TableCell align="left" sx={{ fontWeight: "bold" }}>
              Points&nbsp;
            </TableCell>
            <TableCell align="left" sx={{ fontWeight: "bold" }}>
              Times Helped&nbsp;
            </TableCell>
            <TableCell align="left" sx={{ fontWeight: "bold" }}>
              Badges&nbsp;
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="center" component="th" scope="row">
                {row.rank}
              </TableCell>
              <TableCell align="left">
                <CardHeader
                  avatar={
                    <Avatar
                      alt={`${row.name} profile picture`}
                      src={row.profilePicture}
                    />
                  }
                  title={row.name}
                />
              </TableCell>
              <TableCell align="center">{row.points}</TableCell>
              <TableCell align="center">{row.timesHelped}</TableCell>
              <TableCell align="center">
                <Stack direction="row">
                  {row.badges?.map?.((badge) => (
                    <Tooltip
                      title={
                        <div>
                          {badge.name}
                          <br />
                          {badge.description}
                        </div>
                      }
                      key={badge.name}
                    >
                      <Avatar
                        variant="square"
                        src={badge.src}
                        sx={{ width: 24, height: 24 }}
                      />
                    </Tooltip>
                  ))}
                </Stack>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
