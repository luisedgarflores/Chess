import React from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import Login from "./Components/Login/Login";
import SignUp from "./Components/SignUp/SignUp";
import Home from "./Components/Home/Home";
import ShowPlayers from "./Components/Players/ShowPlayers";
import ShowMatches from "./Components/Matches/ShowMatches"

function App() {

  return (
    <div>
      <Switch>
        <Route path="/home" component={Home} />
        <Route path="/players" component={ShowPlayers} />
        <Route path="/matches" component={ShowMatches} />
        <Route path="/signup" component={SignUp} />
        <Route path="/" component={Login} />
      </Switch>
    </div>
  );
}

export default App;
