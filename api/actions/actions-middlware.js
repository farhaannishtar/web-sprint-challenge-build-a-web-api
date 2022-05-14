// add middlewares here related to actions
let validateAction = (req, res, next) => {
  if(!req.body.notes || !req.body.description || !req.body.project_id) {
    next({ status: 400, message: 'bad request, Farhaan' });
    return;
  }

  req.body.name = req.body.name.trim();
  
  next();
};

let blocker = (req, res, next) => {
  if (Math.random() > 0.5) {
    res.status(403).json({ message: 'YOU SHALL NOT PASS!' });
    return;
  }
  next();
};

module.exports =  {
  validateAction,
  blocker
}