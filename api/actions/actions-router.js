// Write your "actions" router here!
const express = require('express');

const Actions = require('./actions-model.js');
const Projects = require('../projects/projects-model.js');

const { validateAction, blocker } = require('./actions-middlware');


const router = express.Router();

router.get('/', (req, res) => {
  Actions.get()
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
        message: 'Error retrieving the projects',
      });
    });
});

router.get('/:id', (req, res, next) => {
  Actions.get(req.params.id)
    .then(action => {
      if (action) {
        res.status(200).json(action);
      } else {
        next({ status: 404, message: 'Action not found' });
      }
    })
    .catch(error => {
      // log error to server
      console.log(error);
      next({message: 'Error retrieving the hub'});
    });
});

router.post('/', (req, res) => { // validateAction
  Actions.insert(req.body)
    .then(action => {
      res.status(201).json(action);
    })
    .catch(error => {
      // log error to server
      console.log(error);
      res.status(500).json({
        message: 'Error adding the project',
      });
    });
});

router.put('/:id', validateAction, (req, res) => { // validateProject  
  Actions.update(req.params.id, req.body)
    .then(action => {
      if (action) {
        res.status(200).json(action);
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
  Actions.remove(req.params.id)
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

module.exports = router;
