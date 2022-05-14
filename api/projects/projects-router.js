// Write your "projects" router here!
const express = require('express');

const Projects = require('./projects-model.js');
const Actions = require('../actions/actions-model.js');


const router = express.Router();

router.get('/', (req, res) => {
  console.log('req: ', {req});
  Projects.get()
    .then(projects => {
      console.log(projects);
      res.status(200).json(projects);
    })
    .catch(error => {
      // log error to server
      console.log(error);
      res.status(500).json({
        message: 'Error retrieving the projects',
      });
    });
});

router.get('/:id', (req, res, next) => {
  Projects.get(req.params.id)
    .then(project => {
      if (project) {
        res.status(200).json(project);
      } else {
        next({ status: 404, message: 'Project not found' });
      }
    })
    .catch(error => {
      // log error to server
      console.log(error);
      next({message: 'Error retrieving the project'});
    });
});

module.exports = router;
