const users = {
  'Frankie': 3,
  'Copper': 1,
  'Aidan': 2,
  'Natalia': 4,
  'Alex': 5,
  'Gene': 6,
  'Flanagan': 7
}

const isAuthenticated =  function (req, res, next) {
  req.user = {}
  req.user.name = req.params.name
  req.user.id = users[req.user.name]
  next()
}

const isAdmin = function(req, res, next) {
  req.user = {}
  req.user.name = req.params.name
  req.user.id = users[req.user.name]
  next()
}

module.exports = {
  isAuthenticated,
  isAdmin
}
