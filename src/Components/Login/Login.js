import React, { useReducer } from "react";
import { Container, Grid, Typography } from "@material-ui/core";
//RootComponents
import BasicInput from "../RootComponents/BasicInput";
import BasicButton from "../RootComponents/BasicButton";
import { userLogin, password } from "../Validations/validations";
import { makeStyles } from "@material-ui/core/styles";

var validate = require("validate.js");

const useStyles = makeStyles({
  root: {
    height: "100vh",
  },
  container: {
    height: "100%",
  },
});

const constraints = {
  user: userLogin,
  password,
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
    default:
      return {
        ...state,
      };
  }
};

const validateForm = ({ form }) => {
  for (const key in form) {
    if (form.hasOwnProperty(key)) {
      const field = form[key];
      console.log(form[key])
      field.errors = validate.single(field.value, constraints[key]);
    }
  }
};

const parseErrors = (errors) => {
  if (errors && errors.length > 0) {
    return errors[errors.length - 1];
  } else {
    return "";
  }
};

const Login = (props) => {
  const [form, dispatchForm] = useReducer(formReducer, {
    user: {
      value: "",
      errors: null,
    },
    password: {
      value: "",
      errors: null,
    },
  });

  console.log(form);
  const classes = useStyles();

  const handleOnSubmit = (event) => {
    event.preventDefault();
    validateForm({form});
    console.log(form)
    console.log("ESTO PASA PRIMERO");
  };
  return (
    <form onSubmit={handleOnSubmit}>
      <Container fixed className={classes.root}>
        <Grid
          container
          justify="center"
          alignItems="center"
          className={classes.container}
        >
          <Grid container item xs={4} spacing={4}>
            <Grid item xs={12}>
              <Typography variant="h4">Iniciar sesión</Typography>
            </Grid>
            <BasicInput
              value={form.user.value}
              dispatchValue={dispatchForm}
              errorText={parseErrors(form.user.errors)}
              label="Usuario o Mail"
              name="user"
            />
            <BasicInput
              value={form.password.value}
              dispatchValue={dispatchForm}
              errorText={parseErrors(form.password.errors)}
              label="Contraseña"
              name="password"
              type="password"
            />
            <BasicButton type="submit" fullWidth={true}>
              Iniciar sesión
            </BasicButton>
          </Grid>
        </Grid>
      </Container>
    </form>
  );
};

export default Login;