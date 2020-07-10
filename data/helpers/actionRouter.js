const express = require("express");
const Action = require("./actionModel");

const router = express.Router();

router.get("/", (req, res) => {
  Action.get()
    .then((response) => {
      console.log(response);
      res.status(201).json(response);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: "Error, nothing found. " });
    });
});

router.get("/:id", validateActionId, (req, res) => {
  Action.get(req.action.id)
    .then((response) => {
      console.log(response);
      res.status(200).json(response);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: "Error, id not found. " });
    });
});

router.post("/", validateProject, (req, res) => {
  Action.insert(req.body)
    .then((response) => {
      console.log(response);
      res.status(201).json(response);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: "Error, nothing found. " });
    });
});

router.delete("/:id", validateActionId, (req, res) => {
  Action.remove(req.action.id)
    .then((response) => {
      console.log(response);
      res.status(200).json({ message: `Deleted entry successfully. ` });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: "Error, id specified not found. " });
    });
});

router.put("/:id", validateActionId, validateProject, (req, res) => {
  Action.update(req.action.id, req.body)
    .then((response) => {
      console.log(req.params);
      console.log(req.body);
      console.log(response);
      res.status(200).json({ message: "Project successfully updated. " });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: "Error, id specified not found. " });
    });
});

// middleware

function validateActionId(req, res, next) {
  Action.get(req.params.id)
    .then((response) => {
      if (response) {
        req.action = response;
        next();
      } else {
        res.status(404).json({ message: "Invalid Action id. " });
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

function validateProject(req, res, next) {
  const action = req.body;
  console.log("New Project Object: ", action);
  if (!action.description || action.description.length > 128) {
    res.status(400).json({
      message:
        "Please enter an action description with a length of less than 128 characters. ",
    });
  } else if (!action.notes) {
    res.status(400).json({ message: "please enter action notes. " });
  } else {
    next();
  }
}

module.exports = router;
