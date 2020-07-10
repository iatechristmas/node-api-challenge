import React from "react";
import "./App.css";
import Actions from "./components/actions";
import Projects from "./components/projects";
import { Route, Switch } from "react-router-dom";

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Projects} />
        <Route exact path="/actions" component={Actions} />
      </Switch>
    </div>
  );
}

export default App;
