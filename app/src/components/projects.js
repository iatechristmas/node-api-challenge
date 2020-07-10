import React, { useState, useEffect } from "react";
import axios from "axios";
import "../App.css";
import { useHistory } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";

import styled from "styled-components";

import photo from "../assets/photo.jpg";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

const CardContainer = styled.div`
  display: flex;
`;

const CardDiv = styled.div`
  margin: 2%;
`;

function Projects() {
  const { push } = useHistory();

  const classes = useStyles();

  const [projects, setProjects] = useState();

  const [open, setOpen] = useState(false);

  const openModalHandler = () => {
    setOpen(true);
  };

  const closeModalHandler = () => {
    setOpen(false);
  };

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
  }, []);

  const getProjects = () => {
    axios
      .get("http://localhost:8000/api/projects")
      .then((response) => {
        setProjects(response.data);
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteProject = (e, id) => {
    axios
      .delete(`http://localhost:8000/api/projects/${id}`)
      .then((response) => {
        console.log(response);
        getProjects();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        <div>
          {projects ? (
            <div>
              <CardContainer>
                {projects.map((project) => (
                  <CardDiv key={project.id}>
                    <Card className={classes.root}>
                      <CardActionArea>
                        <CardMedia
                          className={classes.media}
                          image={photo}
                          title="Contemplative Reptile"
                        />
                        <CardContent onClick={() => push("/actions")}>
                          <Typography gutterBottom variant="h5" component="h2">
                            {project.name}
                          </Typography>
                          <Typography
                            variant="body2"
                            color="textSecondary"
                            component="p"
                          >
                            {project.description}
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                      <CardActions>
                        <Button
                          size="small"
                          color="primary"
                          type="button"
                          onClick={(e) => deleteProject(e, project.id)}
                        >
                          Delete Project
                        </Button>
                        <Button
                          size="small"
                          color="primary"
                          onClick={openModalHandler}
                        >
                          Edit Project
                        </Button>
                      </CardActions>
                    </Card>
                  </CardDiv>
                ))}
              </CardContainer>
              <Dialog
                open={open}
                onClose={closeModalHandler}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogContent>
                  <Card className={classes.root}>
                    <CardActionArea>
                      <CardMedia
                        className={classes.media}
                        image={photo}
                        title="Contemplative Reptile"
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                          Hi
                        </Typography>
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          component="p"
                        >
                          Bye
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                    <CardActions>
                      <Button
                        size="small"
                        color="primary"
                        onClick={openModalHandler}
                      >
                        Save Changes
                      </Button>
                    </CardActions>
                  </Card>
                </DialogContent>

                <DialogActions>
                  <Button onClick={closeModalHandler} color="primary">
                    {" "}
                    Cancel{" "}
                  </Button>
                </DialogActions>
              </Dialog>
            </div>
          ) : (
            <div>
              <p>Please add a project</p>
            </div>
          )}
        </div>
      </header>
    </div>
  );
}

export default Projects;
