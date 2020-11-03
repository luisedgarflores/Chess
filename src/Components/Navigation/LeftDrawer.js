import React from "react";
//MaterialUi

import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import PeopleIcon from "@material-ui/icons/People";
import HomeIcon from "@material-ui/icons/Home";
import HourglassFullIcon from '@material-ui/icons/HourglassFull';

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

const links = [
  {
    text: "Inicio",
    link: "/home",
  },
  {
    text: "Jugadores",
    link: "/players",
  },
  {
    text: "Partidas",
    link: "/matches",
  },
];

const LeftDrawer = ({ showDrawer, toggleDrawer, history }) => {
  const icons = {
    Jugadores: <PeopleIcon />,
    Partidas: <HourglassFullIcon />,
    Inicio: <HomeIcon />,
  };

  const handleRoute = (link) => {
    history.replace(link)
  };

  const classes = useStyles();
  const list = (anchor) => (
    <div
      className={classes.list}
      role="presentation"
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {links.map((link, index) => (
          <ListItem button key={index} onClick={() => handleRoute(link.link)}>
            <ListItemIcon>{icons[link.text]}</ListItemIcon>
            <ListItemText primary={link.text} />
          </ListItem>
        ))}
      </List>
      <Divider />
    </div>
  );

  return (
    <Drawer anchor="left" open={showDrawer} onClose={toggleDrawer(false)}>
      {list("left")}
    </Drawer>
  );
};

export default LeftDrawer;
