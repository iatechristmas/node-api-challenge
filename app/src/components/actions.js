import React, { useState, useEffect } from "react";
import axios from "axios";
import "../App.css";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import styled from "styled-components";

import photo from "../assets/action.jpeg";

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

function Actions() {
  const classes = useStyles();

  const [actions, setActions] = useState();

  useEffect(() => {
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

  const getActions = () => {
    axios
      .get("http://localhost:8000/api/actions")
      .then((response) => {
        setActions(response.data);
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteAction = (e, id) => {
    axios
      .delete(`http://localhost:8000/api/actions/${id}`)
      .then((response) => {
        console.log(response);
        getActions();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        <div>
          {actions ? (
            <div>
              <CardContainer>
                {actions.map((action) => (
                  <CardDiv key={action.id}>
                    <Card className={classes.root}>
                      <CardActionArea>
                        <CardMedia
                          className={classes.media}
                          image={photo}
                          title="Contemplative Reptile"
                        />
                        <CardContent>
                          <Typography gutterBottom variant="h5" component="h2">
                            {action.description}
                          </Typography>
                          <Typography
                            variant="body2"
                            color="textSecondary"
                            component="p"
                          >
                            {action.notes}
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                      <CardActions>
                        <Button
                          type="button"
                          size="small"
                          color="primary"
                          onClick={(e) => deleteAction(e, action.id)}
                        >
                          Delete Action
                        </Button>
                        <Button size="small" color="primary">
                          Edit Action
                        </Button>
                      </CardActions>
                    </Card>
                  </CardDiv>
                ))}
              </CardContainer>
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

export default Actions;
