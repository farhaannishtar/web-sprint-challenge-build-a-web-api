const express = require('express');
const server = express();

// Configure your server here
// Build your actions router in /api/actions/actions-router.js
// Build your projects router in /api/projects/projects-router.js
// Do NOT `server.listen()` inside this file!
const actionsRouter = require('./actions/actions-router.js');
const projectsRouter = require('./projects/projects-router.js');


server.use(express.json());


server.use('/api/actions', actionsRouter);
server.use('/api/projects', projectsRouter);

server.use((err, req, res, next) => {
  let { status = 500, message = 'unknown error occurred' } = err;
  res.status(status).json({message: message});
});

server.use('*', (req, res) => {
  // catch all 404 errors middleware
  res.status(404).json({ message: `${req.method} ${req.baseUrl} not found!` });
});

module.exports = server;
