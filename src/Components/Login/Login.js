import React, { useReducer } from "react";
import { Container, Grid, Typography } from "@material-ui/core";

import { useMutation, gql } from '@apollo/client';

//RootComponents
import BasicInput from "../RootComponents/BasicInput";
import BasicButton from "../RootComponents/BasicButton";
import { userLogin, password } from "../Validations/validations";
import { makeStyles } from "@material-ui/core/styles";

const AUTH_QUERY = gql`
  mutation auth($user: ObtainJSONWebTokenInput!) {
    tokenAuth(input: $user) {
      token
    }
  }
`;

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
    case "validate":
      const newState = { ...state };
      for (const key in newState) {
        if (newState.hasOwnProperty(key)) {
          const field = newState[key];
          field.errors = validate.single(field.value, constraints[key]);
        }
      }
      return newState;
    case "setNoValidCredentials":
      return {
        ...state,
        password: {
          ...state.password,
          errors: ["Usuario o contraseña no válidos"]
        }
      }
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

  const handleSignUp = () => {
    props.history.replace("/signup");
  };

  const classes = useStyles();

  const handleSuccessfulLogin = ({ token }) => {
    localStorage.setItem('token', token)
    props.history.replace('/home')
  };

  const [loginMutation] = useMutation(AUTH_QUERY, {
    onCompleted (data) {
      console.log(data)
      handleSuccessfulLogin({token: data.tokenAuth.token})
    },
    onError (error) {
      console.log(JSON.stringify("error", null, 2))
      dispatchForm({type: "setNoValidCredentials"})
    },
  })

  const requestLogin = () => {
    loginMutation({variables: {
      user: {
        username: form.user.value,
        password: form.password.value
      }
    }})
  };

  const handleOnSubmit = (event) => {
    event.preventDefault();
    dispatchForm({ type: "validate" });
    if (calculateTotalErrors({ form }) === 0) {
      requestLogin()
    }
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
            <BasicButton
              type="button"
              handleClick={handleSignUp}
              fullWidth={true}
            >
              Registrarme
            </BasicButton>
          </Grid>
        </Grid>
      </Container>
    </form>
  );
};

export default Login;
