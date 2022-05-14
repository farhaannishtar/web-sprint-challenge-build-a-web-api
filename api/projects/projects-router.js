// Write your "projects" router here!
const express = require('express');

const Projects = require('./projects-model.js');
const Actions = require('../actions/actions-model.js');
const { validateProject, blocker } = require('./projects-middleware');

const router = express.Router();

router.get('/', (req, res) => {
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

router.post('/', validateProject, (req, res) => {
  Projects.insert(req.body)
    .then(project => {
      res.status(201).json(project);
    })
    .catch(error => {
      // log error to server
      console.log(error);
      res.status(500).json({
        message: 'Error adding the project',
      });
    });
});

router.put('/:id', (req, res) => { // validateProject  
  Projects.update(req.params.id, req.body)
    .then(project => {
      if (project) {
        res.status(200).json(project);
      } else {
        res.status(404).json({ message: 'The project could not be found' });
      }
    })
    .catch(error => {
      // log error to server
      console.log(error);
      res.status(500).json({
        message: 'Error updating the project',
      });
    });
});

router.delete('/:id', (req, res) => {
  Projects.remove(req.params.id)
    .then(count => {
      if (count > 0) {
        res.status(200).json({ message: 'The projects has been nuked' });
      } else {
        res.status(404).json({ message: 'The projects could not be found' });
      }
    })
    .catch(error => {
      // log error to server
      console.log(error);
      res.status(500).json({
        message: 'Error removing the project',
      });
    });
});

router.get('/:id/actions', (req, res) => {
  Projects.getProjectActions(req.params.id)
    .then(actions => {
      if (!actions) {
        res.status(404).json({})
      }
      res.status(200).json(actions);
    })
    .catch(error => {
      // log error to server
      console.log(error);
      res.status(500).json({
        message: 'Error getting the messages for the hub',
      });
    });
});

module.exports = router;
