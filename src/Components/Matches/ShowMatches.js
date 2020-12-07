import React, { useState } from "react";
import { useQuery, gql } from '@apollo/client';

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
    title: "Blancas",
    field: "playerW",
  },
  {
    title: "Negras",
    field: "playerB",
  },
  {
    title: "Ganador",
    field: "winner",
  },
];

const MATCHES_QUERY = gql`
query allMatches{
  allMatches{
    edges{
      node{
        playerW{username},
        playerB{username},
        winner
      }
    }
  }
}
`;

const ShowMatches = ({ history }) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const {data, loading} = useQuery(MATCHES_QUERY)
  let tableData = []
  if (data){
    console.log(data)
    tableData = data.allMatches.edges.map(element => {return {winner: element.node.winner==="white" ? "Blancas" : "Negras", playerW: element.node.playerW?.username, playerB: element.node.playerB?.username}})
  }

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setShowDrawer(open);
  };

  // const requestTableData = () => {
  //   axios({
  //     method: "get",
  //     headers: { Authorization: "Token " + localStorage.getItem("token") },
  //     url: "http://192.81.219.106:8000/api/matches",
  //   })
  //     .then((matchesData) => {
  //       axios({
  //         method: "get",
  //         headers: { Authorization: "Token " + localStorage.getItem("token") },
  //         url: "http://192.81.219.106:8000/api/players",
  //       })
  //         .then((playersData) => setUpTableData(matchesData.data, playersData.data))
  //         .catch((err) => console.log(err));
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };


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
