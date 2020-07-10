const express = require("express");
const Project = require("./projectModel");

const router = express.Router();

router.get("/", (req, res) => {
  Project.get()
    .then((response) => {
      console.log(response);
      res.status(201).json(response);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: "Error, nothing found. " });
    });
});

router.get("/:id", validateProjectId, (req, res) => {
  Project.get(req.project.id)
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
  Project.insert(req.body)
    .then((response) => {
      console.log(response);
      res.status(201).json(response);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: "Error, nothing found. " });
    });
});

router.delete("/:id", validateProjectId, (req, res) => {
  Project.remove(req.project.id)
    .then((response) => {
      console.log(response);
      res.status(200).json({ message: `Deleted entry successfully. ` });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: "Error, id specified not found. " });
    });
});

router.put("/:id", validateProjectId, validateProject, (req, res) => {
  Project.update(req.project.id, req.project)
    .then((response) => {
      console.log(response);
      res.status(200).json({ message: "Project successfully updated. " });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: "Error, id specified not found. " });
    });
});

//middleware

function validateProjectId(req, res, next) {
  Project.get(req.params.id)
    .then((response) => {
      if (response) {
        req.project = response;
        next();
      } else {
        res.status(404).json({ message: "Invalid project id. " });
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

function validateProject(req, res, next) {
  const project = req.body;
  console.log("New Project Object: ", project);
  if (!project.name) {
    res.status(400).json({ message: "Please enter a project name. " });
  } else if (!project.description) {
    res.status(400).json({ message: "please enter a project description. " });
  } else {
    next();
  }
}

module.exports = router;
