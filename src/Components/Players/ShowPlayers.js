import React, { useState } from "react";
import { useQuery, gql } from '@apollo/client';

// import { createFragmentContainer, graphql } from "react-relay"
// Material table
import MaterialTable from "material-table";

//MaterialUI

import { Container } from "@material-ui/core";

import NavBar from "../Navigation/NavBar";
import LeftDrawer from "../Navigation/LeftDrawer";

const columns = [
  {
    title: "ID",
    field: "id",
    hidden: true
  },
  {
    title: "Nombre",
    field: "username",
  },
  {
    title: "ELO",
    field: "elo"
  }
];

const ShowPlayers = ({ history }) => {
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

  const PLAYERS_QUERY = gql`
  query allPlayers {
    allPlayers{
      edges {
        node {
          id
          username
          elo
        }
      }
    }
  }
`;

  const {data, loading} = useQuery(PLAYERS_QUERY)
  let tableData = []
  if (data){
    tableData = data.allPlayers.edges.map(element => {return {id: element.node.id, username: element.node.username, elo: element.node.elo}})
  }

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
          isLoading={loading}
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
