import React from "react";
//MaterialUi

import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  root: {
    flexGrow: 1,
  },
  appBar: {
    marginBottom: 20,
  },
}));

const NavBar = ({showDrawer, setShowDrawer, history, title}) => {

  const classes = useStyles()
  const handleDrawer = () => {
    console.log(showDrawer);
    setShowDrawer(!showDrawer);
  }; 


  const handleLogOut  = () => {
    localStorage.removeItem('token')
    history.push('/')
  }

  return (
    <AppBar position="static" className={classes.appBar}>
      <Toolbar variant="dense">
        <IconButton
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="menu"
          onClick={handleDrawer}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" className={classes.title}>
          {title}
        </Typography>
        <Button onClick={handleLogOut} color="inherit">Logout</Button>
      </Toolbar>
    </AppBar>
  );
};


export default NavBar