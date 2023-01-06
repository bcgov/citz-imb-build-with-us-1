import { Container, Stack } from "@mui/system";
import { Button, Grid, Typography } from "@mui/material";
import "./LandingPage.css";
import LaptopGuy from "../assets/laptop_guy.svg";
import Like from "../assets/like.svg";
import LaptopGirls from "../assets/laptop_girls.svg";
import IpadGirl from "../assets/ipad_girl.svg";
import ComputerMan from "../assets/computer_man.svg";
import ComputerWoman from "../assets/computer_woman.svg";
import React from "react";
import PageLayout from "../layout/PageLayout";

const LandingPage = () => {
  return (
    <Stack className="landing-page">
      <div className="landing-page__section">
        <PageLayout>
          <Grid
            container
            justifyContent="space-between"
            alignItems="center"
            gap={2}
          >
            <Grid item xs={12} sm={5}>
              <Stack gap={2}>
                <Typography
                  variant="h1"
                  sx={{
                    fontSize: "4rem",
                    WebkitTextStroke: "2px black",
                    color: "#68D1BF",
                    fontWeight: 600,
                  }}
                >
                  Meet with your Coworkers
                </Typography>
                <Typography variant="body1">
                  Interactive IMB Onboarding Platform
                </Typography>
                <Button sx={{ width: "150px" }}>Login with IDIR</Button>
              </Stack>
            </Grid>
            <Grid item xs={12} sm={5}>
              <Stack direction="row">
                <span className="landing-page__main-images--laptop-guy">
                  <span>
                    <img
                      src={Like}
                      className="landing-page__laptop-guy--like"
                    />

                    <img
                      src={LaptopGuy}
                      className="landing-page__main-images--image"
                    />
                  </span>

                  <div className="puzzle"></div>
                  <div className="lines"></div>
                </span>

                <span className="landing-page__main-images--laptop-girls">
                  <div className="landing-page__lines-2"></div>
                  <div className="landing-page__airplane"></div>
                  <img
                    className="landing-page__main-images--image"
                    src={LaptopGirls}
                  />
                </span>
              </Stack>
            </Grid>
          </Grid>
        </PageLayout>
      </div>
      <div className="landing-page__section lp-teal">
        <PageLayout>
          <Grid
            container
            alignItems="center"
            justifyContent="space-between"
            gap={2}
          >
            <Grid item xs={12} sm={5}>
              <img src={IpadGirl} className="landing-page__main-image" />
            </Grid>
            <Grid item xs={12} sm={5}>
              <Typography variant="h4">
                Play fun games to learn about IMB and the people
              </Typography>
            </Grid>
          </Grid>
        </PageLayout>
      </div>
      <div className="landing-page__section">
        <PageLayout>
          <Grid
            container
            alignItems="center"
            justifyContent="space-between"
            gap={2}
          >
            <Grid item xs={12} sm={5}>
              <Typography variant="h4">
                Find your mentor & mentee and share experiences
              </Typography>
            </Grid>
            <Grid item xs={12} sm={5}>
              <img src={ComputerMan} className="landing-page__main-image" />
            </Grid>
          </Grid>
        </PageLayout>
      </div>
      <div className="landing-page__section lp-pink">
        <PageLayout>
          <Grid
            container
            alignItems="center"
            justifyContent="space-between"
            gap={2}
          >
            <Grid item xs={12} sm={5}>
              <img src={ComputerWoman} className="landing-page__main-image" />
            </Grid>
            <Grid item xs={12} sm={5}>
              <Typography variant="h4">
                Make friends and gain rewards
              </Typography>
            </Grid>
          </Grid>
        </PageLayout>
      </div>
    </Stack>
  );
};

export default LandingPage;
