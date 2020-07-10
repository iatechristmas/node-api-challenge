import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [projects, setProjects] = useState();
  const [actions, setActions] = useState();

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/projects")
      .then((response) => {
        setProjects(response.data);
        console.log("response", response);
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get("http://localhost:8000/api/actions")
      .then((response) => {
        setActions(response.data);
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <div>
          {projects ? (
            <div>
              {projects.map((project) => (
                <div>
                  <p>{project.id}</p>
                  <p>{project.name}</p>
                  <p>{project.description}</p>
                  <p>{project.completed}</p>
                </div>
              ))}
            </div>
          ) : (
            <div>
              <p>Please add a project</p>
            </div>
          )}
        </div>
        <div>
          {actions ? (
            <div>
              {actions.map((action) => (
                <div>
                  <p>{action.id}</p>
                  <p>{action.project_id}</p>
                  <p>{action.description}</p>
                  <p>{action.notes}</p>
                  <p>{action.completed}</p>
                </div>
              ))}
            </div>
          ) : (
            <div>
              <p>Please add an action</p>
            </div>
          )}
        </div>
      </header>
    </div>
  );
}

export default App;
