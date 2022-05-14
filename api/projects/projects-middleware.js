// add middlewares here related to projects
let validateProject = (req, res, next) => {
  if(!req.body.name || !req.body.description || !req.body.completed) {
    next({ status: 400, message: 'bad request, Farhaan' });
    return;
  }

  req.body.name = req.body.name.trim();
  
  next();
};

let blocker = (req, res, next) => {
  if(Math.random() > 0.5) {
    res.status(403).json({ message: 'YOU SHALL NOT PASS!' });
    return;
  }
  next();
};

module.exports =  {
  validateProject,
  blocker
}