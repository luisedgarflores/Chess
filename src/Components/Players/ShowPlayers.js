import React, { useState, useRef, useEffect } from "react";
// Material table
import MaterialTable from "material-table";

//MaterialUI

import { Container, Grid } from "@material-ui/core";

import NavBar from "../Navigation/NavBar";
import LeftDrawer from "../Navigation/LeftDrawer";

const axios = require("axios");

const columns = [
  {
    title: "ID",
    field: "id",
  },
  {
    title: "Nombre",
    field: "name",
  },
];

const ShowPlayers = ({ history }) => {
  const [tableData, setTableData] = useState([]);
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

  const requestTableData = () => {
    axios({
      method: "get",
      headers: { Authorization: "Token " + localStorage.getItem("token") },
      url: "http://192.81.219.106:8000/api/players",
    })
      .then((response) => {
        setTableData(response.data);
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
        title="Jugadores"
        history={history}
      />
      <LeftDrawer
        showDrawer={showDrawer}
        toggleDrawer={toggleDrawer}
        history={history}
      /> 
      <Container>
        <MaterialTable
          title="Jugadores"
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

export default ShowPlayers;
