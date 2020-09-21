import React from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import Login from "./Components/Login/Login";
import SignUp from "./Components/SignUp/SignUp";
import Home from "./Components/Home/Home"

const Contact = (props) => {
  console.log(props);
  const handleClick = () => {
    props.history.replace("/");
  };
  return (
    <div>
      <button onClick={handleClick}>Ir a INICIO</button>
      <p>CONTACTO</p>
    </div>
  );
};

const About = (props) => {
  console.log(props);
  const handleClick = () => {
    props.history.replace("/");
  };
  return (
    <div>
      <button onClick={handleClick}>Ir a INICIO</button>
      <p>ACERCA DE</p>
    </div>
  );
};

const AllContacts = (props) => {
  console.log(props);
  return (
    <div>
      <p>TODOS LOS CONTACTOS</p>
    </div>
  );
};

function App() {
  return (
    <div>
      <Switch>
        {/* If the current URL is /about, this route is rendered
            while the rest are ignored */}
        <Route path="/about" component={About} />

        {/* Note how these two routes are ordered. The more specific
            path="/contact/:id" comes before path="/contact" so that
            route will render when viewing an individual contact */}
        <Route path="/contact/:id">
          <Contact />
        </Route>
        <Route path="/contact">
          <AllContacts />
        </Route>

        {/* If none of the previous routes render anything,
            this route acts as a fallback.

            Important: A route with path="/" will *always* match
            the URL because all URLs begin with a /. So that's
            why we put this one last of all */}
        <Route path="/home" component={Home} />
        <Route path="/signup" component={SignUp} />
        <Route path="/" component={Login} />
      </Switch>
    </div>
  );
}

export default App;
