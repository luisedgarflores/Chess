import React, {useState} from "react";
import { Container, Grid, Typography } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";


import NavBar from "../Navigation/NavBar";
import LeftDrawer from "../Navigation/LeftDrawer";

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
        alignItems="center"
        className={classes.container}
      >
        <Grid item xs={12}>
          <Typography align='center' variant="h1">HOME</Typography>
        </Grid>
      </Grid>
    </Container>
    </>
  );
};

export default Home;
