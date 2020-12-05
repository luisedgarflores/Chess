import React, { useState } from "react";
import { Container, Grid, Typography, Button, TextField } from "@material-ui/core";
// import { createFragmentContainer, graphql, QueryRenderer } from "react-relay"

import { makeStyles } from "@material-ui/core/styles";

import NavBar from "../Navigation/NavBar";
import LeftDrawer from "../Navigation/LeftDrawer";
import PlayerPrediction from "../Players/PlayerPrediction";
import ImgHolder from '../RootComponents/ImgHolder';


const useStyles = makeStyles({
  root: {
    height: "100vh",
  },
  container: {
    height: "100%",
  },
});

const Home = (props) => {
  const classes = useStyles();

  const [showDrawer, setShowDrawer] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setShowDrawer(open);
  };


  return (
    <>
      <NavBar
        showDrawer={showDrawer}
        setShowDrawer={setShowDrawer}
        title="Inicio"
        history={props.history}
      />
      <LeftDrawer
        showDrawer={showDrawer}
        toggleDrawer={toggleDrawer}
        history={props.history}
      />

      <Container fixed className={classes.root}>

        <Grid
          container
          justify="center"
          // alignItems="center"
          className={classes.container}
        >
          <Grid item xs={12} align='center'>
            <Typography align='center' variant="h3">Chess Masters</Typography>
          </Grid>

          <Grid item xs={3}>
            {<ImgHolder />}
          </Grid>

          <Grid item xs={2}>
            {PlayerPrediction(1)}
          </Grid>

          <Grid item xs={2} align='center'>
          <TextField id="standard-basic" label="Turns"/>
            <Typography></Typography>
            <Button variant="contained" color="primary" style={{top: "40px"}}>Predict</Button>
          </Grid>

          <Grid item xs={2} align='center'>
            {PlayerPrediction(2)}
          </Grid>

          <Grid item xs={3}>
            <ImgHolder />
          </Grid>

        </Grid>

      </Container>

    </>
  );
};

export default Home;
