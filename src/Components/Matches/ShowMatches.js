import React, { useState, useRef, useEffect } from "react";
// Material table
import MaterialTable from "material-table";

//MaterialUI

import { Container } from "@material-ui/core";

import NavBar from "../Navigation/NavBar";
import LeftDrawer from "../Navigation/LeftDrawer";

const axios = require("axios");

const columns = [
  {
    title: "ID",
    field: "id",
    hidden: true
  },
  {
    title: "Jugador 1",
    field: "player_w",
  },
  {
    title: "Jugador 2",
    field: "player_b",
  },
  {
    title: "Ganador",
    field: "winner",
  },
  {
    title: "Fecha",
    field: "date",
  },
];

const ShowMatches = ({ history }) => {
  const [tableData, setTableData] = useState([]);
  const [showDrawer, setShowDrawer] = useState(false);
  const [loading, setLoading] = useState(true)

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setShowDrawer(open);
  };

  const setUpTableData = (matchesData, playersData) => {
    const playersMatch = {}

    for (let index = 0; index < playersData.length; index++) {
      const player = playersData[index];
      playersMatch[player.id] = {
        ...player,
      }
    }

    const newData = matchesData.map((match) => {
      return {
        ...match,
        player_w: playersMatch[match.player_w].name,
        player_b: playersMatch[match.player_b].name,
        winner: playersMatch[match.winner].name,
      };
    });

    setTableData(newData);
    setLoading(false)
  };

  const requestTableData = () => {
    axios({
      method: "get",
      headers: { Authorization: "Token " + localStorage.getItem("token") },
      url: "http://192.81.219.106:8000/api/matches",
    })
      .then((matchesData) => {
        axios({
          method: "get",
          headers: { Authorization: "Token " + localStorage.getItem("token") },
          url: "http://192.81.219.106:8000/api/players",
        })
          .then((playersData) => setUpTableData(matchesData.data, playersData.data))
          .catch((err) => console.log(err));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      requestTableData();
      firstRender.current = false;
    }
  });

  return (
    <>
      <NavBar
        showDrawer={showDrawer}
        setShowDrawer={setShowDrawer}
        title="Partidas"
        history={history}
      />
      <LeftDrawer
        showDrawer={showDrawer}
        toggleDrawer={toggleDrawer}
        history={history}
      />
      <Container>
        <MaterialTable
          title="Partidas"
          isLoading={loading}
          data={tableData}
          columns={columns}
          options={{
            search: true,
            paging: true,
            filtering: true,
            exportButton: true,
          }}
        />
      </Container>
    </>
  );
};

export default ShowMatches;
