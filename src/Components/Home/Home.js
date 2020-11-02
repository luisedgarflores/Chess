import React from "react";
import { Container, Grid, Typography } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";
//utils
import BasicButton from "../RootComponents/BasicButton";

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
  const handleLogout = () => {
    localStorage.removeItem('token')
    props.history.push("/login");
  };

  return (
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
        <BasicButton fullWidth={true} handleClick={handleLogout}>Logout</BasicButton>
      </Grid>
    </Container>
  );
};

export default Home;
