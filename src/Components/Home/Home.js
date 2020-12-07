import React, { useState, useReducer } from "react";
import { useMutation, gql } from '@apollo/client';
import { player, turns } from "../Validations/validations";
import BasicInput from "../RootComponents/BasicInput";

import { Container, Grid, Typography, Button } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

import NavBar from "../Navigation/NavBar";
import LeftDrawer from "../Navigation/LeftDrawer";
import ImgHolder from '../RootComponents/ImgHolder';
import horse1 from '../RootComponents/blackKnight.png';
import horse2 from '../RootComponents/whiteKnight.png';


const useStyles = makeStyles({
  root: {
    height: "100vh",
  },
  container: {
    height: "100%",
  },
});

var validate = require("validate.js");

const PREDICT_MUTATION = gql`
mutation predict($data: PredictGameResultInput!) {
  predict(input: $data) {
    whiteProb
    drawProb
    blackProb
  }
}
`;

const constraints = {
  turns: turns,
  wElo: player,
  bElo: player
};

const parseErrors = (errors) => {
  if (errors && errors.length > 0) {
    return errors[errors.length - 1];
  } else {
    return "";
  }
};

const formReducer = (state, action) => {
  switch (action.type) {
    case "update":
      return {
        ...state,
        [action.name]: {
          value: action.value,
          errors: validate.single(action.value, constraints[action.name]),
        },
      };
    case "validate":
      const newState = { ...state };
      for (const key in newState) {
        if (newState.hasOwnProperty(key)) {
          const field = newState[key];
          field.errors = validate.single(field.value, constraints[key]);
        }
      }
      return newState;
    default:
      return {
        ...state,
      };
  }
};

const calculateTotalErrors = ({ form }) => {
  let acum = 0;
  for (const key in form) {
    if (form.hasOwnProperty(key)) {
      const field = form[key];
      acum += field.errors ? field.errors.length : 0;
    }
  }

  return acum;
};

const Home = (props) => {
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

  const [form, dispatchForm] = useReducer(formReducer, {
    turns: {
      value: "",
      errors: null,
    },
    wElo: {
      value: "",
      errors: null,
    },
    bElo: {
      value: "",
      errors: null,
    },
  });

  const [predict, { data }] = useMutation(PREDICT_MUTATION, {
    onError() {
      // console.log(JSON.stringify("error", null, 2))
      dispatchForm({ type: "setNoValidCredentials" })
    },
  })

  const classes = useStyles();

  const requestPrediction = () => {
    predict({
      variables: {
        data: {
          turns: form.turns.value,
          wElo: form.wElo.value,
          bElo: form.bElo.value
        }
      }
    })
  };

  let resultData = {}
  if (data) {
    resultData.whiteProb = data.predict.whiteProb
    resultData.drawProb = data.predict.drawProb
    resultData.blackProb = data.predict.blackProb
  }

  console.log(resultData)

  const handleOnSubmit = (event) => {
    event.preventDefault();
    dispatchForm({ type: "validate" });
    if (calculateTotalErrors({ form }) === 0) {
      requestPrediction()
    }
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
          style={{position: "relative", bottom: "100px"}}
        >
          <Grid item xs={12} align='center'>
            <Typography align='center' variant="h3" style={{position: "relative", top: "100px"}}>Chess Masters</Typography>
          </Grid>

          <Grid style={{position: "relative", right: "60px"}} item xs={3}>
            {<ImgHolder horse={horse2} />}
          </Grid>

          <Grid style={{position: "relative", right: "60px"}}item xs={2}>
            <h2>Jugador blancas</h2>
            <BasicInput
              value={form.wElo.value}
              dispatchValue={dispatchForm}
              errorText={parseErrors(form.wElo.errors)}
              label="ELO"
              name="wElo"
            />
            <Typography style={{position: "relative", top: "10px"}}>Prob: {resultData.whiteProb}</Typography>
          </Grid>

          <Grid item xs={2}>
            <BasicInput
              value={form.turns.value}
              dispatchValue={dispatchForm}
              errorText={parseErrors(form.turns.errors)}
              label="Turns"
              name="turns"
            />
            <Button variant="contained" color="primary" style={{ top: "40px", left: "50px" }} onClick={handleOnSubmit}>Predict</Button>
            <Typography style={{position: "relative", top: "100px", left: "60px"}}>Draw prob:</Typography>
            <Typography style={{position: "relative", top: "110px", left: "20px"}}>{resultData.drawProb}</Typography>
          </Grid>

          <Grid style={{position: "relative", left: "60px"}} item xs={2}>
            <h2>Jugador negras</h2>
            <BasicInput
              value={form.bElo.value}
              dispatchValue={dispatchForm}
              errorText={parseErrors(form.bElo.errors)}
              label="ELO"
              name="bElo"
            />
            <Typography style={{position: "relative", top: "10px"}}>Prob: {resultData.blackProb}</Typography>
          </Grid>

          <Grid style={{position: "relative", left: "60px", top: "10px", transform: "scaleX(-1)"}} item xs={3}>
            <ImgHolder horse={horse1} />
          </Grid>

        </Grid>

      </Container>

    </>
  );
};

export default Home;
